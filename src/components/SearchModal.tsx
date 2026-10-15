import React, { useState, useMemo } from 'react';
import { X, Search, Calendar, User, ArrowRight } from 'lucide-react';
import { Article, ARTICLES } from '../data/newsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectArticle }) => {
  const [query, setQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ARTICLES.filter(art => {
      const matchesSection = selectedSection === 'all' || art.section.toLowerCase().includes(selectedSection.toLowerCase());
      if (!matchesSection) return false;
      if (!q) return true;
      return (
        art.headline.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.byline.toLowerCase().includes(q) ||
        art.section.toLowerCase().includes(q)
      );
    });
  }, [query, selectedSection]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16">
      <div className="bg-white max-w-2xl w-full border border-nyt-black shadow-2xl overflow-hidden rounded-sm">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-nyt-border gap-3">
          <Search className="w-5 h-5 text-nyt-gray shrink-0" />
          <input
            type="text"
            placeholder="Search The New York Times (e.g. Trump, Middle East, Inflation, Gnocchi)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="w-full text-base font-sans text-nyt-black placeholder:text-gray-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-sans text-nyt-gray hover:text-nyt-black uppercase tracking-wider"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-nyt-gray hover:text-nyt-black transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Filter Tags */}
        <div className="px-4 py-2 bg-nyt-subtle border-b border-nyt-border flex items-center space-x-2 overflow-x-auto text-[11px] font-sans">
          <span className="text-nyt-gray font-semibold shrink-0">Filter:</span>
          {['all', 'U.S.', 'Opinion', 'Cooking', 'Wirecutter'].map(sec => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-2.5 py-1 rounded-sm capitalize transition-colors ${
                selectedSection === sec
                  ? 'bg-nyt-black text-white font-semibold'
                  : 'bg-white text-nyt-gray border border-nyt-border hover:text-nyt-black'
              }`}
            >
              {sec === 'all' ? 'All Sections' : sec}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-nyt-border">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-sm text-nyt-gray">
              No matching articles found for “{query}”. Try another keyword.
            </div>
          ) : (
            filtered.map(art => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="py-3 group cursor-pointer hover:bg-stone-50 px-2 rounded-sm transition-colors"
              >
                <div className="flex items-center space-x-2 text-[10px] font-sans font-bold uppercase tracking-wider text-nyt-blue mb-1">
                  <span>{art.section}</span>
                  {art.kicker && <span className="text-red-700">• {art.kicker}</span>}
                </div>
                <h4 className="font-headline font-bold text-lg text-nyt-black group-hover:underline">
                  {art.headline}
                </h4>
                <p className="font-summary text-xs text-nyt-darkgray line-clamp-2 mt-1">
                  {art.summary}
                </p>
                <div className="flex items-center space-x-3 text-[11px] text-nyt-gray font-sans mt-2">
                  <span className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{art.byline}</span>
                  </span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-nyt-subtle border-t border-nyt-border text-[11px] text-nyt-gray flex items-center justify-between font-sans">
          <span>{filtered.length} stories found</span>
          <span className="italic font-serif">The New York Times Archive Search</span>
        </div>
      </div>
    </div>
  );
};
