import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Bookmark, BookmarkCheck, Share2, Volume2, 
  Printer, Type, Check, ChevronRight, Moon, Sun, Sparkles 
} from 'lucide-react';
import { Article, ARTICLES } from '../data/newsData';

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  onPlayArticleAudio: (article: Article) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  onBack,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  onPlayArticleAudio
}) => {
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [readingTheme, setReadingTheme] = useState<'light' | 'newsprint' | 'night'>('light');
  const [copiedShare, setCopiedShare] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll depth tracker
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.id]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const getFontSizeClasses = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-[16px] leading-[1.75]';
      case 'lg':
        return 'text-[21px] leading-[1.85]';
      case 'md':
      default:
        return 'text-[18px] leading-[1.8]';
    }
  };

  const getThemeBg = () => {
    switch (readingTheme) {
      case 'newsprint':
        return 'bg-[#FBF9F5] text-[#1a1a1a]';
      case 'night':
        return 'bg-[#121212] text-[#e0e0e0]';
      case 'light':
      default:
        return 'bg-white text-[#121212]';
    }
  };

  const relatedArticles = ARTICLES.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans pb-24 ${getThemeBg()}`}>
      {/* Sticky Reader Navigation Bar */}
      <nav className={`sticky top-0 z-40 border-b px-4 py-2.5 backdrop-blur-md transition-colors ${
        readingTheme === 'night' ? 'bg-[#181818]/95 border-neutral-800 text-neutral-300' : 'bg-white/95 border-nyt-border text-nyt-black'
      }`}>
        <div className="max-w-[1020px] mx-auto flex items-center justify-between text-xs font-sans">
          <div className="flex items-center space-x-3 min-w-0">
            <button
              onClick={onBack}
              className="flex items-center space-x-1.5 font-bold tracking-tight uppercase text-[11px] group transition-colors hover:text-nyt-blue shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Front Page</span>
            </button>
            <span className="text-gray-400">|</span>
            <span className="hidden md:inline-block font-headline font-semibold truncate max-w-[380px]">
              {article.headline}
            </span>
          </div>

          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Listen Button */}
            <button
              onClick={() => onPlayArticleAudio(article)}
              className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 rounded-xs text-[11px] font-semibold transition-colors"
              title="Listen to this article"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Listen ({article.audioMinutes || 5} min)</span>
            </button>

            {/* Reading Theme Toggle */}
            <div className="flex items-center space-x-1 border border-neutral-300 dark:border-neutral-700 rounded-xs p-0.5">
              <button
                onClick={() => setReadingTheme('light')}
                className={`p-1 rounded-xs ${readingTheme === 'light' ? 'bg-neutral-200 text-black' : 'text-neutral-500'}`}
                title="Light mode"
              >
                <Sun className="w-3 h-3" />
              </button>
              <button
                onClick={() => setReadingTheme('newsprint')}
                className={`p-1 rounded-xs ${readingTheme === 'newsprint' ? 'bg-amber-100 text-amber-900 font-serif font-bold text-[10px]' : 'text-neutral-500 font-serif text-[10px]'}`}
                title="Newsprint Warm"
              >
                NP
              </button>
              <button
                onClick={() => setReadingTheme('night')}
                className={`p-1 rounded-xs ${readingTheme === 'night' ? 'bg-neutral-800 text-white' : 'text-neutral-500'}`}
                title="Night mode"
              >
                <Moon className="w-3 h-3" />
              </button>
            </div>

            {/* Font Size Selector */}
            <div className="flex items-center space-x-0.5 border border-neutral-300 dark:border-neutral-700 rounded-xs p-0.5">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-1.5 py-0.5 text-[11px] font-serif rounded-xs ${fontSize === 'sm' ? 'bg-neutral-200 dark:bg-neutral-800 font-bold' : ''}`}
                title="Smaller text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('md')}
                className={`px-1.5 py-0.5 text-xs font-serif rounded-xs ${fontSize === 'md' ? 'bg-neutral-200 dark:bg-neutral-800 font-bold' : ''}`}
                title="Default text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-1.5 py-0.5 text-sm font-serif rounded-xs ${fontSize === 'lg' ? 'bg-neutral-200 dark:bg-neutral-800 font-bold' : ''}`}
                title="Larger text"
              >
                A
              </button>
            </div>

            {/* Print button */}
            <button
              onClick={() => window.print()}
              className="p-1.5 border border-neutral-300 dark:border-neutral-700 rounded-xs hover:border-black transition-colors"
              title="Print article"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-1.5 border rounded-xs transition-colors ${
                isBookmarked 
                  ? 'text-nyt-blue bg-blue-50/70 border-nyt-blue' 
                  : 'border-neutral-300 dark:border-neutral-700 hover:border-black'
              }`}
              title={isBookmarked ? 'Article saved' : 'Save article'}
            >
              {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5 text-nyt-blue" /> : <Bookmark className="w-3.5 h-3.5" />}
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-1.5 border border-neutral-300 dark:border-neutral-700 rounded-xs hover:border-black transition-colors relative"
              title="Share article link"
            >
              {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              {copiedShare && (
                <span className="absolute -bottom-8 right-0 bg-black text-white text-[10px] px-2 py-1 rounded-xs whitespace-nowrap shadow-md">
                  Link copied
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Reading progress indicator bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-nyt-black dark:bg-neutral-200 transition-all duration-100 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </nav>

      {/* Article Container */}
      <article className="max-w-[780px] mx-auto px-4 pt-10">
        {/* Kicker / Section Header */}
        <div className="mb-3 flex items-center space-x-2 text-[11px] font-sans font-bold tracking-widest uppercase">
          <span className="text-nyt-blue hover:underline cursor-pointer">{article.section}</span>
          {article.kicker && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-red-700 font-bold">{article.kicker}</span>
            </>
          )}
          {article.page && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{article.page}</span>
            </>
          )}
        </div>

        {/* Headline */}
        <h1 className="font-headline font-bold text-[34px] md:text-[46px] lg:text-[48px] leading-[1.1] tracking-tight mb-4">
          {article.headline}
        </h1>

        {/* Subhead / Deck */}
        {article.subhead && (
          <p className="font-summary text-[18px] md:text-[20px] leading-relaxed opacity-90 mb-6">
            {article.subhead}
          </p>
        )}

        {/* Bylines & Metadata Strip */}
        <div className={`py-3 border-y mb-8 flex flex-wrap items-center justify-between text-xs font-sans gap-3 ${
          readingTheme === 'night' ? 'border-neutral-800 text-neutral-400' : 'border-nyt-border text-nyt-gray'
        }`}>
          <div className="flex items-center space-x-3">
            {article.authorImage && (
              <img
                src={article.authorImage}
                alt={article.byline}
                className="w-10 h-10 rounded-full object-cover border border-neutral-300"
              />
            )}
            <div>
              <p className="font-bold text-current">By {article.byline}</p>
              <p className="text-[11px] opacity-80">{article.date} • {article.readTime}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-[11px]">
            <span className="px-2 py-1 bg-black/5 dark:bg-white/10 rounded-xs uppercase tracking-wider font-semibold">
              The New York Times Newsroom
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {article.imageUrl && (
          <figure className="mb-8" data-purpose="editorial-image-container">
            <img
              src={article.imageUrl}
              alt={article.headline}
              className="w-full h-auto object-cover border border-neutral-200 dark:border-neutral-800"
            />
            <figcaption className="mt-2 text-[12px] opacity-75 leading-normal flex flex-col md:flex-row md:justify-between font-sans gap-1">
              <span>{article.imageCaption || article.headline}</span>
              <span className="uppercase tracking-tight opacity-75">{article.imageCredit}</span>
            </figcaption>
          </figure>
        )}

        {/* Key Takeaways Box (if present) */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className={`p-5 mb-8 rounded-xs border ${
            readingTheme === 'night' ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-stone-50 border-stone-200 text-stone-800'
          }`}>
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest mb-2.5 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Key Reporting Takeaways</span>
            </h3>
            <ul className="space-y-2 text-sm">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="font-bold">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Long-form Article Body */}
        <div className={`font-summary ${getFontSizeClasses()} space-y-6`}>
          {article.content.map((paragraph, index) => {
            const isFirst = index === 0;
            return (
              <React.Fragment key={index}>
                <p className={`${isFirst ? 'nyt-drop-cap' : ''}`}>
                  {paragraph}
                </p>

                {/* Mid-article pull quote */}
                {index === 1 && article.pullQuote && (
                  <blockquote className="my-8 py-5 border-y border-neutral-300 dark:border-neutral-800 font-headline italic font-bold text-2xl md:text-3xl text-center px-4 leading-tight">
                    “{article.pullQuote}”
                  </blockquote>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Reporter Sign-off */}
        <div className="mt-12 pt-6 border-t border-neutral-300 dark:border-neutral-800 text-xs font-sans opacity-75 space-y-2">
          <p>
            <strong className="text-current">Maggie Haberman</strong> is a senior political correspondent. <strong className="text-current">Ben Protess</strong> investigates commercial litigation and regulatory compliance.
          </p>
          <p className="italic">
            A version of this article appears in print on Oct. 17, 2024, Section A, Page 1 of the New York edition with the headline: “Trump Has Firm Business Ties With Attorney at Center of Suit.”
          </p>
        </div>

        {/* Bottom Related Stories */}
        <div className="mt-16 pt-8 border-t-2 border-current">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-6">
            More From The Front Page
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map(rel => (
              <div 
                key={rel.id}
                onClick={() => onSelectArticle(rel)}
                className="cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-nyt-blue uppercase tracking-wider block mb-1">
                    {rel.section}
                  </span>
                  <h4 className="font-headline font-bold text-[17px] leading-snug group-hover:underline mb-2">
                    {rel.headline}
                  </h4>
                  <p className="font-summary text-xs opacity-75 line-clamp-3 mb-3 leading-relaxed">
                    {rel.summary}
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-[11px] opacity-60 font-sans">
                  <span>{rel.readTime}</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};
