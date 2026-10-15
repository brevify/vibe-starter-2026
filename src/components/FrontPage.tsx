import React, { useState } from 'react';
import { Maximize2, X, ChevronRight, Sparkles } from 'lucide-react';
import { Article, ARTICLES } from '../data/newsData';

interface FrontPageProps {
  onSelectArticle: (article: Article) => void;
  onOpenCrossword: () => void;
  onOpenCooking: () => void;
  onOpenWirecutter: () => void;
  activeEdition: string;
  activeSection: string;
  onTrendingClick: (topic: string) => void;
}

export const FrontPage: React.FC<FrontPageProps> = ({
  onSelectArticle,
  onOpenCrossword,
  onOpenCooking,
  onOpenWirecutter,
  activeEdition,
  activeSection,
  onTrendingClick
}) => {
  const [lightboxImage, setLightboxImage] = useState<{ url: string; caption: string; credit?: string } | null>(null);

  // Articles
  const mainArticle = ARTICLES.find(a => a.id === 'trump-attorney-ties') || ARTICLES[0];
  const articleWomen = ARTICLES.find(a => a.id === 'women-leaving-trump') || ARTICLES[1];
  const articleKentucky = ARTICLES.find(a => a.id === 'kentucky-fall') || ARTICLES[2];
  const articleInflation = ARTICLES.find(a => a.id === 'inflation-data') || ARTICLES[3];
  const subStory1 = ARTICLES.find(a => a.id === 'legal-strategy-appeals') || ARTICLES[4];
  const subStory2 = ARTICLES.find(a => a.id === 'fractured-legal-aides') || ARTICLES[5];
  const opinionFriedman = ARTICLES.find(a => a.id === 'friedman-middle-east') || ARTICLES[6];
  const opinionPaul = ARTICLES.find(a => a.id === 'pamela-paul-education') || ARTICLES[7];
  const opinionBoard = ARTICLES.find(a => a.id === 'editorial-board-justice') || ARTICLES[8];

  // Specific section views for World, Business, Arts, The Athletic
  const isDedicatedSection = activeSection !== 'U.S.' && activeSection !== 'Lifestyle';
  const sectionFilteredArticles = ARTICLES.filter(a => 
    a.section.toLowerCase().includes(activeSection.toLowerCase())
  );

  return (
    <main className="max-w-[1280px] mx-auto px-4 pb-16" data-purpose="homepage-feed">
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 p-2"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img 
              src={lightboxImage.url} 
              alt={lightboxImage.caption} 
              className="max-h-[75vh] w-auto object-contain border border-neutral-700 shadow-2xl"
            />
            <div className="w-full mt-3 text-xs text-neutral-300 flex justify-between font-sans">
              <span>{lightboxImage.caption}</span>
              <span className="text-neutral-500 uppercase">{lightboxImage.credit}</span>
            </div>
          </div>
        </div>
      )}

      {/* Top Alert / Micro-banner */}
      <div className="text-center text-[11px] text-nyt-gray border-b border-nyt-border pb-2 mb-4 font-sans flex flex-wrap items-center justify-center gap-2">
        <span className="italic font-serif">Trending stories and live updates:</span>
        <button
          onClick={() => onTrendingClick('Election 2024 Analysis')}
          className="hover:underline font-semibold text-nyt-black cursor-pointer"
        >
          Election 2024 Analysis
        </button>
        <span>•</span>
        <button
          onClick={() => onTrendingClick('Supreme Court Docket')}
          className="hover:underline font-semibold text-nyt-black cursor-pointer"
        >
          Supreme Court Docket
        </button>
        <span>•</span>
        <button
          onClick={() => onTrendingClick('Middle East Conflict')}
          className="hover:underline font-semibold text-nyt-black cursor-pointer"
        >
          Middle East Conflict
        </button>

        {activeEdition !== 'U.S.' && (
          <span className="bg-nyt-subtle text-nyt-blue text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-wider ml-1">
            {activeEdition} Edition
          </span>
        )}
      </div>

      {/* Dedicated Section View if non-US section selected */}
      {isDedicatedSection && sectionFilteredArticles.length > 0 ? (
        <div className="mb-12 animate-fadeIn">
          <div className="border-b-2 border-nyt-black pb-2 mb-6 flex items-baseline justify-between">
            <h2 className="font-headline font-bold text-3xl text-nyt-black uppercase tracking-tight">
              {activeSection}
            </h2>
            <span className="text-xs text-nyt-gray font-sans">
              Showing {sectionFilteredArticles.length} curated dispatches
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectionFilteredArticles.map((art, idx) => (
              <article 
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="cursor-pointer group flex flex-col justify-between border-b md:border-b-0 pb-4 md:pb-0"
              >
                <div>
                  {art.kicker && (
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-red-700 block mb-1">
                      {art.kicker}
                    </span>
                  )}
                  <h3 className="font-headline font-bold text-xl text-nyt-black group-hover:underline mb-2 leading-tight">
                    {art.headline}
                  </h3>
                  <p className="font-summary text-xs text-nyt-darkgray leading-relaxed mb-3">
                    {art.summary}
                  </p>
                </div>
                <div className="text-[11px] font-sans text-nyt-gray flex items-center space-x-1">
                  <span>By {art.byline}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="newspaper-rule-double mt-10 mb-8" />
        </div>
      ) : null}

      {/* Editorial Three-Column Layout mimicking New York Times Frontpage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* COLUMN 1: Secondary Breaking & Political Analysis (Left Rail: 3 Cols) */}
        <section className="lg:col-span-3 lg:pr-5 vertical-rule flex flex-col justify-between" data-purpose="secondary-leads">
          <div className="space-y-5">
            {/* Article 1 */}
            <article className="border-b border-nyt-border pb-4 group">
              <h2 
                onClick={() => onSelectArticle(articleWomen)}
                className="font-headline font-bold text-[20px] md:text-[22px] headline-tight mb-2 hover:text-nyt-gray cursor-pointer transition-colors"
              >
                High-Ranking Women Are Leaving the Trump Administration
              </h2>
              <p className="font-summary text-[13px] leading-relaxed text-nyt-darkgray mb-2">
                An exodus of cabinet-level and senior executive advisers marks a significant turn in internal staffing strategies ahead of the upcoming election cycle.
              </p>
              <div className="flex items-center text-[11px] text-nyt-gray space-x-1">
                <span>3 MIN READ</span>
              </div>
            </article>

            {/* Article 2 */}
            <article className="border-b border-nyt-border pb-4 group">
              <h3 
                onClick={() => onSelectArticle(articleKentucky)}
                className="font-headline font-bold text-[18px] headline-tight mb-1.5 hover:text-nyt-gray cursor-pointer transition-colors"
              >
                The Deep Roots and Sudden Fall of Kentucky
              </h3>
              <p className="font-summary text-[13px] leading-relaxed text-nyt-darkgray mb-2">
                Decades of infrastructure underinvestment collided with shifting local economics, creating an acute crisis across several historic towns.
              </p>
              <span className="text-[11px] text-nyt-gray">4 MIN READ</span>
            </article>

            {/* Article 3 */}
            <article className="pb-4 group">
              <span className="text-[10px] font-bold text-red-700 tracking-wider uppercase mb-1 block">
                Live Analysis
              </span>
              <h3 
                onClick={() => onSelectArticle(articleInflation)}
                className="font-headline font-bold text-[17px] headline-tight mb-1.5 hover:text-nyt-gray cursor-pointer transition-colors"
              >
                Inflation Data Offers Fresh Complications for Global Central Banks
              </h3>
              <p className="font-summary text-[12.5px] leading-relaxed text-nyt-darkgray">
                Consumer prices held stubbornly persistent across key sectors, defying forecasts and rattling bond traders worldwide.
              </p>
            </article>
          </div>

          {/* Left Column Mini-feature Box (Today's Crossword) */}
          <div 
            onClick={onOpenCrossword}
            className="bg-nyt-subtle p-3 rounded-xs border border-nyt-border mt-4 cursor-pointer hover:border-nyt-black hover:bg-stone-100 transition-all group"
            title="Play Today's Mini Crossword"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-nyt-gray group-hover:text-nyt-black flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Today's Crossword</span>
              </span>
              <span className="text-[10px] font-bold text-nyt-blue uppercase tracking-wider">
                Play Mini →
              </span>
            </div>
            <p className="font-summary text-[12px] text-nyt-black font-semibold group-hover:text-nyt-blue transition-colors">
              Ready for Wednesday's puzzle? Solve in minutes or test your streak.
            </p>
          </div>
        </section>

        {/* COLUMN 2: Primary Centerpiece Feature Story (Center: 6 Cols) */}
        <section className="lg:col-span-6 lg:px-6 vertical-rule my-6 lg:my-0" data-purpose="primary-centerpiece">
          <article className="space-y-3">
            {/* Lead Centerpiece Headline */}
            <div className="text-center md:text-left">
              <h2 
                onClick={() => onSelectArticle(mainArticle)}
                className="font-headline font-bold text-[28px] md:text-[34px] lg:text-[36px] headline-tight tracking-tight hover:text-nyt-gray cursor-pointer mb-2 transition-colors"
              >
                Trump Has Firm Business Ties With Attorney at Center of Suit
              </h2>
              <p className="font-summary text-[14.5px] md:text-[15px] leading-relaxed text-nyt-darkgray mb-3">
                Newly disclosed financial documents reveal expansive joint ventures and consulting retainers across multiple real estate holdings, intensifying scrutiny over conflict-of-interest allegations in state court.
              </p>
              <div className="text-[11px] text-nyt-gray flex items-center space-x-2 pb-2">
                <span className="font-sans font-medium text-nyt-black">By Maggie Haberman and Ben Protess</span>
                <span>•</span>
                <span>7 MIN READ</span>
              </div>
            </div>

            {/* Featured Photography with Lightbox Trigger */}
            <figure className="relative my-3 group" data-purpose="editorial-image-container">
              <div className="relative overflow-hidden cursor-pointer">
                <img
                  onClick={() => onSelectArticle(mainArticle)}
                  alt="Attorney appearing at federal court hearing"
                  className="w-full h-auto object-cover border border-nyt-border hover:scale-[1.01] transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxUDqKC4oFS8CltYQTFFhS5VqZvXy0ssakEDgTHm7UPCi3JqG-ozNmSkOGXXSCFnkqbLOGEpphHS6wFrtS-3Iny3XgiojdYynMxP2_luxihywyiRvBYx6lqKwcocxxPyfcalA1-A5HVy1RzTiX6JckD36pkfu382I3KEjOj9yA7BRkJmLetdrzHxF1oyuAvuVfohcdBR4hzy8MaldwalsdTo1oGWQIQo92NHOSAsIEK6JF8c2JpIBm"
                />
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setLightboxImage({
                      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxUDqKC4oFS8CltYQTFFhS5VqZvXy0ssakEDgTHm7UPCi3JqG-ozNmSkOGXXSCFnkqbLOGEpphHS6wFrtS-3Iny3XgiojdYynMxP2_luxihywyiRvBYx6lqKwcocxxPyfcalA1-A5HVy1RzTiX6JckD36pkfu382I3KEjOj9yA7BRkJmLetdrzHxF1oyuAvuVfohcdBR4hzy8MaldwalsdTo1oGWQIQo92NHOSAsIEK6JF8c2JpIBm',
                      caption: 'Alina Habba arriving at Manhattan Supreme Court on Tuesday morning.',
                      credit: 'POOL PHOTO BY JUSTIN LANE'
                    });
                  }}
                  className="absolute bottom-2 right-2 p-1.5 bg-black/70 hover:bg-black text-white rounded-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Expand photo lightbox"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <figcaption className="mt-1.5 text-[11px] text-nyt-gray leading-normal flex justify-between font-sans">
                <span>Alina Habba arriving at Manhattan Supreme Court on Tuesday morning.</span>
                <span className="text-gray-400 uppercase tracking-tighter">Pool photo by Justin Lane</span>
              </figcaption>
            </figure>

            {/* Sub-Stories / Bullet Analysis Below Lead */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-nyt-border">
              <div className="group">
                <h4 
                  onClick={() => onSelectArticle(subStory1)}
                  className="font-headline font-bold text-[16px] headline-tight mb-1 hover:underline cursor-pointer transition-colors"
                >
                  What the Legal Strategy Signals for Upcoming Civil Appeals
                </h4>
                <p className="font-summary text-[12px] text-nyt-darkgray leading-snug">
                  Defense attorneys signaled a broad challenge questioning evidentiary standards and executive timeline jurisdiction.
                </p>
              </div>
              <div className="group">
                <h4 
                  onClick={() => onSelectArticle(subStory2)}
                  className="font-headline font-bold text-[16px] headline-tight mb-1 hover:underline cursor-pointer transition-colors"
                >
                  Inside the Fractured Relationship Between Legal Aides
                </h4>
                <p className="font-summary text-[12px] text-nyt-darkgray leading-snug">
                  Former internal staffers recount clashes over trial presentation style and aggressive media counterprogramming.
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* COLUMN 3: Right Rail - Opinion, Essays, & Essentials (Right Rail: 3 Cols) */}
        <section className="lg:col-span-3 lg:pl-5 flex flex-col justify-between" data-purpose="opinion-and-rail">
          <div className="space-y-4">
            <div className="border-b-2 border-nyt-black pb-1 mb-3">
              <h3 className="font-sans text-[12px] font-bold uppercase tracking-wider text-nyt-black">
                Opinion
              </h3>
            </div>

            {/* Opinion Piece 1: Thomas L. Friedman */}
            <article className="border-b border-nyt-border pb-3 flex items-start space-x-3 group">
              <div className="flex-1">
                <span className="font-sans text-[11px] font-bold text-nyt-black uppercase tracking-tight block">
                  Thomas L. Friedman
                </span>
                <h4 
                  onClick={() => onSelectArticle(opinionFriedman)}
                  className="font-headline font-bold text-[15px] headline-tight mt-0.5 hover:underline cursor-pointer transition-colors"
                >
                  A Dangerous Illusion in the Middle East
                </h4>
                <p className="font-summary text-[12px] text-nyt-gray leading-snug mt-1">
                  Why current diplomatic frameworks misread the tectonic shifts taking place on the ground.
                </p>
              </div>
              <img
                onClick={() => onSelectArticle(opinionFriedman)}
                alt="Thomas L. Friedman"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1 border border-nyt-border cursor-pointer hover:opacity-90 transition-opacity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgfA8OYm57z8GyHbLgZSSlPAkIMGpFHDnYE2iDzICClzjlE1ZnC4V0-apdLK4FvrSVOIMrN6X1CJ1PKkYjRH82WleFiEmqzOG-PE9A1kh6bidpLQSQN-ZwY6w08GLuQvC8Jp5mLIMAKoLhZuEJAFPg8zE1zWm7ToxaCzApeCLI_Nb4i0g0jpKae7kWjFKcrxWESOiX8qowR_BlEvZPd5qyxO_NtLl0cqv9vQZNWCtoUwMPBQTX7tcC"
              />
            </article>

            {/* Opinion Piece 2: Pamela Paul */}
            <article className="border-b border-nyt-border pb-3 flex items-start space-x-3 group">
              <div className="flex-1">
                <span className="font-sans text-[11px] font-bold text-nyt-black uppercase tracking-tight block">
                  Pamela Paul
                </span>
                <h4 
                  onClick={() => onSelectArticle(opinionPaul)}
                  className="font-headline font-bold text-[15px] headline-tight mt-0.5 hover:underline cursor-pointer transition-colors"
                >
                  The Quiet Crisis in Public Education
                </h4>
                <p className="font-summary text-[12px] text-nyt-gray leading-snug mt-1">
                  Classroom discipline and reading fluency are facing headwinds we cannot afford to ignore.
                </p>
              </div>
              <img
                onClick={() => onSelectArticle(opinionPaul)}
                alt="Pamela Paul"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1 border border-nyt-border cursor-pointer hover:opacity-90 transition-opacity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCY9KyPq9loaKi0aizr28KpcAiuPTNQUs-obc6d7NCJ2OvYAa1qMTfFUsPDzQB5AyNIPbOIM9zvTo72jmHAfK5xuOA2k-i24EUpGvtXyjh-wKyRoHP7Wb1o9rYrM0bR5JPvBIuQzRCkTiMX07luzuax7axClejZGckUmc0ngvr1uw_ZRzVVkNix5dvmLbS1XM32av84rD4PvYFwBDOg7lnBqgSPSvXVH73N8bzI9qiqRIuUL6jodxGA"
              />
            </article>

            {/* Opinion Piece 3: The Editorial Board */}
            <article className="border-b border-nyt-border pb-3 group">
              <span className="font-sans text-[11px] font-bold text-nyt-black uppercase tracking-tight block">
                The Editorial Board
              </span>
              <h4 
                onClick={() => onSelectArticle(opinionBoard)}
                className="font-headline font-bold text-[15px] headline-tight mt-0.5 hover:underline cursor-pointer transition-colors"
              >
                Protecting the Neutrality of the Justice System
              </h4>
              <p className="font-summary text-[12px] text-nyt-gray leading-snug mt-1">
                The public trust requires steadfast adherence to nonpartisan judicial standards.
              </p>
            </article>

            {/* Compact Wirecutter / Cooking Promos */}
            <div className="pt-2 space-y-3" data-purpose="commercial-features">
              <div 
                onClick={onOpenWirecutter}
                className="border-t border-nyt-border pt-3 cursor-pointer group"
              >
                <span className="font-sans text-[10px] font-bold text-emerald-800 tracking-wider uppercase block">
                  Wirecutter Pick
                </span>
                <h5 className="font-headline font-bold text-[14px] leading-tight group-hover:underline cursor-pointer mt-0.5">
                  The Best Noise-Canceling Headphones for Commuters and Travelers
                </h5>
              </div>

              <div 
                onClick={onOpenCooking}
                className="border-t border-nyt-border pt-3 cursor-pointer group"
              >
                <span className="font-sans text-[10px] font-bold text-amber-800 tracking-wider uppercase block">
                  NYT Cooking
                </span>
                <h5 className="font-headline font-bold text-[14px] leading-tight group-hover:underline cursor-pointer mt-0.5">
                  Crispy Sheet-Pan Gnocchi With Ricotta and Burst Tomatoes
                </h5>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
