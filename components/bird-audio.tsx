'use client';
import { useEffect, useRef, useState } from 'react';
import { Play, Pause, SpinnerGap as LoaderCircle } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { birdRecordings } from '@/lib/bird-recordings';

// Gemessen werden 48 Stufen, gezeichnet werden 16. Die Ruf-Zelle lässt der
// Welle rund 100 px: mit mehr Strichen bleibt jeder unter einem Pixel und die
// Welle verschwindet. Je drei Stufen behalten ihre lauteste — der Mittelwert
// würde die kurzen Rufspitzen wegbügeln.
const BARS = 16;
function drawnPeaks(peaks: number[]) {
  const step = Math.ceil(peaks.length / BARS);
  const bars: number[] = [];
  for (let i = 0; i < peaks.length; i += step)
    bars.push(Math.max(...peaks.slice(i, i + step)));
  return bars;
}

export function BirdAudio({ birdId, name }: { birdId: string; name: string }) {
  const recording = birdRecordings[birdId];
  const audio = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'playing' | 'error'>(
    'idle',
  );
  // Wie weit der Ruf gelaufen ist, 0…1, für die bereits erklungenen Striche.
  const [played, setPlayed] = useState(0);
  useEffect(() => {
    const player = audio.current;
    return () => {
      player?.pause();
    };
  }, []);
  useEffect(() => {
    if (state !== 'loading') return;
    const timeout = window.setTimeout(() => {
      audio.current?.pause();
      setState('error');
    }, 15000);
    return () => window.clearTimeout(timeout);
  }, [state]);
  if (!recording) return null;
  const bars = drawnPeaks(recording.peaks);
  async function toggle() {
    const player = audio.current;
    if (!player) return;
    if (state === 'loading' || !player.paused) {
      player.pause();
      player.currentTime = 0;
      setPlayed(0);
      setState('idle');
      return;
    }
    setState('loading');
    try {
      await player.play();
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError'))
        setState('error');
    }
  }
  return (
    <div className="bird-audio">
      <Button
        variant="ghost"
        className="bird-audio-play"
        onClick={toggle}
        aria-label={`${name}: ${state === 'playing' ? 'Ruf pausieren' : 'Ruf abspielen'}`}
        aria-pressed={state === 'playing'}
        aria-busy={state === 'loading'}
      >
        {state === 'loading' ? (
          <LoaderCircle className="animate-spin" />
        ) : state === 'playing' ? (
          <Pause />
        ) : (
          <Play />
        )}
      </Button>
      {bars.length > 0 && (
        /* Die Striche sind die gemessene Lautstärke dieser Aufnahme; sie
           färben sich, während der Ruf läuft. Rein grafisch — Beschriftung
           und Zustand trägt der Knopf daneben. */
        <div
          className="bird-audio-wave"
          data-state={state}
          aria-hidden="true"
          style={{ '--wave-played': played } as React.CSSProperties}
        >
          {bars.map((peak, index) => (
            <span
              key={index}
              style={
                {
                  height: `${peak}%`,
                  '--wave-at': index / (bars.length - 1),
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}
      {/* oxlint-disable-next-line jsx-a11y/media-has-caption -- bird calls carry no speech to caption */}
      <audio
        ref={audio}
        preload="none"
        onPlaying={() => setState('playing')}
        onTimeUpdate={(event) => {
          const player = event.currentTarget;
          setPlayed(player.duration ? player.currentTime / player.duration : 0);
        }}
        onPause={() => setState('idle')}
        onEnded={() => {
          setPlayed(0);
          setState('idle');
        }}
        onError={() => setState('error')}
      >
        <source
          src={recording.url}
          type={recording.url.endsWith('.mp3') ? 'audio/mpeg' : 'audio/ogg'}
        />
      </audio>
      {state === 'error' && (
        <small role="status">
          Ton nicht verfügbar.{' '}
          <a href={recording.sourceUrl} target="_blank" rel="noreferrer">
            Quelle öffnen
          </a>
        </small>
      )}
    </div>
  );
}

export function BirdAudioCredit({
  birdId,
  name,
}: {
  birdId: string;
  name: string;
}) {
  const recording = birdRecordings[birdId];
  if (!recording) return null;
  return (
    <Popover>
      <PopoverTrigger className="bird-audio-credit">
        Quelle & Lizenz
      </PopoverTrigger>
      <PopoverContent side="top" className="bird-audio-attribution">
        <strong className="app-tooltip-title">
          {name} · {recording.label}
        </strong>
        <p>Aufnahme: {recording.author}</p>
        <p>
          <a href={recording.sourceUrl} target="_blank" rel="noreferrer">
            Originalaufnahme
          </a>{' '}
          ·{' '}
          <a href={recording.licenseUrl} target="_blank" rel="noreferrer">
            {recording.license}
          </a>
        </p>
        <small>{recording.note ?? 'Unveränderte Aufnahme.'}</small>
      </PopoverContent>
    </Popover>
  );
}
