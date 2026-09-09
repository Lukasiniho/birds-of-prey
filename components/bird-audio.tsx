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

export function BirdAudio({ birdId, name }: { birdId: string; name: string }) {
  const recording = birdRecordings[birdId];
  const audio = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'playing' | 'error'>(
    'idle',
  );
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
  async function toggle() {
    const player = audio.current;
    if (!player) return;
    if (state === 'loading' || !player.paused) {
      player.pause();
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
      <audio
        ref={audio}
        preload="none"
        onPlaying={() => setState('playing')}
        onPause={() => setState('idle')}
        onEnded={() => setState('idle')}
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
        <strong>
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
