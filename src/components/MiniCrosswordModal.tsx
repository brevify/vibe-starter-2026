import React, { useState, useEffect, useRef } from 'react';
import { X, RotateCcw, CheckCircle2, Clock, Trophy, HelpCircle } from 'lucide-react';
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
  const [checkedCells, setCheckedCells] = useState<boolean[][]>(() =>
    Array(5).fill(null).map(() => Array(5).fill(false))
  );
  const [revealedCells, setRevealedCells] = useState<boolean[][]>(() =>
    Array(5).fill(null).map(() => Array(5).fill(false))
  );

  const gridRef = useRef<HTMLDivElement>(null);

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
    let allCorrect = true;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const expected = WEDNESDAY_MINI.grid[r][c];
        if (expected !== '#' && userGrid[r][c] !== expected) {
          allCorrect = false;
          break;
        }
      }
    }
    if (allCorrect) {
      setIsSolved(true);
      setTimerRunning(false);
    }
  }, [userGrid, isOpen, isSolved]);

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
        // move back
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
    } else if (/^[A-Z]$/.test(key)) {
      const nextGrid = userGrid.map(r => [...r]);
      nextGrid[row][col] = key;
      setUserGrid(nextGrid);

      // Advance cursor
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
    setCheckedCells(Array(5).fill(null).map(() => Array(5).fill(false)));
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
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  // Active clue determination
  const activeClueAcross = WEDNESDAY_MINI.clues.across.find(c => c.row === selectedCell.row);
  const activeClueDown = WEDNESDAY_MINI.clues.down.find(c => c.col === selectedCell.col);
  const currentClue = direction === 'across' ? activeClueAcross : activeClueDown;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white max-w-2xl w-full border border-nyt-black shadow-2xl relative outline-none flex flex-col max-h-[90vh] overflow-hidden"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-nyt-border px-6 py-4 bg-nyt-subtle">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-nyt-gray font-sans block">
              NYT Games • Daily Mini
            </span>
            <h2 className="text-xl font-headline font-bold text-nyt-black">
              Wednesday, October 16, 2024
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 font-sans font-semibold text-sm text-nyt-black tabular-nums bg-white px-2.5 py-1 border border-nyt-border rounded-sm">
              <Clock className="w-3.5 h-3.5 text-nyt-gray" />
              <span>{formatTime(seconds)}</span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-200 text-nyt-gray hover:text-nyt-black transition-colors rounded-sm"
              aria-label="Close puzzle"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Victory Banner */}
        {isSolved && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-3 flex items-center justify-between text-emerald-900 animate-fadeIn">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-600" />
              <div>
                <p className="font-bold text-sm">Congratulations! You solved the Mini!</p>
                <p className="text-xs text-emerald-700">Finished in {formatTime(seconds)} • New record saved!</p>
              </div>
            </div>
            <button 
              onClick={handleReset}
              className="text-xs font-bold uppercase tracking-wider bg-emerald-700 text-white px-3 py-1.5 rounded-sm hover:bg-emerald-800 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Active Clue Bar */}
        <div className="px-6 py-3 bg-blue-50/70 border-b border-blue-100 flex items-center justify-between min-h-[46px]">
          <div className="flex items-center space-x-2 text-sm text-nyt-black">
            <span className="font-bold text-blue-900 uppercase text-xs font-sans">
              {direction === 'across' ? `${activeClueAcross?.num}A` : `${activeClueDown?.num}D`}
            </span>
            <span className="font-headline font-medium">
              {currentClue?.clue || 'Select a clue or cell'}
            </span>
          </div>
          <button
            onClick={() => setDirection(d => (d === 'across' ? 'down' : 'across'))}
            className="text-[11px] font-sans font-semibold uppercase text-nyt-blue hover:underline whitespace-nowrap"
          >
            Switch to {direction === 'across' ? 'Down' : 'Across'}
          </button>
        </div>

        {/* Puzzle Board & Clues Container */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* 5x5 Grid */}
          <div className="md:col-span-6 flex flex-col items-center">
            <div 
              ref={gridRef}
              className="grid grid-cols-5 border-2 border-nyt-black bg-nyt-black gap-[1px] w-64 h-64 select-none shadow-sm"
            >
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
                      className={`relative flex items-center justify-center font-sans font-bold text-xl cursor-pointer transition-colors ${
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
                className="px-2.5 py-1.5 border border-nyt-border hover:bg-gray-100 text-nyt-darkgray font-semibold rounded-sm flex items-center space-x-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Reveal Letter</span>
              </button>
              <button
                onClick={handleReset}
                className="px-2.5 py-1.5 border border-nyt-border hover:bg-gray-100 text-nyt-darkgray font-semibold rounded-sm flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          </div>

          {/* Clues Column */}
          <div className="md:col-span-6 space-y-4 text-xs font-sans">
            {/* Across Clues */}
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
                      className={`cursor-pointer px-2 py-1 rounded-sm transition-colors ${
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

            {/* Down Clues */}
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
                      className={`cursor-pointer px-2 py-1 rounded-sm transition-colors ${
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
        <div className="px-6 py-3 border-t border-nyt-border bg-nyt-subtle flex items-center justify-between text-xs text-nyt-gray">
          <span>Use keyboard letter keys to type, arrow keys to navigate, and backspace to erase.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-nyt-black text-white font-bold uppercase tracking-wider text-[10px] rounded-sm hover:bg-gray-800"
          >
            Back to Front Page
          </button>
        </div>
      </div>
    </div>
  );
};
