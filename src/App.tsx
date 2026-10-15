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
import { Article, ARTICLES } from './data/newsData';

export default function App() {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [activeEdition, setActiveEdition] = useState('U.S.');
  const [activeSection, setActiveSection] = useState('U.S.');
  
  // Modals
  const [isCrosswordOpen, setIsCrosswordOpen] = useState(false);
  const [isCookingOpen, setIsCookingOpen] = useState(false);
  const [isWirecutterOpen, setIsWirecutterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [marketModalType, setMarketModalType] = useState<'market' | 'weather' | null>(null);

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

  const toggleBookmark = (articleId: string) => {
    setSavedArticleIds(prev => {
      const exists = prev.includes(articleId);
      const updated = exists ? prev.filter(id => id !== articleId) : [...prev, articleId];
      try {
        localStorage.setItem('nyt_saved_articles', JSON.stringify(updated));
      } catch {}
      showToast(exists ? 'Removed from saved articles' : 'Saved to your reading list');
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
    if (section === 'Opinion') {
      const opinionStory = ARTICLES.find(a => a.isOpinion);
      if (opinionStory) {
        showToast('Viewing Opinion section');
      }
    } else {
      showToast(`Viewing ${section} news`);
    }
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

  return (
    <div className="min-h-screen bg-white text-nyt-black flex flex-col font-sans selection:bg-gray-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-nyt-black text-white text-xs px-4 py-2.5 rounded-sm shadow-2xl font-sans animate-fade-in flex items-center space-x-2 border border-gray-700">
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
        onGoHome={() => setActiveArticle(null)}
        currentUser={currentUser}
        savedCount={savedArticleIds.length}
        onOpenSaved={() => setIsSavedOpen(true)}
      />

      {/* Main Body: Either Reader or Front Page */}
      <div className="flex-1">
        {activeArticle ? (
          <ArticleReader
            article={activeArticle}
            onBack={() => setActiveArticle(null)}
            onSelectArticle={setActiveArticle}
            isBookmarked={savedArticleIds.includes(activeArticle.id)}
            onToggleBookmark={toggleBookmark}
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

      {/* Footer */}
      <Footer
        onSelectSection={handleSelectSection}
        onOpenCrossword={() => setIsCrosswordOpen(true)}
        onOpenCooking={() => setIsCookingOpen(true)}
        onOpenWirecutter={() => setIsWirecutterOpen(true)}
        onGoHome={() => setActiveArticle(null)}
      />

      {/* Interactive Modals */}
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

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={setActiveArticle}
      />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        onSubscribed={() => {
          showToast('Thank you for subscribing to The New York Times!');
          setCurrentUser('subscriber@nytimes.com');
        }}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoggedIn={email => {
          setCurrentUser(email);
          showToast(`Logged in as ${email}`);
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
