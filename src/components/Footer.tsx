import React from 'react';

interface FooterProps {
  onSelectSection: (section: string) => void;
  onOpenCrossword: () => void;
  onOpenCooking: () => void;
  onOpenWirecutter: () => void;
  onGoHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectSection,
  onOpenCrossword,
  onOpenCooking,
  onOpenWirecutter,
  onGoHome
}) => {
  return (
    <footer className="max-w-[1280px] mx-auto px-4 border-t-2 border-nyt-black pt-6 pb-12 font-sans select-none" data-purpose="site-footer">
      <div className="flex items-center mb-6">
        <h2
          onClick={onGoHome}
          className="masthead-title text-2xl text-nyt-black select-none cursor-pointer hover:opacity-80 transition-opacity"
        >
          The New York Times
        </h2>
      </div>

      {/* Navigation Columns */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-[12px] text-nyt-darkgray pb-6 border-b border-nyt-border">
        <div>
          <h3 className="font-bold text-nyt-black uppercase text-[11px] mb-2 tracking-wider">News</h3>
          <ul className="space-y-1.5">
            <li><button onClick={onGoHome} className="hover:underline text-left">Home Page</button></li>
            <li><button onClick={() => onSelectSection('U.S.')} className="hover:underline text-left">U.S.</button></li>
            <li><button onClick={() => onSelectSection('World')} className="hover:underline text-left">World</button></li>
            <li><button onClick={() => onSelectSection('U.S. Politics')} className="hover:underline text-left">Politics</button></li>
            <li><button onClick={() => onSelectSection('Business')} className="hover:underline text-left">Business</button></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-nyt-black uppercase text-[11px] mb-2 tracking-wider">Opinion</h3>
          <ul className="space-y-1.5">
            <li><button onClick={() => onSelectSection('Opinion')} className="hover:underline text-left">Today's Opinion</button></li>
            <li><button onClick={() => onSelectSection('Opinion')} className="hover:underline text-left">Columnists</button></li>
            <li><button onClick={() => onSelectSection('Opinion')} className="hover:underline text-left">Editorials</button></li>
            <li><button onClick={() => onSelectSection('Opinion')} className="hover:underline text-left">Guest Essays</button></li>
            <li><button onClick={() => onSelectSection('Opinion')} className="hover:underline text-left">Letters</button></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-nyt-black uppercase text-[11px] mb-2 tracking-wider">Arts</h3>
          <ul className="space-y-1.5">
            <li><button onClick={() => onSelectSection('Arts')} className="hover:underline text-left">Books</button></li>
            <li><button onClick={() => onSelectSection('Arts')} className="hover:underline text-left">Best Seller Lists</button></li>
            <li><button onClick={() => onSelectSection('Arts')} className="hover:underline text-left">Movies</button></li>
            <li><button onClick={() => onSelectSection('Arts')} className="hover:underline text-left">Television</button></li>
            <li><button onClick={() => onSelectSection('Arts')} className="hover:underline text-left">Music</button></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-nyt-black uppercase text-[11px] mb-2 tracking-wider">Living</h3>
          <ul className="space-y-1.5">
            <li><button onClick={() => onSelectSection('Lifestyle')} className="hover:underline text-left">Automotive</button></li>
            <li><button onClick={onOpenCrossword} className="hover:underline text-left font-semibold text-nyt-black">Games & Crossword</button></li>
            <li><button onClick={() => onSelectSection('U.S.')} className="hover:underline text-left">Education</button></li>
            <li><button onClick={onOpenCooking} className="hover:underline text-left font-semibold text-nyt-black">Food & Cooking</button></li>
            <li><button onClick={() => onSelectSection('Lifestyle')} className="hover:underline text-left">Health</button></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-nyt-black uppercase text-[11px] mb-2 tracking-wider">More</h3>
          <ul className="space-y-1.5">
            <li><button onClick={onGoHome} className="hover:underline text-left">Reader Center</button></li>
            <li><button onClick={onOpenWirecutter} className="hover:underline text-left font-semibold text-nyt-black">Wirecutter</button></li>
            <li><button onClick={() => onSelectSection('The Athletic')} className="hover:underline text-left">The Athletic</button></li>
            <li><button onClick={onGoHome} className="hover:underline text-left">Jobs</button></li>
            <li><button onClick={onGoHome} className="hover:underline text-left">Video</button></li>
          </ul>
        </div>
      </div>

      {/* Copyright & Legal */}
      <div className="pt-4 flex flex-col md:flex-row items-center justify-between text-[11px] text-nyt-gray">
        <p>© 2024 The New York Times Company</p>
        <div className="flex flex-wrap items-center space-x-3 mt-2 md:mt-0">
          <span className="hover:underline cursor-pointer">NYTCo</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Contact Us</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Accessibility</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Work with us</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Advertise</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};
