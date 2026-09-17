// Every WebP under public/optimized/ is named after a digest of its source
// bytes and encoder settings, so a file that survives from one deploy to the
// next is byte-for-byte the one this build would have produced. Carrying the
// directory across builds therefore costs nothing in correctness and saves the
// minute-plus that re-encoding 275 sources at five widths takes on a fresh
// container. Changed or new images still miss the cache and get encoded;
// scripts/optimize-images.mjs deletes the rungs no image claims any more, so
// the cache cannot grow without bound.
const optimized = 'public/optimized';

export const onPreBuild = async ({ utils }) => {
  if (await utils.cache.restore(optimized))
    console.log(`Restored ${optimized} from the build cache.`);
  else console.log(`No cached ${optimized}; every image will be encoded.`);
};

export const onPostBuild = async ({ utils }) => {
  if (await utils.cache.save(optimized))
    console.log(`Saved ${optimized} to the build cache.`);
};
