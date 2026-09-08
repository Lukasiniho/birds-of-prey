'use client';

import { useEffect, useRef, useState } from 'react';
import { Info, Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { BirdRecording } from '@/lib/bird-recordings';

export function QuizCallPlayer({
  recording,
  revealed,
}: {
  recording: BirdRecording;
  revealed: boolean;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const attempt = useRef(0);
  const [state, setState] = useState<'idle' | 'loading' | 'playing' | 'error'>(
    'idle',
  );

  useEffect(() => {
    const player = audio.current;
    return () => {
      attempt.current++;
      player?.pause();
    };
  }, []);

  useEffect(() => {
    attempt.current++;
    audio.current?.pause();
    setState('idle');
  }, [revealed]);

  useEffect(() => {
    if (state !== 'loading') return;
    const timer = window.setTimeout(() => {
      attempt.current++;
      audio.current?.pause();
      setState('error');
    }, 15000);
    return () => window.clearTimeout(timer);
  }, [state]);

  async function toggle() {
    const player = audio.current;
    if (!player) return;
    const current = ++attempt.current;
    if (state === 'loading' || !player.paused) {
      player.pause();
      setState('idle');
      return;
    }
    if (state === 'error') player.load();
    setState('loading');
    try {
      await player.play();
    } catch {
      if (attempt.current === current) setState('error');
    }
  }

  const label =
    state === 'loading'
      ? 'Laden abbrechen'
      : state === 'playing'
        ? 'Ruf pausieren'
        : state === 'error'
          ? 'Erneut versuchen'
          : 'Ruf anhören';
  const Icon =
    state === 'error'
      ? RotateCcw
      : state === 'playing' || state === 'loading'
        ? Pause
        : Play;

  return (
    <div className="q-call-player" data-revealed={revealed}>
      <Button
        variant="ghost"
        className="q-call-play"
        onClick={toggle}
        aria-label={label}
      >
        <Icon
          aria-hidden="true"
          className={revealed ? 'size-4.5' : 'size-8'}
          fill={state === 'error' ? 'none' : 'currentColor'}
          strokeWidth={state === 'error' ? 1.5 : 0}
        />
        <span>{label}</span>
      </Button>
      <p
        className={
          state === 'error' || state === 'loading' ? 'q-call-status' : 'sr-only'
        }
        role="status"
      >
        {state === 'error'
          ? 'Die Aufnahme konnte nicht geladen werden. Versuche es erneut.'
          : state === 'loading'
            ? 'Aufnahme wird geladen …'
            : ''}
      </p>
      <audio
        ref={audio}
        src={recording.url}
        preload="none"
        onPlaying={() => setState('playing')}
        onPause={() =>
          setState((current) => (current === 'error' ? current : 'idle'))
        }
        onEnded={() => {
          if (audio.current) audio.current.currentTime = 0;
          setState('idle');
        }}
        onError={() => setState('error')}
      />
    </div>
  );
}

export function QuizCallInfo({ recording }: { recording: BirdRecording }) {
  return (
    <Popover>
      <PopoverTrigger
        className="range-map-source q-call-credit"
        aria-label="Aufnahme, Quelle und Lizenz"
        title="Aufnahme, Quelle und Lizenz"
      >
        <Info size={14} aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        className="range-map-source-details"
      >
        <div className="range-map-credits">
          <div>
            <a href={recording.sourceUrl} target="_blank" rel="noreferrer">
              {recording.author}
            </a>
          </div>
          <small>
            <a href={recording.licenseUrl} target="_blank" rel="noreferrer">
              {recording.license}
            </a>
            {' · '}
            {Math.round(recording.durationSeconds)} Sekunden
          </small>
          <small>Gekürzte, bearbeitete Aufnahme.</small>
        </div>
      </PopoverContent>
    </Popover>
  );
}
