import React, { useState } from 'react';
import { Search, UserCheck } from 'lucide-react';

interface HeaderProps {
  activeEdition: string;
  onSelectEdition: (edition: string) => void;
  activeSection: string;
  onSelectSection: (section: string) => void;
  onOpenSearch: () => void;
  onOpenSubscribe: () => void;
  onOpenLogin: () => void;
  onOpenMarket: () => void;
  onOpenWeather: () => void;
  onOpenCrossword: () => void;
  onOpenCooking: () => void;
  onOpenWirecutter: () => void;
  onGoHome: () => void;
  currentUser: string | null;
  savedCount: number;
  onOpenSaved: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeEdition,
  onSelectEdition,
  activeSection,
  onSelectSection,
  onOpenSearch,
  onOpenSubscribe,
  onOpenLogin,
  onOpenMarket,
  onOpenWeather,
  onOpenCrossword,
  onOpenCooking,
  onOpenWirecutter,
  onGoHome,
  currentUser,
  savedCount,
  onOpenSaved
}) => {
  const [showTodayPaperToast, setShowTodayPaperToast] = useState(false);

  const sections = [
    { label: 'U.S.', id: 'U.S.' },
    { label: 'World', id: 'World' },
    { label: 'Business', id: 'Business' },
    { label: 'Arts', id: 'Arts' },
    { label: 'Lifestyle', id: 'Lifestyle' },
    { label: 'Opinion', id: 'Opinion' },
    { label: 'Audio', id: 'Audio' },
    { label: 'Games', id: 'Games' },
    { label: 'Cooking', id: 'Cooking' },
    { label: 'Wirecutter', id: 'Wirecutter' },
    { label: 'The Athletic', id: 'The Athletic' }
  ];

  const editions = ['U.S.', 'International', 'Canada', 'Español', '中文'];

  const handleSectionClick = (id: string) => {
    if (id === 'Games') {
      onOpenCrossword();
    } else if (id === 'Cooking') {
      onOpenCooking();
    } else if (id === 'Wirecutter') {
      onOpenWirecutter();
    } else {
      onSelectSection(id);
    }
  };

  const handleTodayPaperClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowTodayPaperToast(true);
    setTimeout(() => setShowTodayPaperToast(false), 3000);
  };

  return (
    <header className="max-w-[1280px] mx-auto px-4 pt-2.5 select-none" data-purpose="site-header-container">
      {/* Toast for Today's Paper */}
      {showTodayPaperToast && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-nyt-black text-white text-xs px-4 py-2 rounded-sm shadow-xl font-sans flex items-center space-x-2 animate-bounce">
          <span>Viewing Wednesday, October 16, 2024 • Vol. CLXXIV No. 60,318</span>
        </div>
      )}

      {/* BEGIN: TopUtilityBar */}
      <div className="flex items-center justify-between text-[11px] text-nyt-gray pb-2 border-b border-transparent">
        {/* Left side: Date & Today's Paper */}
        <div className="flex items-center space-x-3 font-medium">
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="p-1 hover:text-black focus:outline-none transition-colors"
          >
            <Search className="w-4 h-4 text-nyt-black" />
          </button>
          <span className="text-nyt-black font-bold uppercase tracking-wider text-[11px]">
            Wednesday, October 16, 2024
          </span>
          <span className="text-gray-300">|</span>
          <button
            onClick={handleTodayPaperClick}
            className="hover:underline text-nyt-gray transition-colors text-[11px]"
          >
            Today's Paper
          </button>

          {savedCount > 0 && (
            <>
              <span className="text-gray-300">|</span>
              <button
                onClick={onOpenSaved}
                className="hover:underline text-nyt-blue font-semibold text-[11px]"
              >
                Saved ({savedCount})
              </button>
            </>
          )}
        </div>

        {/* Center: Edition Switcher */}
        <nav aria-label="Editions" className="hidden md:flex items-center space-x-3 text-[11px] font-sans">
          {editions.map((ed, idx) => (
            <React.Fragment key={ed}>
              <button
                onClick={() => onSelectEdition(ed)}
                className={`transition-colors ${
                  activeEdition === ed
                    ? 'font-semibold text-nyt-black'
                    : 'text-nyt-gray hover:underline'
                }`}
              >
                {ed}
              </button>
              {idx < editions.length - 1 && <span className="text-gray-300">|</span>}
            </React.Fragment>
          ))}
        </nav>

        {/* Right side: Subscription & Auth CTA buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenSubscribe}
            className="bg-[#567b95] hover:bg-[#326891] text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-sm transition-colors cursor-pointer"
          >
            Subscribe for $1/week
          </button>
          {currentUser ? (
            <div className="flex items-center space-x-1 bg-[#e9ecf0] text-nyt-black text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-sm">
              <UserCheck className="w-3 h-3 text-emerald-700" />
              <span className="truncate max-w-[90px]">{currentUser.split('@')[0]}</span>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="bg-[#e9ecf0] hover:bg-[#d8dce2] text-nyt-black text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-sm transition-colors cursor-pointer"
            >
              Log In
            </button>
          )}
        </div>
      </div>
      {/* END: TopUtilityBar */}

      {/* BEGIN: MastheadLogoSection */}
      <div className="py-2 text-center relative border-b border-nyt-border" data-purpose="masthead">
        <div className="flex justify-between items-end mb-1 text-[11px] text-nyt-gray font-serif">
          {/* S&P 500 Live Ticker */}
          <button
            onClick={onOpenMarket}
            className="hidden lg:flex items-center space-x-2 text-[11px] hover:opacity-80 transition-opacity p-1 text-left"
            title="View financial market details"
          >
            <span className="font-sans font-bold text-nyt-black">S&amp;P 500</span>
            <span className="text-emerald-700 font-sans tabular-nums">+0.47% ↑</span>
          </button>

          {/* Authentic Masthead Title */}
          <h1
            onClick={onGoHome}
            className="mx-auto text-5xl md:text-7xl lg:text-[76px] masthead-title text-nyt-black font-normal tracking-normal cursor-pointer select-none leading-none pt-1 hover:opacity-95 transition-opacity"
            title="Return to Front Page"
          >
            The New York Times
          </h1>

          {/* Weather Widget */}
          <button
            onClick={onOpenWeather}
            className="hidden lg:flex items-center space-x-1 text-[11px] hover:opacity-80 transition-opacity p-1 text-right"
            title="View New York weather forecast"
          >
            <span className="font-sans">New York, NY 64°F</span>
          </button>
        </div>
      </div>
      {/* END: MastheadLogoSection */}

      {/* BEGIN: PrimaryNavigation */}
      <nav aria-label="Main Navigation" className="py-1.5 border-b border-nyt-border overflow-x-auto scrollbar-none">
        <ul className="flex items-center justify-center space-x-4 md:space-x-6 text-[12px] text-nyt-black font-sans font-normal whitespace-nowrap min-w-max mx-auto">
          {sections.map(s => {
            const isActive = activeSection === s.id;
            return (
              <li key={s.id}>
                <button
                  onClick={() => handleSectionClick(s.id)}
                  className={`hover:underline font-medium transition-colors ${
                    isActive ? 'font-bold text-nyt-black underline underline-offset-4 decoration-2' : 'text-nyt-black'
                  }`}
                >
                  {s.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="newspaper-rule-double mt-0.5 mb-4"></div>
      {/* END: PrimaryNavigation */}
    </header>
  );
};
