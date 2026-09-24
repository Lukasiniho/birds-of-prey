import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const limit = 2050;
const files = ['app', 'components'].flatMap((directory) =>
  readdirSync(directory, { recursive: true })
    .filter((file) => /\.css$/i.test(file))
    .map((file) => join(directory, file)),
);
const lines = files.reduce((sum, file) => {
  const source = readFileSync(file, 'utf8');
  return (
    sum +
    (source ? source.split('\n').length - Number(source.endsWith('\n')) : 0)
  );
}, 0);

console.log(
  `CSS budget: ${lines}/${limit} lines across ${files.length} source files`,
);
if (lines > limit) {
  console.error(
    'Reduce authored CSS in app/ and components/ before adding more styles.',
  );
  process.exitCode = 1;
}
