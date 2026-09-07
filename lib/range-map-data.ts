export type ViewBox = [number, number, number, number];
export type Basemap = { paths: string[]; viewBox: ViewBox };
export type Overlay = { path: string; viewBox: ViewBox };
export type MapData = { base: Basemap; range: Overlay };

function isViewBox(value: unknown): value is ViewBox {
  if (
    !Array.isArray(value) ||
    value.length !== 4 ||
    !value.every(Number.isFinite)
  )
    return false;
  const [x, y, width, height] = value as number[];
  return (
    x >= 0 &&
    y >= 0 &&
    width > 0 &&
    height > 0 &&
    x + width <= 1000.02 &&
    y + height <= 540.02
  );
}
function isPath(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.startsWith('M') &&
    !/NaN|Infinity/.test(value)
  );
}
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
export function parseBasemap(value: unknown): Basemap {
  if (
    !isObject(value) ||
    !isViewBox(value.viewBox) ||
    !Array.isArray(value.paths) ||
    !value.paths.length ||
    !value.paths.every(isPath)
  )
    throw new Error('Invalid basemap');
  return { viewBox: value.viewBox, paths: value.paths as string[] };
}
export function parseOverlay(value: unknown): Overlay {
  if (!isObject(value) || !isViewBox(value.viewBox) || !isPath(value.path))
    throw new Error('Invalid range overlay');
  return { viewBox: value.viewBox, path: value.path };
}

// Share successful requests. Failed or malformed responses can be retried.
export function createMapLoader<T>(parse: (value: unknown) => T) {
  const requests = new Map<string, Promise<T>>();
  return (url: string): Promise<T> => {
    let request = requests.get(url);
    if (!request) {
      request = fetch(url)
        .then(async (response) => {
          if (!response.ok) throw new Error('Map unavailable');
          return parse(await response.json());
        })
        .catch((error: unknown) => {
          requests.delete(url);
          throw error;
        });
      requests.set(url, request);
    }
    return request;
  };
}
