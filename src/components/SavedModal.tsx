import React from 'react';
import { X, BookmarkCheck, ArrowRight, Trash2 } from 'lucide-react';
import { Article, ARTICLES } from '../data/newsData';

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticleIds: string[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
}

export const SavedModal: React.FC<SavedModalProps> = ({
  isOpen,
  onClose,
  savedArticleIds,
  onSelectArticle,
  onRemoveBookmark
}) => {
  if (!isOpen) return null;

  const savedArticles = ARTICLES.filter(a => savedArticleIds.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16">
      <div className="bg-white max-w-2xl w-full border border-nyt-black shadow-2xl overflow-hidden rounded-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-nyt-border bg-nyt-subtle">
          <div className="flex items-center space-x-2">
            <BookmarkCheck className="w-5 h-5 text-nyt-blue" />
            <h3 className="font-headline font-bold text-xl text-nyt-black">
              Your Saved Articles ({savedArticles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 text-nyt-gray hover:text-nyt-black transition-colors rounded-sm"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto divide-y divide-nyt-border">
          {savedArticles.length === 0 ? (
            <div className="text-center py-12 text-sm text-nyt-gray font-sans">
              <BookmarkCheck className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="font-semibold text-nyt-black mb-1">No saved stories yet</p>
              <p className="text-xs">
                Click the bookmark icon while reading any article on the front page to save it for offline or later reading.
              </p>
            </div>
          ) : (
            savedArticles.map(art => (
              <div key={art.id} className="py-4 flex items-start justify-between gap-4 group">
                <div 
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="cursor-pointer flex-1"
                >
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-nyt-blue block mb-1">
                    {art.section}
                  </span>
                  <h4 className="font-headline font-bold text-lg text-nyt-black group-hover:underline">
                    {art.headline}
                  </h4>
                  <p className="font-summary text-xs text-nyt-darkgray line-clamp-2 mt-1">
                    {art.summary}
                  </p>
                  <span className="text-[11px] font-sans text-nyt-gray mt-1 block">
                    {art.byline} • {art.readTime}
                  </span>
                </div>
                <button
                  onClick={() => onRemoveBookmark(art.id)}
                  className="p-1.5 text-gray-400 hover:text-red-700 transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-nyt-subtle border-t border-nyt-border flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-nyt-black text-white text-[10px] font-bold uppercase tracking-wider rounded-sm hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
