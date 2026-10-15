import React, { useState, useEffect, useRef } from 'react';
import { X, RotateCcw, Clock, Trophy, HelpCircle, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { WEDNESDAY_MINI } from '../data/newsData';

interface MiniCrosswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MiniCrosswordModal: React.FC<MiniCrosswordModalProps> = ({ isOpen, onClose }) => {
  const [userGrid, setUserGrid] = useState<string[][]>(() =>
    Array(5).fill(null).map(() => Array(5).fill(''))
  );
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number }>({ row: 0, col: 0 });
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [isSolved, setIsSolved] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [revealedCells, setRevealedCells] = useState<boolean[][]>(() =>
    Array(5).fill(null).map(() => Array(5).fill(false))
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sound synthesizer using standard Web Audio API
  const playChime = (type: 'key' | 'win' | 'reveal') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'key') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'win') {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
        notes.forEach((freq, idx) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
          g.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.12);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.35);
          o.start(ctx.currentTime + idx * 0.12);
          o.stop(ctx.currentTime + idx * 0.12 + 0.35);
        });
      } else {
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch {}
  };

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isOpen && timerRunning && !isSolved) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, timerRunning, isSolved]);

  // Solution check effect
  useEffect(() => {
    if (!isOpen || isSolved) return;
    let allFilled = true;
    let allCorrect = true;

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const expected = WEDNESDAY_MINI.grid[r][c];
        if (expected !== '#') {
          if (userGrid[r][c] === '') {
            allFilled = false;
          }
          if (userGrid[r][c] !== expected) {
            allCorrect = false;
          }
        }
      }
    }

    if (allFilled && allCorrect) {
      setIsSolved(true);
      setTimerRunning(false);
      playChime('win');
      fireConfetti();
    }
  }, [userGrid, isOpen, isSolved]);

  // Confetti effect
  const fireConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 500;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const particles: any[] = [];
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6', '#eab308'];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.7) * 16,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10,
        opacity: 1
      });
    }

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.opacity = Math.max(0, 1 - frame / 80);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      if (frame < 80) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    animate();
  };

  const handleCellClick = (r: number, c: number) => {
    if (selectedCell.row === r && selectedCell.col === c) {
      setDirection(d => (d === 'across' ? 'down' : 'across'));
    } else {
      setSelectedCell({ row: r, col: c });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { row, col } = selectedCell;
    const key = e.key.toUpperCase();

    if (e.key === 'ArrowRight') {
      setSelectedCell(prev => ({ ...prev, col: Math.min(4, prev.col + 1) }));
    } else if (e.key === 'ArrowLeft') {
      setSelectedCell(prev => ({ ...prev, col: Math.max(0, prev.col - 1) }));
    } else if (e.key === 'ArrowDown') {
      setSelectedCell(prev => ({ ...prev, row: Math.min(4, prev.row + 1) }));
    } else if (e.key === 'ArrowUp') {
      setSelectedCell(prev => ({ ...prev, row: Math.max(0, prev.row - 1) }));
    } else if (e.key === 'Backspace') {
      const nextGrid = userGrid.map(r => [...r]);
      if (nextGrid[row][col] !== '') {
        nextGrid[row][col] = '';
        setUserGrid(nextGrid);
      } else {
        if (direction === 'across' && col > 0) {
          setSelectedCell({ row, col: col - 1 });
          nextGrid[row][col - 1] = '';
          setUserGrid(nextGrid);
        } else if (direction === 'down' && row > 0) {
          setSelectedCell({ row: row - 1, col });
          nextGrid[row - 1][col] = '';
          setUserGrid(nextGrid);
        }
      }
      playChime('key');
    } else if (/^[A-Z]$/.test(key)) {
      const nextGrid = userGrid.map(r => [...r]);
      nextGrid[row][col] = key;
      setUserGrid(nextGrid);
      playChime('key');

      if (direction === 'across') {
        if (col < 4) {
          setSelectedCell({ row, col: col + 1 });
        }
      } else {
        if (row < 4) {
          setSelectedCell({ row: row + 1, col });
        }
      }
    }
  };

  const handleReset = () => {
    setUserGrid(Array(5).fill(null).map(() => Array(5).fill('')));
    setRevealedCells(Array(5).fill(null).map(() => Array(5).fill(false)));
    setSeconds(0);
    setIsSolved(false);
    setTimerRunning(true);
    setSelectedCell({ row: 0, col: 0 });
  };

  const handleRevealCurrent = () => {
    const { row, col } = selectedCell;
    const ans = WEDNESDAY_MINI.grid[row][col];
    const nextGrid = userGrid.map(r => [...r]);
    nextGrid[row][col] = ans;
    setUserGrid(nextGrid);

    const nextRevealed = revealedCells.map(r => [...r]);
    nextRevealed[row][col] = true;
    setRevealedCells(nextRevealed);
    playChime('reveal');
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  const activeClueAcross = WEDNESDAY_MINI.clues.across.find(c => c.row === selectedCell.row);
  const activeClueDown = WEDNESDAY_MINI.clues.down.find(c => c.col === selectedCell.col);
  const currentClue = direction === 'across' ? activeClueAcross : activeClueDown;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white max-w-2xl w-full border border-nyt-black shadow-2xl relative outline-none flex flex-col max-h-[90vh] overflow-hidden rounded-xs"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-nyt-border px-6 py-4 bg-nyt-subtle">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-nyt-gray font-sans block flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>NYT Games • Daily Mini Crossword</span>
            </span>
            <h2 className="text-xl font-headline font-bold text-nyt-black">
              Wednesday, October 16, 2024
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 text-nyt-gray hover:text-nyt-black transition-colors"
              title={soundEnabled ? 'Mute game audio' : 'Unmute audio'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <div className="flex items-center space-x-1.5 font-sans font-semibold text-sm text-nyt-black tabular-nums bg-white px-2.5 py-1 border border-nyt-border rounded-xs shadow-xs">
              <Clock className="w-3.5 h-3.5 text-nyt-gray" />
              <span>{formatTime(seconds)}</span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-200 text-nyt-gray hover:text-nyt-black transition-colors rounded-xs"
              aria-label="Close puzzle"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Victory Banner */}
        {isSolved && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-3.5 flex items-center justify-between text-emerald-900 animate-fadeIn z-20">
            <div className="flex items-center space-x-2.5">
              <Trophy className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <p className="font-bold text-sm">Congratulations! You solved the Daily Mini!</p>
                <p className="text-xs text-emerald-700">Finished in {formatTime(seconds)} • Daily streak: 12 days</p>
              </div>
            </div>
            <button 
              onClick={handleReset}
              className="text-xs font-bold uppercase tracking-wider bg-emerald-700 text-white px-3 py-1.5 rounded-xs hover:bg-emerald-800 transition-colors shadow-xs"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Active Clue Bar */}
        <div className="px-6 py-2.5 bg-blue-50/70 border-b border-blue-100 flex items-center justify-between min-h-[44px]">
          <div className="flex items-center space-x-2 text-sm text-nyt-black">
            <span className="font-bold text-blue-900 uppercase text-xs font-sans">
              {direction === 'across' ? `${activeClueAcross?.num}A` : `${activeClueDown?.num}D`}
            </span>
            <span className="font-headline font-semibold">
              {currentClue?.clue || 'Select a clue or cell'}
            </span>
          </div>
          <button
            onClick={() => setDirection(d => (d === 'across' ? 'down' : 'across'))}
            className="text-[11px] font-sans font-semibold uppercase text-nyt-blue hover:underline whitespace-nowrap cursor-pointer"
          >
            Switch to {direction === 'across' ? 'Down' : 'Across'}
          </button>
        </div>

        {/* Puzzle Board & Clues Container */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* 5x5 Grid */}
          <div className="md:col-span-6 flex flex-col items-center">
            <div className="grid grid-cols-5 border-2 border-nyt-black bg-nyt-black gap-[1px] w-64 h-64 select-none shadow-md">
              {userGrid.map((row, r) =>
                row.map((cell, c) => {
                  const isSelected = selectedCell.row === r && selectedCell.col === c;
                  const isInWord =
                    direction === 'across'
                      ? selectedCell.row === r
                      : selectedCell.col === c;
                  const cellNum = WEDNESDAY_MINI.numbers[r][c];

                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`relative flex items-center justify-center font-sans font-bold text-2xl cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-amber-300 text-nyt-black'
                          : isInWord
                          ? 'bg-blue-100/90 text-nyt-black'
                          : 'bg-white hover:bg-gray-50 text-nyt-black'
                      }`}
                    >
                      {cellNum && (
                        <span className="absolute top-0.5 left-1 text-[9px] font-sans font-semibold text-nyt-black select-none pointer-events-none">
                          {cellNum}
                        </span>
                      )}
                      <span className="pt-2">{cell}</span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2 mt-4 text-[11px] font-sans">
              <button
                onClick={handleRevealCurrent}
                className="px-2.5 py-1.5 border border-nyt-border hover:bg-gray-100 text-nyt-darkgray font-semibold rounded-xs flex items-center space-x-1 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Reveal Letter</span>
              </button>
              <button
                onClick={handleReset}
                className="px-2.5 py-1.5 border border-nyt-border hover:bg-gray-100 text-nyt-darkgray font-semibold rounded-xs flex items-center space-x-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Grid</span>
              </button>
            </div>
          </div>

          {/* Clues Column */}
          <div className="md:col-span-6 space-y-4 text-xs font-sans">
            <div>
              <h3 className="font-bold text-nyt-black uppercase tracking-wider text-[11px] pb-1 border-b border-nyt-black mb-1.5">
                Across
              </h3>
              <ul className="space-y-1.5">
                {WEDNESDAY_MINI.clues.across.map(clue => {
                  const isActive = direction === 'across' && selectedCell.row === clue.row;
                  return (
                    <li
                      key={`across-${clue.num}`}
                      onClick={() => {
                        setDirection('across');
                        setSelectedCell({ row: clue.row, col: 0 });
                      }}
                      className={`cursor-pointer px-2 py-1 rounded-xs transition-colors ${
                        isActive ? 'bg-blue-100 font-semibold text-nyt-black' : 'hover:bg-gray-100 text-nyt-darkgray'
                      }`}
                    >
                      <span className="font-bold mr-1.5 text-nyt-black">{clue.num}</span>
                      {clue.clue}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-nyt-black uppercase tracking-wider text-[11px] pb-1 border-b border-nyt-black mb-1.5">
                Down
              </h3>
              <ul className="space-y-1.5">
                {WEDNESDAY_MINI.clues.down.map(clue => {
                  const isActive = direction === 'down' && selectedCell.col === clue.col;
                  return (
                    <li
                      key={`down-${clue.num}`}
                      onClick={() => {
                        setDirection('down');
                        setSelectedCell({ row: 0, col: clue.col });
                      }}
                      className={`cursor-pointer px-2 py-1 rounded-xs transition-colors ${
                        isActive ? 'bg-blue-100 font-semibold text-nyt-black' : 'hover:bg-gray-100 text-nyt-darkgray'
                      }`}
                    >
                      <span className="font-bold mr-1.5 text-nyt-black">{clue.num}</span>
                      {clue.clue}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="px-6 py-3 border-t border-nyt-border bg-nyt-subtle flex items-center justify-between text-xs text-nyt-gray font-sans">
          <span>Type with your keyboard, arrow keys to navigate.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-nyt-black text-white font-bold uppercase tracking-wider text-[10px] rounded-xs hover:bg-gray-800 transition-colors"
          >
            Back to Front Page
          </button>
        </div>
      </div>
    </div>
  );
};
