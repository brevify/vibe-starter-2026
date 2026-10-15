import React, { useState } from 'react';
import { X, Award, Check, ExternalLink, ThumbsUp, ShieldCheck } from 'lucide-react';

interface WirecutterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WirecutterModal: React.FC<WirecutterModalProps> = ({ isOpen, onClose }) => {
  const [selectedTab, setSelectedTab] = useState<'top' | 'runner' | 'budget'>('top');

  if (!isOpen) return null;

  const picks = {
    top: {
      tag: 'Our Pick',
      name: 'Sony WH-1000XM5',
      price: '$398',
      desc: 'The best all-around noise-canceling headphones for most people. Extraordinary acoustic isolation, superior phone call microphone filters, and lightweight ergonomic construction.',
      pros: [
        'Unmatched active noise canceling across both low rumble and speech',
        'Industry-leading 30-hour battery life with ANC enabled',
        'Crystal-clear 8-microphone voice pickup for calls in noisy cafes',
        'Intuitive touch ear cup controls and wear detection'
      ],
      cons: ['Ear cups fold flat but the headband does not collapse inward']
    },
    runner: {
      tag: 'Runner-Up',
      name: 'Bose QuietComfort Ultra',
      price: '$429',
      desc: 'Supreme plush comfort and world-class passive seal, making them ideal for long-haul transatlantic travelers and people wearing eyeglasses.',
      pros: [
        'Plush memory foam cushions prevent temple pinching',
        'Folds up compactly into a pocketable hard shell case',
        'Immersive spatial audio mode with head tracking'
      ],
      cons: ['Battery life capped at 24 hours (less than Sony)']
    },
    budget: {
      tag: 'Budget Pick',
      name: 'Anker Soundcore Space One',
      price: '$99',
      desc: 'Shockingly capable noise attenuation and crisp sound quality at a fraction of the cost of flagship alternatives.',
      pros: [
        'Exceptional value under $100',
        'Impressive 40 hours battery life with ANC on (55 with ANC off)',
        'Comfortable padding with swivel hinges'
      ],
      cons: ['Microphone is prone to wind noise during outdoor calls']
    }
  };

  const currentPick = picks[selectedTab];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white max-w-3xl w-full border border-nyt-black shadow-2xl relative my-8 overflow-hidden rounded-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-nyt-border px-6 py-4 bg-emerald-50/50">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-emerald-800" />
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-emerald-900">
              Wirecutter • A New York Times Company
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 text-nyt-gray hover:text-nyt-black rounded-sm"
            aria-label="Close review"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center space-x-2 text-[11px] font-sans font-bold uppercase tracking-wider text-emerald-800 mb-1">
            <span>Audio & Electronics</span>
            <span>•</span>
            <span>Independent Lab Tested</span>
          </div>

          <h2 className="font-headline font-bold text-2xl md:text-3xl text-nyt-black mb-2">
            The Best Noise-Canceling Headphones for Commuters and Travelers
          </h2>
          <p className="font-summary text-sm text-nyt-darkgray mb-6 leading-relaxed">
            By Lauren Dragan • Published Oct. 16, 2024 • 120+ Hours of Acoustic Testing
          </p>

          {/* Testing methodology badge */}
          <div className="bg-stone-50 border border-stone-200 p-3.5 mb-6 rounded-sm flex items-start space-x-3 text-xs text-stone-800 font-sans">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900 block mb-0.5">How We Tested:</strong>
              We tested 28 headphones across subway cars, busy train stations, and flights, pairing objective audio spectrum analyzer readings with subjective blind sound tests from 5 panelists.
            </div>
          </div>

          {/* Model Selector Tabs */}
          <div className="flex items-center space-x-2 border-b border-nyt-border pb-3 mb-6">
            <button
              onClick={() => setSelectedTab('top')}
              className={`px-3 py-1.5 text-xs font-sans font-semibold rounded-sm transition-colors ${
                selectedTab === 'top'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-nyt-subtle text-nyt-darkgray hover:bg-gray-200'
              }`}
            >
              Top Pick (Sony XM5)
            </button>
            <button
              onClick={() => setSelectedTab('runner')}
              className={`px-3 py-1.5 text-xs font-sans font-semibold rounded-sm transition-colors ${
                selectedTab === 'runner'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-nyt-subtle text-nyt-darkgray hover:bg-gray-200'
              }`}
            >
              Runner-Up (Bose Ultra)
            </button>
            <button
              onClick={() => setSelectedTab('budget')}
              className={`px-3 py-1.5 text-xs font-sans font-semibold rounded-sm transition-colors ${
                selectedTab === 'budget'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-nyt-subtle text-nyt-darkgray hover:bg-gray-200'
              }`}
            >
              Budget Pick (Anker)
            </button>
          </div>

          {/* Selected Model Details */}
          <div className="border border-nyt-border p-6 rounded-sm bg-stone-50/50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                  {currentPick.tag}
                </span>
                <h3 className="font-headline font-bold text-2xl text-nyt-black">
                  {currentPick.name}
                </h3>
              </div>
              <span className="text-xl font-bold font-sans text-nyt-black tabular-nums">
                {currentPick.price}
              </span>
            </div>

            <p className="font-summary text-sm text-nyt-darkgray mb-5 leading-relaxed">
              {currentPick.desc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <h4 className="font-bold text-emerald-900 uppercase tracking-wider text-[11px] mb-2 flex items-center space-x-1">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Why it's great</span>
                </h4>
                <ul className="space-y-1.5">
                  {currentPick.pros.map((p, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-stone-800">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-stone-700 uppercase tracking-wider text-[11px] mb-2">
                  Flaws but not dealbreakers
                </h4>
                <ul className="space-y-1.5">
                  {currentPick.cons.map((c, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-stone-600">
                      <span className="text-amber-800 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-nyt-border bg-nyt-subtle flex items-center justify-between text-xs font-sans">
          <span className="text-nyt-gray">When you buy through our links, we may earn an affiliate commission.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-nyt-black text-white font-bold uppercase tracking-wider text-[10px] rounded-sm hover:bg-gray-800"
          >
            Back to Articles
          </button>
        </div>
      </div>
    </div>
  );
};
