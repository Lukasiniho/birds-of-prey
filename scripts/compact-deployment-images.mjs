import { readFile, writeFile, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Netlify receives the optimized images only. Original source files stay in
// public/ for future edits; legacy image URLs redirect to their WebP versions.
if (process.env.NETLIFY) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const output = path.join(root, 'dist/client');
  const mapping = JSON.parse(
    await readFile(path.join(root, 'public/optimized/manifest.json'), 'utf8'),
  );
  const redirectsPath = path.join(output, '_redirects');
  const existing = await readFile(redirectsPath, 'utf8').catch((error) => {
    if (error.code === 'ENOENT') return '';
    throw error;
  });
  const entries = [];
  for (const [source, variants] of Object.entries(mapping)) {
    // Restrict all deletion to known raster files within the generated output.
    if (!/^\/[\w/.-]+\.(png|jpe?g)$/i.test(source) ||
        source.split('/').includes('..')) {
      throw new Error(`Invalid image mapping: ${source}`);
    }
    if (!Array.isArray(variants) || variants.length === 0)
      throw new Error(`No optimized widths for image: ${source}`);
    // Every width has to exist before anything is deleted, but only the
    // largest is a stand-in for the original at its old URL.
    for (const variant of variants) {
      if (!/^\/optimized\/[\w.-]+\.webp$/.test(variant.url))
        throw new Error(`Invalid optimized image: ${variant.url}`);
      const replacement = await stat(path.join(output, variant.url.slice(1)));
      if (!replacement.isFile() || replacement.size === 0)
        throw new Error(`Missing optimized image: ${variant.url}`);
    }
    const target = variants[variants.length - 1].url;
    const original = path.join(output, source.slice(1));
    const originalStat = await stat(original).catch((error) => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    entries.push({ source, target, original, size: originalStat?.size ?? 0 });
  }
  // Validate every replacement and write redirects before removing originals.
  const rules = entries.map(({ source, target }) => `${source} ${target} 301`);
  await writeFile(redirectsPath, `${rules.join('\n')}\n${existing}`);
  for (const entry of entries) {
    if (entry.size > 0) await unlink(entry.original);
  }
  await unlink(path.join(output, 'optimized/manifest.json')).catch((error) => {
    if (error.code !== 'ENOENT') throw error;
  });
  const removed = entries.reduce((sum, entry) => sum + entry.size, 0);
  console.log(`Deployment: ${entries.length} original images replaced by WebP redirects; ${(removed / 1e6).toFixed(1)} MB removed.`);
}
