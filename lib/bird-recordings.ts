import sources from '../data/audio/sources.json' with { type: 'json' };
import peaks from '../data/audio/peaks.json' with { type: 'json' };

export type BirdRecording = {
  url: string;
  label: string;
  author: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  durationSeconds: number;
  note?: string;
  /** 48 loudness steps measured from the file; see scripts/build-audio-peaks.mjs. */
  peaks: number[];
};

// Local 3–10-second call excerpts. The manifest is the single source for
// attribution, editing notes, exact source intervals, durations and file hashes.
export const birdRecordings: Partial<Record<string, BirdRecording>> =
  Object.fromEntries(
    sources.map((source) => [
      source.birdId,
      {
        url: source.path.replace(/^public\//, '/'),
        label: source.label,
        author: source.author,
        sourceUrl: source.sourceUrl,
        license: source.license,
        licenseUrl: source.licenseUrl,
        durationSeconds: source.durationSeconds,
        peaks: (peaks as Record<string, number[]>)[source.birdId] ?? [],
        note: [source.description, source.changes].filter(Boolean).join(' '),
      },
    ]),
  );
