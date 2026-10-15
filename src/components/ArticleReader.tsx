import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Bookmark, BookmarkCheck, Share2, Volume2, 
  VolumeX, Play, Pause, Type, Check, ChevronRight 
} from 'lucide-react';
import { Article, ARTICLES } from '../data/newsData';

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  onBack,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark
}) => {
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
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

  // Audio timer simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 600);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const getFontSizeClasses = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-[16px] leading-[1.7]';
      case 'lg':
        return 'text-[21px] leading-[1.8]';
      case 'md':
      default:
        return 'text-[18px] leading-[1.75]';
    }
  };

  const relatedArticles = ARTICLES.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-nyt-black font-sans pb-24 selection:bg-gray-200">
      {/* Sticky Reader Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-nyt-border px-4 py-2.5">
        <div className="max-w-[1020px] mx-auto flex items-center justify-between text-xs font-sans">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="flex items-center space-x-1.5 text-nyt-black hover:text-nyt-blue font-bold tracking-tight uppercase text-[11px] group transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>The Front Page</span>
            </button>
            <span className="text-gray-300">|</span>
            <span className="hidden md:inline-block font-headline font-semibold text-nyt-darkgray truncate max-w-[400px]">
              {article.headline}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-nyt-gray">
            {/* Font Size Selector */}
            <div className="flex items-center space-x-1 bg-nyt-subtle border border-nyt-border rounded-sm p-0.5">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-1.5 py-0.5 text-[11px] font-serif rounded-sm ${fontSize === 'sm' ? 'bg-white font-bold text-nyt-black shadow-xs' : 'hover:text-nyt-black'}`}
                title="Smaller text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('md')}
                className={`px-1.5 py-0.5 text-xs font-serif rounded-sm ${fontSize === 'md' ? 'bg-white font-bold text-nyt-black shadow-xs' : 'hover:text-nyt-black'}`}
                title="Default text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-1.5 py-0.5 text-sm font-serif rounded-sm ${fontSize === 'lg' ? 'bg-white font-bold text-nyt-black shadow-xs' : 'hover:text-nyt-black'}`}
                title="Larger text"
              >
                A
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-1.5 border border-nyt-border rounded-sm hover:border-nyt-black transition-colors ${
                isBookmarked ? 'text-nyt-blue bg-blue-50/50' : 'text-nyt-gray hover:text-nyt-black'
              }`}
              title={isBookmarked ? 'Article saved' : 'Save article'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-nyt-blue" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-1.5 border border-nyt-border rounded-sm hover:border-nyt-black text-nyt-gray hover:text-nyt-black transition-colors relative"
              title="Share article link"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              {copiedShare && (
                <span className="absolute -bottom-8 right-0 bg-nyt-black text-white text-[10px] px-2 py-1 rounded-sm whitespace-nowrap shadow-md">
                  Link copied
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Reading progress indicator bar */}
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-nyt-black transition-all duration-100 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </nav>

      {/* Article Container */}
      <article className="max-w-[820px] mx-auto px-4 pt-8">
        {/* Kicker / Section Header */}
        <div className="mb-3 flex items-center space-x-2 text-[11px] font-sans font-bold tracking-widest uppercase">
          <span className="text-nyt-blue hover:underline cursor-pointer">{article.section}</span>
          {article.kicker && (
            <>
              <span className="text-gray-300">•</span>
              <span className="text-red-700">{article.kicker}</span>
            </>
          )}
        </div>

        {/* Headline */}
        <h1 className="font-headline font-bold text-[34px] md:text-[46px] lg:text-[50px] leading-[1.08] tracking-tight text-nyt-black mb-4">
          {article.headline}
        </h1>

        {/* Subhead / Deck */}
        {article.subhead && (
          <p className="font-summary text-[18px] md:text-[20px] leading-relaxed text-nyt-darkgray mb-6">
            {article.subhead}
          </p>
        )}

        {/* Bylines & Metadata Strip */}
        <div className="py-3 border-y border-nyt-border mb-6 flex flex-wrap items-center justify-between text-xs font-sans text-nyt-gray gap-3">
          <div className="flex items-center space-x-3">
            {article.authorImage && (
              <img
                src={article.authorImage}
                alt={article.byline}
                className="w-10 h-10 rounded-full object-cover border border-nyt-border"
              />
            )}
            <div>
              <p className="font-bold text-nyt-black">By {article.byline}</p>
              <p className="text-[11px] text-nyt-gray">{article.date} • {article.readTime}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-[11px]">
            <span className="px-2 py-1 bg-nyt-subtle border border-nyt-border rounded-sm uppercase tracking-wider text-nyt-darkgray font-semibold">
              The New York Times Frontpage Dispatch
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {article.imageUrl && (
          <figure className="mb-8" data-purpose="editorial-image-container">
            <img
              src={article.imageUrl}
              alt={article.headline}
              className="w-full h-auto object-cover border border-nyt-border"
            />
            <figcaption className="mt-2 text-[12px] text-nyt-gray leading-normal flex flex-col md:flex-row md:justify-between font-sans gap-1">
              <span>{article.imageCaption || article.headline}</span>
              <span className="text-gray-400 uppercase tracking-tight">{article.imageCredit}</span>
            </figcaption>
          </figure>
        )}

        {/* Simulated NYT Audio Player */}
        <div className="bg-nyt-subtle border border-nyt-border p-4 mb-8 rounded-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-10 h-10 rounded-full bg-nyt-black hover:bg-gray-800 text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label={isPlayingAudio ? 'Pause article narration' : 'Play article narration'}
              >
                {isPlayingAudio ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-nyt-blue block">
                  Listen to this story
                </span>
                <span className="font-sans font-semibold text-xs text-nyt-black">
                  Narrated by New York Times Audio ({article.audioMinutes || 5} min)
                </span>
              </div>
            </div>
            <div className="text-[11px] font-mono text-nyt-gray tabular-nums">
              {isPlayingAudio ? `${Math.floor((audioProgress / 100) * (article.audioMinutes || 5))}:${Math.floor((audioProgress % 60)).toString().padStart(2, '0')}` : `${article.audioMinutes || 5}:00`}
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-nyt-black h-full transition-all duration-300"
              style={{ width: `${audioProgress}%` }}
            />
          </div>
        </div>

        {/* Key Takeaways Box (if present) */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="bg-stone-50 border border-stone-200 p-5 mb-8 rounded-sm">
            <h3 className="font-sans font-bold text-xs uppercase tracking-widest text-stone-800 mb-2.5">
              Key Reporting Takeaways
            </h3>
            <ul className="space-y-2 text-sm text-stone-800">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="font-bold text-stone-900">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Long-form Article Body */}
        <div className={`font-summary text-nyt-black ${getFontSizeClasses()} space-y-6`}>
          {article.content.map((paragraph, index) => {
            const isFirst = index === 0;
            return (
              <React.Fragment key={index}>
                <p className={`${isFirst ? 'nyt-drop-cap' : ''}`}>
                  {paragraph}
                </p>

                {/* Mid-article pull quote */}
                {index === 1 && article.pullQuote && (
                  <blockquote className="my-8 py-5 border-y border-nyt-border font-headline italic font-bold text-2xl md:text-3xl text-nyt-black text-center px-4 leading-tight">
                    “{article.pullQuote}”
                  </blockquote>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Reporter Sign-off */}
        <div className="mt-12 pt-6 border-t border-nyt-border text-xs font-sans text-nyt-gray space-y-2">
          <p>
            <strong className="text-nyt-black">Maggie Haberman</strong> is a senior political correspondent. <strong className="text-nyt-black">Ben Protess</strong> investigates commercial litigation and regulatory compliance.
          </p>
          <p className="italic">
            A version of this article appears in print on Oct. 17, 2024, Section A, Page 1 of the New York edition with the headline: “Trump Has Firm Business Ties With Attorney at Center of Suit.”
          </p>
        </div>

        {/* Bottom Related Stories */}
        <div className="mt-16 pt-8 border-t-2 border-nyt-black">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-nyt-black mb-6">
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
                  <h4 className="font-headline font-bold text-[17px] leading-snug group-hover:underline text-nyt-black mb-2">
                    {rel.headline}
                  </h4>
                  <p className="font-summary text-xs text-nyt-darkgray line-clamp-3 mb-3 leading-relaxed">
                    {rel.summary}
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-[11px] text-nyt-gray font-sans">
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
