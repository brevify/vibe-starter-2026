import React, { useState } from 'react';
import { X, Newspaper, ChevronRight, BookOpen, Printer } from 'lucide-react';
import { Article, ARTICLES } from '../data/newsData';

interface TodaysPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const TodaysPaperModal: React.FC<TodaysPaperModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle
}) => {
  const [selectedSection, setSelectedSection] = useState<'A' | 'B' | 'C' | 'D' | 'O'>('A');

  if (!isOpen) return null;

  const sectionsMeta = {
    A: { title: 'Section A: Main News & U.S.', pages: 'Pages A1–A24' },
    B: { title: 'Section B: Business Day', pages: 'Pages B1–B12' },
    C: { title: 'Section C: Arts & Culture', pages: 'Pages C1–C10' },
    D: { title: 'Section D: Styles & Food', pages: 'Pages D1–D8' },
    O: { title: 'Section SR: Opinion & Editorial', pages: 'Pages A22–A23' }
  };

  const getArticlesForSection = () => {
    switch (selectedSection) {
      case 'A':
        return ARTICLES.filter(a => a.section.includes('U.S.') || a.section === 'World');
      case 'B':
        return ARTICLES.filter(a => a.section === 'Business' || a.section === 'Economy');
      case 'C':
        return ARTICLES.filter(a => a.section === 'Arts' || a.section === 'The Athletic');
      case 'D':
        return ARTICLES.filter(a => a.section === 'Cooking' || a.section === 'Wirecutter' || a.section === 'Lifestyle');
      case 'O':
        return ARTICLES.filter(a => a.isOpinion);
      default:
        return ARTICLES;
    }
  };

  const sectionArticles = getArticlesForSection();

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-3xl w-full border border-nyt-black shadow-2xl overflow-hidden rounded-sm relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-nyt-border px-6 py-4 bg-stone-50">
          <div className="flex items-center space-x-2">
            <Newspaper className="w-5 h-5 text-nyt-black" />
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-nyt-gray font-sans block">
                The Print Replica • Vol. CLXXIV No. 60,318
              </span>
              <h2 className="font-headline font-bold text-xl text-nyt-black">
                Today's Paper: Wednesday, October 16, 2024
              </h2>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 border border-nyt-border hover:border-nyt-black rounded-sm text-nyt-darkgray hover:text-nyt-black transition-colors"
              title="Print Today's Edition Index"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 text-nyt-gray hover:text-nyt-black rounded-sm transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex border-b border-nyt-border bg-nyt-subtle overflow-x-auto text-xs font-sans">
          {(['A', 'B', 'C', 'D', 'O'] as const).map(sec => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-4 py-2.5 font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                selectedSection === sec
                  ? 'border-b-2 border-nyt-black bg-white text-nyt-black'
                  : 'text-nyt-gray hover:text-nyt-black'
              }`}
            >
              Section {sec}
            </button>
          ))}
        </div>

        {/* Section Headline Banner */}
        <div className="px-6 py-3 bg-stone-100/70 border-b border-stone-200 flex items-center justify-between font-sans text-xs">
          <span className="font-bold text-stone-900">
            {sectionsMeta[selectedSection].title}
          </span>
          <span className="text-stone-500 font-mono">
            {sectionsMeta[selectedSection].pages}
          </span>
        </div>

        {/* Section Articles List */}
        <div className="p-6 overflow-y-auto flex-1 divide-y divide-nyt-border space-y-4 divide-y-reverse">
          {sectionArticles.map(art => (
            <div
              key={art.id}
              onClick={() => {
                onSelectArticle(art);
                onClose();
              }}
              className="pt-4 first:pt-0 cursor-pointer group flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 text-[10px] font-sans font-bold uppercase tracking-wider text-nyt-blue mb-1">
                  <span>{art.page || 'Print Edition'}</span>
                  <span>•</span>
                  <span>{art.section}</span>
                </div>
                <h3 className="font-headline font-bold text-lg text-nyt-black group-hover:underline">
                  {art.headline}
                </h3>
                <p className="font-summary text-xs text-nyt-darkgray line-clamp-2 mt-1">
                  {art.summary}
                </p>
                <div className="flex items-center space-x-2 text-[11px] font-sans text-nyt-gray mt-2">
                  <span>By {art.byline}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-nyt-black group-hover:translate-x-1 transition-all shrink-0 mt-3" />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-nyt-border bg-stone-50 flex items-center justify-between text-xs font-sans text-nyt-gray">
          <span>Complete facsimile of the New York late edition broadsheet.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-nyt-black text-white text-[10px] font-bold uppercase tracking-wider rounded-sm hover:bg-neutral-800"
          >
            Close Index
          </button>
        </div>
      </div>
    </div>
  );
};
