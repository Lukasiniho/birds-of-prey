import { createHash } from 'node:crypto';
import { geoContains } from 'd3-geo';
import { sphericalGeometry } from './range-geometry.mjs';

const date = (value) =>
  typeof value === 'string' &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  Number.isFinite(Date.parse(value)) &&
  new Date(value).toISOString().slice(0, 10) === value;
const https = (value) => {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
};
const point = (p) =>
  Array.isArray(p) &&
  p.length >= 2 &&
  p.every(Number.isFinite) &&
  Math.abs(p[0]) <= 180 &&
  Math.abs(p[1]) <= 90;

// Technical release gate, not a substitute for a documented biological review.
// Validate the entire allowlist before the build writes any generated assets.
export function validateRangeSources(sources) {
  if (!Array.isArray(sources))
    throw new Error('Expected a range release allowlist');
  const ids = new Set();
  for (const s of sources) {
    if (
      !s ||
      typeof s.id !== 'string' ||
      !/^[a-z][a-z0-9-]*$/.test(s.id) ||
      ids.has(s.id)
    )
      throw new Error('Invalid or duplicate range id');
    ids.add(s.id);
    if (
      typeof s.name !== 'string' ||
      !s.name.trim() ||
      !Number.isInteger(s.taxonId) ||
      s.taxonId <= 0 ||
      !https(s.url) ||
      !https(s.datasetUrl) ||
      !https(s.licenseUrl) ||
      s.license !== 'CC BY' ||
      !date(s.downloadedOn) ||
      !/^[a-f0-9]{64}$/.test(s.sha256)
    )
      throw new Error(`Missing provenance: ${s.id}`);
    const r = s.review;
    if (
      r?.status !== 'approved' ||
      !date(r.reviewedOn) ||
      r.reviewedOn < s.downloadedOn ||
      !https(r.referenceUrl) ||
      typeof r.notes !== 'string' ||
      !r.notes.trim() ||
      ![r.inside, r.outside].every(
        (points) =>
          Array.isArray(points) && points.length > 0 && points.every(point),
      )
    )
      throw new Error(`Missing approved review: ${s.id}`);
  }
}

export function validateRangeFeature(source, raw) {
  if (createHash('sha256').update(raw).digest('hex') !== source.sha256)
    throw new Error(`Source changed; review required: ${source.id}`);
  const feature = JSON.parse(raw.toString());
  const p = feature.properties;
  if (
    feature.type !== 'Feature' ||
    p?.name !== source.name ||
    p?.taxon_id !== source.taxonId ||
    p?.rank !== 'species' ||
    !p?.geomodel_version ||
    p.geomodel_version !== source.properties?.geomodel_version
  )
    throw new Error(`Taxon or model mismatch: ${source.id}`);
  const geometry = feature.geometry;
  if (!geometry || !['Polygon', 'MultiPolygon'].includes(geometry.type))
    throw new Error(`Invalid geometry: ${source.id}`);
  const polygons =
    geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  if (
    !Array.isArray(polygons) ||
    !polygons.length ||
    !polygons.every(
      (rings) =>
        Array.isArray(rings) &&
        rings.length &&
        rings.every(
          (ring) =>
            Array.isArray(ring) &&
            ring.length >= 4 &&
            ring.every(point) &&
            ring[0][0] === ring.at(-1)[0] &&
            ring[0][1] === ring.at(-1)[1],
        ),
    )
  )
    throw new Error(`Invalid polygon coordinates: ${source.id}`);
  const normalized = sphericalGeometry(geometry);
  for (const [kind, expected] of [
    ['inside', true],
    ['outside', false],
  ]) {
    for (const location of source.review[kind]) {
      if (geoContains(normalized, location) !== expected)
        throw new Error(
          `Review point ${kind} failed: ${source.id} at ${location}`,
        );
    }
  }
  return normalized;
}
