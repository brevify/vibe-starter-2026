import React from 'react';
import { Search, UserCheck, Bookmark, Volume2, Newspaper, Sun, Moon } from 'lucide-react';

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
  onOpenTodaysPaper: () => void;
  onGoHome: () => void;
  currentUser: string | null;
  savedCount: number;
  onOpenSaved: () => void;
  paperTone: 'white' | 'newsprint' | 'sepia';
  onTogglePaperTone: (tone: 'white' | 'newsprint' | 'sepia') => void;
  isAudioPlaying: boolean;
  onOpenAudioBar: () => void;
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
  onOpenTodaysPaper,
  onGoHome,
  currentUser,
  savedCount,
  onOpenSaved,
  paperTone,
  onTogglePaperTone,
  isAudioPlaying,
  onOpenAudioBar
}) => {
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
    } else if (id === 'Audio') {
      onOpenAudioBar();
    } else {
      onSelectSection(id);
    }
  };

  return (
    <header className="max-w-[1280px] mx-auto px-4 pt-2.5 select-none" data-purpose="site-header-container">
      {/* BEGIN: TopUtilityBar */}
      <div className="flex items-center justify-between text-[11px] text-nyt-gray pb-2 border-b border-transparent">
        {/* Left side: Search & Date & Today's Paper & Tone switcher */}
        <div className="flex items-center space-x-3 font-medium">
          <button
            onClick={onOpenSearch}
            aria-label="Search articles"
            className="p-1 hover:text-black focus:outline-none transition-colors"
            title="Search The New York Times (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-nyt-black" />
          </button>
          <span className="text-nyt-black font-bold uppercase tracking-wider text-[11px]">
            Wednesday, October 16, 2024
          </span>
          <span className="text-gray-300">|</span>
          <button
            onClick={onOpenTodaysPaper}
            className="hover:underline text-nyt-gray transition-colors text-[11px] flex items-center space-x-1"
            title="Browse full print replica edition"
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Today's Paper</span>
          </button>

          {/* Paper Texture / Tone Picker for that authentic broadsheet feel */}
          <span className="text-gray-300 hidden md:inline">|</span>
          <div className="hidden md:flex items-center space-x-1" title="Reading paper tone">
            <button
              onClick={() => onTogglePaperTone('white')}
              className={`w-3.5 h-3.5 rounded-full border ${paperTone === 'white' ? 'ring-2 ring-nyt-black' : 'border-gray-300'} bg-white`}
              title="Modern White"
            />
            <button
              onClick={() => onTogglePaperTone('newsprint')}
              className={`w-3.5 h-3.5 rounded-full border ${paperTone === 'newsprint' ? 'ring-2 ring-nyt-black' : 'border-gray-300'} bg-[#FBF9F5]`}
              title="Newsprint Antique"
            />
            <button
              onClick={() => onTogglePaperTone('sepia')}
              className={`w-3.5 h-3.5 rounded-full border ${paperTone === 'sepia' ? 'ring-2 ring-nyt-black' : 'border-gray-300'} bg-[#EFECE6]`}
              title="Warm Broadsheet"
            />
          </div>

          {savedCount > 0 && (
            <>
              <span className="text-gray-300">|</span>
              <button
                onClick={onOpenSaved}
                className="hover:underline text-nyt-blue font-semibold text-[11px] flex items-center space-x-1"
                title="View your bookmarked articles"
              >
                <Bookmark className="w-3 h-3 fill-nyt-blue text-nyt-blue" />
                <span>Saved ({savedCount})</span>
              </button>
            </>
          )}

          {isAudioPlaying && (
            <button
              onClick={onOpenAudioBar}
              className="hidden lg:flex items-center space-x-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xs text-[10px] font-bold uppercase tracking-wider animate-pulse"
            >
              <Volume2 className="w-3 h-3" />
              <span>Audio Active</span>
            </button>
          )}
        </div>

        {/* Center: Edition Switcher */}
        <nav aria-label="Editions" className="hidden md:flex items-center space-x-3 text-[11px] font-sans">
          {editions.map((ed, idx) => (
            <React.Fragment key={ed}>
              <button
                onClick={() => onSelectEdition(ed)}
                className={`transition-colors cursor-pointer ${
                  activeEdition === ed
                    ? 'font-bold text-nyt-black underline underline-offset-4'
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
            className="bg-[#567b95] hover:bg-[#326891] text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-xs transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
          >
            Subscribe for $1/week
          </button>
          {currentUser ? (
            <div className="flex items-center space-x-1 bg-[#e9ecf0] text-nyt-black text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-xs">
              <UserCheck className="w-3 h-3 text-emerald-700" />
              <span className="truncate max-w-[85px]">{currentUser.split('@')[0]}</span>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="bg-[#e9ecf0] hover:bg-[#d8dce2] text-nyt-black text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-xs transition-colors cursor-pointer active:scale-[0.98]"
            >
              Log In
            </button>
          )}
        </div>
      </div>
      {/* END: TopUtilityBar */}

      {/* BEGIN: MastheadLogoSection */}
      <div className="py-2 text-center relative border-b border-nyt-border" data-purpose="masthead">
        {/* Newspaper Ear Motto & Volume Sub-Header */}
        <div className="flex justify-between items-end mb-1 text-[11px] text-nyt-gray font-serif">
          {/* S&P 500 Live Ticker */}
          <button
            onClick={onOpenMarket}
            className="hidden lg:flex flex-col items-start text-[11px] hover:opacity-80 transition-opacity p-0.5 text-left cursor-pointer"
            title="View financial market details"
          >
            <div className="flex items-center space-x-1.5">
              <span className="font-sans font-bold text-nyt-black">S&amp;P 500</span>
              <span className="text-emerald-700 font-sans tabular-nums font-semibold">+0.47% ↑</span>
            </div>
            <span className="text-[10px] font-sans text-gray-400">5,842.48 • Markets Open</span>
          </button>

          {/* Authentic Masthead Title with Pro Blackletter Styling */}
          <div className="mx-auto text-center">
            <h1
              onClick={onGoHome}
              className="text-5xl md:text-7xl lg:text-[76px] masthead-title text-nyt-black font-normal tracking-normal cursor-pointer select-none leading-none pt-1 hover:opacity-95 transition-opacity"
              title="Return to Front Page"
            >
              The New York Times
            </h1>
          </div>

          {/* Weather Widget with High/Low */}
          <button
            onClick={onOpenWeather}
            className="hidden lg:flex flex-col items-end text-[11px] hover:opacity-80 transition-opacity p-0.5 text-right cursor-pointer"
            title="View New York weather forecast"
          >
            <span className="font-sans font-semibold text-nyt-black">New York, NY 64°F</span>
            <span className="text-[10px] font-sans text-gray-400">Sunny • High 67° / Low 50°</span>
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
                  className={`hover:underline font-medium transition-colors cursor-pointer ${
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
