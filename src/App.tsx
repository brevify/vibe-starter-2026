/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FrontPage } from './components/FrontPage';
import { ArticleReader } from './components/ArticleReader';
import { Footer } from './components/Footer';
import { MiniCrosswordModal } from './components/MiniCrosswordModal';
import { CookingRecipeModal } from './components/CookingRecipeModal';
import { WirecutterModal } from './components/WirecutterModal';
import { SearchModal } from './components/SearchModal';
import { SubscribeModal } from './components/SubscribeModal';
import { LoginModal } from './components/LoginModal';
import { MarketWeatherModal } from './components/MarketWeatherModal';
import { SavedModal } from './components/SavedModal';
import { TodaysPaperModal } from './components/TodaysPaperModal';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { Article, ARTICLES } from './data/newsData';

export default function App() {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [activeEdition, setActiveEdition] = useState('U.S.');
  const [activeSection, setActiveSection] = useState('U.S.');
  const [paperTone, setPaperTone] = useState<'white' | 'newsprint' | 'sepia'>('white');
  
  // Modals
  const [isCrosswordOpen, setIsCrosswordOpen] = useState(false);
  const [isCookingOpen, setIsCookingOpen] = useState(false);
  const [isWirecutterOpen, setIsWirecutterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isTodaysPaperOpen, setIsTodaysPaperOpen] = useState(false);
  const [marketModalType, setMarketModalType] = useState<'market' | 'weather' | null>(null);

  // Audio Dispatch state
  const [currentAudioArticle, setCurrentAudioArticle] = useState<Article | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  // User state & Saved articles
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nyt_saved_articles');
      return saved ? JSON.parse(saved) : ['trump-attorney-ties'];
    } catch {
      return ['trump-attorney-ties'];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Audio timer simulation
  useEffect(() => {
    let interval: any = null;
    if (isAudioPlaying && currentAudioArticle) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsAudioPlaying(false);
            return 0;
          }
          return prev + 0.5 * playbackRate;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isAudioPlaying, currentAudioArticle, playbackRate]);

  // Keyboard shortcut Ctrl+K / Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleStartAudio = (article: Article) => {
    setCurrentAudioArticle(article);
    setIsAudioPlaying(true);
    setAudioProgress(0);
    showToast(`Playing audio dispatch: “${article.headline}”`);
  };

  const toggleBookmark = (articleId: string) => {
    setSavedArticleIds(prev => {
      const exists = prev.includes(articleId);
      const updated = exists ? prev.filter(id => id !== articleId) : [...prev, articleId];
      try {
        localStorage.setItem('nyt_saved_articles', JSON.stringify(updated));
      } catch {}
      showToast(exists ? 'Removed from saved articles' : 'Saved to reading list');
      return updated;
    });
  };

  const handleSelectEdition = (edition: string) => {
    setActiveEdition(edition);
    showToast(`Switched to the ${edition} Edition`);
  };

  const handleSelectSection = (section: string) => {
    setActiveSection(section);
    if (activeArticle) {
      setActiveArticle(null);
    }
    showToast(`Navigated to ${section}`);
  };

  const handleTrendingClick = (topic: string) => {
    showToast(`Showing live updates for: ${topic}`);
    if (topic.includes('Middle East')) {
      const art = ARTICLES.find(a => a.id === 'friedman-middle-east');
      if (art) setActiveArticle(art);
    } else if (topic.includes('Supreme Court')) {
      const art = ARTICLES.find(a => a.id === 'legal-strategy-appeals');
      if (art) setActiveArticle(art);
    } else if (topic.includes('Election 2024')) {
      const art = ARTICLES.find(a => a.id === 'women-leaving-trump');
      if (art) setActiveArticle(art);
    }
  };

  const getContainerBg = () => {
    switch (paperTone) {
      case 'newsprint':
        return 'bg-[#FBF9F5] text-[#1a1a1a]';
      case 'sepia':
        return 'bg-[#EFECE6] text-[#222]';
      case 'white':
      default:
        return 'bg-white text-nyt-black';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 selection:bg-gray-200 ${getContainerBg()}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-16 right-6 z-50 bg-[#121212] text-white text-xs px-4 py-2.5 rounded-xs shadow-2xl font-sans animate-fadeIn flex items-center space-x-2 border border-neutral-700">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeEdition={activeEdition}
        onSelectEdition={handleSelectEdition}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenMarket={() => setMarketModalType('market')}
        onOpenWeather={() => setMarketModalType('weather')}
        onOpenCrossword={() => setIsCrosswordOpen(true)}
        onOpenCooking={() => setIsCookingOpen(true)}
        onOpenWirecutter={() => setIsWirecutterOpen(true)}
        onOpenTodaysPaper={() => setIsTodaysPaperOpen(true)}
        onGoHome={() => setActiveArticle(null)}
        currentUser={currentUser}
        savedCount={savedArticleIds.length}
        onOpenSaved={() => setIsSavedOpen(true)}
        paperTone={paperTone}
        onTogglePaperTone={setPaperTone}
        isAudioPlaying={isAudioPlaying}
        onOpenAudioBar={() => {
          if (!currentAudioArticle) {
            handleStartAudio(ARTICLES[0]);
          } else {
            setIsAudioPlaying(!isAudioPlaying);
          }
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {activeArticle ? (
          <ArticleReader
            article={activeArticle}
            onBack={() => setActiveArticle(null)}
            onSelectArticle={setActiveArticle}
            isBookmarked={savedArticleIds.includes(activeArticle.id)}
            onToggleBookmark={toggleBookmark}
            onPlayArticleAudio={handleStartAudio}
          />
        ) : (
          <FrontPage
            onSelectArticle={setActiveArticle}
            onOpenCrossword={() => setIsCrosswordOpen(true)}
            onOpenCooking={() => setIsCookingOpen(true)}
            onOpenWirecutter={() => setIsWirecutterOpen(true)}
            activeEdition={activeEdition}
            activeSection={activeSection}
            onTrendingClick={handleTrendingClick}
          />
        )}
      </div>

      {/* Persistent Audio Dispatch Bar */}
      {currentAudioArticle && (
        <AudioPlayerBar
          article={currentAudioArticle}
          isPlaying={isAudioPlaying}
          onTogglePlay={() => setIsAudioPlaying(!isAudioPlaying)}
          progress={audioProgress}
          onSeek={setAudioProgress}
          playbackRate={playbackRate}
          onChangeRate={setPlaybackRate}
          onClose={() => {
            setIsAudioPlaying(false);
            setCurrentAudioArticle(null);
          }}
        />
      )}

      {/* Footer */}
      <Footer
        onSelectSection={handleSelectSection}
        onOpenCrossword={() => setIsCrosswordOpen(true)}
        onOpenCooking={() => setIsCookingOpen(true)}
        onOpenWirecutter={() => setIsWirecutterOpen(true)}
        onGoHome={() => setActiveArticle(null)}
      />

      {/* Interactive Pro Modals */}
      <MiniCrosswordModal
        isOpen={isCrosswordOpen}
        onClose={() => setIsCrosswordOpen(false)}
      />

      <CookingRecipeModal
        isOpen={isCookingOpen}
        onClose={() => setIsCookingOpen(false)}
      />

      <WirecutterModal
        isOpen={isWirecutterOpen}
        onClose={() => setIsWirecutterOpen(false)}
      />

      <TodaysPaperModal
        isOpen={isTodaysPaperOpen}
        onClose={() => setIsTodaysPaperOpen(false)}
        onSelectArticle={setActiveArticle}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={setActiveArticle}
      />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        onSubscribed={() => {
          showToast('Welcome to NYT All Access!');
          setCurrentUser('subscriber@nytimes.com');
        }}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoggedIn={email => {
          setCurrentUser(email);
          showToast(`Signed in as ${email}`);
        }}
      />

      <MarketWeatherModal
        isOpen={marketModalType !== null}
        type={marketModalType || 'market'}
        onClose={() => setMarketModalType(null)}
      />

      <SavedModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedArticleIds={savedArticleIds}
        onSelectArticle={setActiveArticle}
        onRemoveBookmark={toggleBookmark}
      />
    </div>
  );
}
