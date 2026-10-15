import React from 'react';
import { Play, Pause, X, RotateCcw, RotateCw, Volume2 } from 'lucide-react';
import { Article } from '../data/newsData';

interface AudioPlayerBarProps {
  article: Article | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  progress: number;
  onSeek: (newProgress: number) => void;
  playbackRate: number;
  onChangeRate: (rate: number) => void;
  onClose: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  article,
  isPlaying,
  onTogglePlay,
  progress,
  onSeek,
  playbackRate,
  onChangeRate,
  onClose
}) => {
  if (!article) return null;

  const totalMin = article.audioMinutes || 5;
  const currentTotalSec = (progress / 100) * (totalMin * 60);
  const curM = Math.floor(currentTotalSec / 60);
  const curS = Math.floor(currentTotalSec % 60);

  const rates = [1, 1.25, 1.5, 2];

  const handleNextRate = () => {
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    onChangeRate(rates[nextIndex]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#121212] text-white border-t border-neutral-700 shadow-2xl px-4 py-2.5 transition-all">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4 font-sans">
        {/* Story info */}
        <div className="flex items-center space-x-3 min-w-0 max-w-[320px] md:max-w-[420px]">
          <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-700">
            <Volume2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="truncate">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block leading-tight">
              NYT Audio Dispatch
            </span>
            <span className="text-xs font-semibold text-white truncate block">
              {article.headline}
            </span>
          </div>
        </div>

        {/* Player controls */}
        <div className="flex-1 max-w-[500px] flex flex-col items-center">
          <div className="flex items-center space-x-4 mb-1">
            <button
              onClick={() => onSeek(Math.max(0, progress - 10))}
              className="p-1 text-neutral-400 hover:text-white transition-colors"
              title="Rewind 15 seconds"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onTogglePlay}
              className="w-8 h-8 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center transition-colors shadow-sm"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-black" />
              ) : (
                <Play className="w-4 h-4 fill-black ml-0.5" />
              )}
            </button>

            <button
              onClick={() => onSeek(Math.min(100, progress + 10))}
              className="p-1 text-neutral-400 hover:text-white transition-colors"
              title="Fast forward 15 seconds"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleNextRate}
              className="text-[11px] font-mono text-neutral-300 hover:text-white border border-neutral-700 px-1.5 py-0.5 rounded-xs"
              title="Playback speed"
            >
              {playbackRate}x
            </button>
          </div>

          {/* Scrub Bar */}
          <div className="w-full flex items-center space-x-2 text-[10px] font-mono text-neutral-400">
            <span className="tabular-nums">
              {curM}:{curS < 10 ? '0' : ''}{curS}
            </span>
            <div
              onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newPct = (clickX / rect.width) * 100;
                onSeek(Math.min(100, Math.max(0, newPct)));
              }}
              className="flex-1 h-1 bg-neutral-800 hover:h-2 rounded-full cursor-pointer transition-all relative overflow-hidden"
            >
              <div
                className="bg-white h-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="tabular-nums">{totalMin}:00</span>
          </div>
        </div>

        {/* Close */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
            title="Dismiss Audio Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
