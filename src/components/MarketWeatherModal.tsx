import React from 'react';
import { X, TrendingUp, Sun, CloudRain, Wind, Droplets } from 'lucide-react';

interface MarketWeatherModalProps {
  isOpen: boolean;
  type: 'market' | 'weather';
  onClose: () => void;
}

export const MarketWeatherModal: React.FC<MarketWeatherModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full border border-nyt-black shadow-2xl overflow-hidden rounded-sm relative">
        <div className="flex items-center justify-between border-b border-nyt-border px-6 py-3.5 bg-nyt-subtle">
          <div className="flex items-center space-x-2">
            {type === 'market' ? (
              <>
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span className="font-sans font-bold text-xs uppercase tracking-wider text-nyt-black">
                  Financial Markets Snapshot
                </span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-600" />
                <span className="font-sans font-bold text-xs uppercase tracking-wider text-nyt-black">
                  New York, NY Weather & Air Quality
                </span>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 text-nyt-gray hover:text-nyt-black rounded-sm"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 font-sans">
          {type === 'market' ? (
            <div className="space-y-4">
              <div className="flex items-baseline justify-between border-b border-nyt-border pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-nyt-gray">Benchmark Index</span>
                  <h3 className="text-2xl font-bold text-nyt-black">S&P 500 Index</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-nyt-black tabular-nums">5,842.48</div>
                  <div className="text-xs font-bold text-emerald-700 tabular-nums">+27.40 (+0.47% ↑)</div>
                </div>
              </div>

              {/* Other Key Markets */}
              <div className="grid grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-2.5 bg-nyt-subtle border border-nyt-border rounded-sm">
                  <span className="text-[10px] text-nyt-gray uppercase font-bold block">Dow Jones</span>
                  <span className="font-bold text-sm block tabular-nums">43,077.70</span>
                  <span className="text-emerald-700 text-[11px] font-semibold tabular-nums">+0.79% ↑</span>
                </div>
                <div className="p-2.5 bg-nyt-subtle border border-nyt-border rounded-sm">
                  <span className="text-[10px] text-nyt-gray uppercase font-bold block">Nasdaq Comp</span>
                  <span className="font-bold text-sm block tabular-nums">18,367.08</span>
                  <span className="text-emerald-700 text-[11px] font-semibold tabular-nums">+0.28% ↑</span>
                </div>
                <div className="p-2.5 bg-nyt-subtle border border-nyt-border rounded-sm">
                  <span className="text-[10px] text-nyt-gray uppercase font-bold block">10-Yr Treasury</span>
                  <span className="font-bold text-sm block tabular-nums">4.02%</span>
                  <span className="text-red-700 text-[11px] font-semibold tabular-nums">+0.03 pts</span>
                </div>
              </div>

              <p className="text-xs text-nyt-darkgray pt-2">
                U.S. equities edged higher as resilient retail spending and quarterly financial earnings offset ongoing central bank yield sensitivity.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-nyt-border pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-nyt-gray">Current Conditions</span>
                  <h3 className="text-3xl font-bold text-nyt-black">64°F</h3>
                  <span className="text-xs text-nyt-darkgray font-medium">Mostly Sunny • Manhattan</span>
                </div>
                <Sun className="w-12 h-12 text-amber-500 animate-spin-slow" />
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-nyt-subtle border border-nyt-border rounded-sm flex items-center space-x-2">
                  <Wind className="w-4 h-4 text-nyt-gray" />
                  <div>
                    <span className="text-[10px] text-nyt-gray uppercase block">Wind</span>
                    <span className="font-bold">8 mph WNW</span>
                  </div>
                </div>
                <div className="p-2.5 bg-nyt-subtle border border-nyt-border rounded-sm flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-nyt-gray" />
                  <div>
                    <span className="text-[10px] text-nyt-gray uppercase block">Humidity</span>
                    <span className="font-bold">48%</span>
                  </div>
                </div>
                <div className="p-2.5 bg-nyt-subtle border border-nyt-border rounded-sm flex items-center space-x-2">
                  <CloudRain className="w-4 h-4 text-nyt-gray" />
                  <div>
                    <span className="text-[10px] text-nyt-gray uppercase block">Precip</span>
                    <span className="font-bold">0%</span>
                  </div>
                </div>
              </div>

              {/* 3-day forecast */}
              <div className="border-t border-nyt-border pt-3 space-y-2 text-xs">
                <span className="font-bold text-[10px] uppercase tracking-wider text-nyt-gray block">
                  3-Day Regional Outlook
                </span>
                <div className="flex justify-between items-center py-1">
                  <span className="font-medium">Thursday</span>
                  <span className="text-nyt-darkgray">Sunny</span>
                  <span className="font-bold tabular-nums">67° / 50°</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-medium">Friday</span>
                  <span className="text-nyt-darkgray">Partly Cloudy</span>
                  <span className="font-bold tabular-nums">63° / 48°</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-medium">Saturday</span>
                  <span className="text-nyt-darkgray">Mild & Clear</span>
                  <span className="font-bold tabular-nums">69° / 52°</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-3 border-t border-nyt-border bg-nyt-subtle flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-nyt-black text-white text-[10px] font-bold uppercase tracking-wider rounded-sm hover:bg-gray-800"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
