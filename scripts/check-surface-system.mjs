/** Surface contract: no excluded UI library directory and no opt-out comments. */
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const roles = [
  'small',
  'control',
  'card',
  'surface',
  'surface-large',
  'pill',
  'tab-pill',
];
const radiusValue = new RegExp(
  `^(?:var\\(--radius-(?:${roles.join('|')})\\)|0|50%|inherit)(?:\\s+(?:var\\(--radius-(?:${roles.join('|')})\\)|0|50%|inherit))*$`,
);
const radiusUtility = new RegExp(
  `^rounded-(?:(?:t|r|b|l|s|e|tl|tr|bl|br|ss|se|es|ee)-)?(?:\\(--radius-(?:${roles.join('|')})\\)|none|full|\\[(?:inherit|50%)\\])$`,
);
const geometryOwners = new Set([
  'components/surface.tsx',
  'components/fullscreen-page.tsx',
  'components/atlas-panel.tsx',
  'components/explorer-panel.tsx',
  'components/page-header.tsx',
]);
const controls = new Set([
  'CloseControl',
  'CloseLink',
  'FieldClear',
  'RemovableChip',
]);
const shells = new Set([
  'Surface',
  'SurfaceHeader',
  'SurfaceBody',
  'SurfaceFooter',
  'DialogContent',
  'SheetContent',
  'DrawerContent',
  'AlertDialogContent',
  'ExplorerHeader',
  'ExplorerStage',
  'ExplorerNotes',
  'FullscreenPage',
]);
const geometry = /(?:^|[\s:])(?:!?rounded|!?p[trblxyse]?-|\[border-radius:)/;
const headerGeometry =
  /(?:^|[\s:])(?:!?[mp][trblxyse]?-|!?gap(?:-[xy])?-|!?rounded|!?grid-cols-|!?absolute|!?top-|!?right-)/;

export function checkSurfaceSource(file, code) {
  const findings = [];
  const add = (pos, message) =>
    findings.push(
      `${file}:${code.slice(0, pos).split('\n').length}: ${message}`,
    );
  // Inspect every utility string, including constants, variants, compatibility maps and library primitives.
  for (const match of code.matchAll(
    /\brounded(?:-(?:t|r|b|l|s|e|tl|tr|bl|br|ss|se|es|ee))?-(?:\([^)]*\)|\[[^\]]*\]|[\w.-]+)/g,
  )) {
    if (!radiusUtility.test(match[0]))
      add(
        match.index,
        `unsupported radius ${match[0]} — use an approved radius role`,
      );
  }
  for (const match of code.matchAll(
    /\[border-(?:(?:top|bottom)-(?:left|right)-)?radius:([^\]]+)\]/g,
  )) {
    if (!radiusValue.test(match[1].replaceAll('_', ' ')))
      add(match.index, 'arbitrary-property radius must use an approved role');
  }
  for (const match of code.matchAll(
    /--(?:radius-[\w-]+|cell-radius)\s*:\s*([^;\n\]}]+)/g,
  )) {
    if (file !== 'app/design-system.css' && !radiusValue.test(match[1].trim()))
      add(match.index, 'radius aliases must reference an approved role');
  }
  if (file.endsWith('.css')) {
    for (const match of code.matchAll(
      /border-(?:(?:top|bottom)-(?:left|right)-|(?:start|end)-(?:start|end)-)?radius\s*:\s*([^;}]+)/g,
    )) {
      if (!radiusValue.test(match[1].trim()))
        add(match.index, 'CSS radius must use an approved role');
    }
    return findings;
  }
  const source = ts.createSourceFile(
    file,
    code,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith('tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const names = new Map();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings))
      for (const binding of bindings.elements)
        names.set(
          binding.name.text,
          (binding.propertyName ?? binding.name).text,
        );
  }
  const canonical = (name) => names.get(name) ?? name;
  function visit(node) {
    if (
      ts.isPropertyAssignment(node) &&
      /^border(?:TopLeft|TopRight|BottomLeft|BottomRight|StartStart|StartEnd|EndStart|EndEnd)?Radius$/.test(
        node.name.getText(source).replace(/['"]/g, ''),
      )
    ) {
      const value = ts.isStringLiteralLike(node.initializer)
        ? node.initializer.text
        : node.initializer.getText(source);
      if (!radiusValue.test(value))
        add(node.getStart(source), 'inline radius must use an approved role');
    }
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const name = canonical(node.tagName.getText(source));
      if (
        ['X', 'XIcon'].includes(name) &&
        ![
          'components/close-control.tsx',
          'components/quiz/incorrect-icon.tsx',
        ].includes(file)
      )
        add(
          node.getStart(source),
          'raw dismissal/verdict icon — use CloseControl, FieldClear, RemovableChip or QuizIncorrectIcon',
        );
      for (const attr of node.attributes.properties) {
        if (!ts.isJsxAttribute(attr)) continue;
        const prop = attr.name.getText(source);
        if (
          controls.has(name) &&
          ['className', 'style', 'size', 'width', 'height'].includes(prop)
        )
          add(
            attr.getStart(source),
            'close/clear geometry belongs to the shared control',
          );
        if (
          !shells.has(name) ||
          geometryOwners.has(file) ||
          file.startsWith('components/ui/')
        )
          continue;
        if (
          prop === 'style' &&
          /padding|borderRadius|gap/.test(attr.getText(source))
        )
          add(
            attr.getStart(source),
            'surface geometry belongs to its component',
          );
        if (prop === 'className' && attr.initializer) {
          const value = ts.isStringLiteral(attr.initializer)
            ? attr.initializer.text
            : attr.initializer.getText(source);
          if ((name.endsWith('Header') ? headerGeometry : geometry).test(value))
            add(
              attr.getStart(source),
              'surface padding/radius/header spacing belongs to its component',
            );
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return findings;
}

export function auditSurfaces(root) {
  const findings = [];
  let count = 0;
  function walk(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (/\.(?:css|tsx?|jsx?)$/.test(file)) {
        count++;
        findings.push(
          ...checkSurfaceSource(
            relative(root, file),
            readFileSync(file, 'utf8'),
          ),
        );
      }
    }
  }
  for (const directory of ['app', 'components', 'hooks', 'lib'])
    walk(join(root, directory));
  return { findings, count };
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const { findings, count } = auditSurfaces(process.cwd());
  if (findings.length) {
    console.error(findings.join('\n'));
    process.exitCode = 1;
  } else
    console.log(
      `Surface system: ${count} files checked, including all UI primitives.`,
    );
}
