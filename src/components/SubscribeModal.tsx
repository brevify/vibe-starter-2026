import React, { useState } from 'react';
import { X, Check, ShieldCheck, Zap } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribed: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose, onSubscribed }) => {
  const [selectedPlan, setSelectedPlan] = useState<'intro' | 'annual'>('intro');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        onSubscribed();
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full border border-nyt-black shadow-2xl overflow-hidden rounded-sm relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-nyt-gray hover:text-nyt-black transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <h3 className="masthead-title text-3xl text-nyt-black mb-2 select-none">
              The New York Times
            </h3>
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-nyt-blue block mb-1">
              Limited Time Introductory Offer
            </span>
            <h2 className="font-headline font-bold text-3xl text-nyt-black">
              Understand the world.
            </h2>
            <p className="font-summary text-sm text-nyt-darkgray mt-1">
              Independent journalism that uncovers the truth, holds power to account, and brings clarity.
            </p>
          </div>

          {success ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="font-headline font-bold text-xl text-nyt-black">
                Welcome to All Access
              </h4>
              <p className="text-xs text-nyt-darkgray font-sans">
                Your subscription has been activated. Enjoy unlimited reading, Games, Cooking, and Wirecutter.
              </p>
            </div>
          ) : (
            <div className="space-y-4 font-sans">
              {/* Plan 1 */}
              <div
                onClick={() => setSelectedPlan('intro')}
                className={`p-4 border cursor-pointer rounded-sm transition-all flex items-start justify-between ${
                  selectedPlan === 'intro'
                    ? 'border-nyt-black bg-blue-50/40 ring-1 ring-nyt-black'
                    : 'border-nyt-border hover:border-gray-400'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-nyt-black">All Access Digital</span>
                    <span className="bg-nyt-blue text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-xs">
                      Best Value
                    </span>
                  </div>
                  <p className="text-xs text-nyt-gray mt-1">
                    News, Games, Cooking, Wirecutter, and The Athletic.
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg text-nyt-black">$1</span>
                  <span className="text-xs text-nyt-gray block">/week</span>
                </div>
              </div>

              {/* Plan 2 */}
              <div
                onClick={() => setSelectedPlan('annual')}
                className={`p-4 border cursor-pointer rounded-sm transition-all flex items-start justify-between ${
                  selectedPlan === 'annual'
                    ? 'border-nyt-black bg-blue-50/40 ring-1 ring-nyt-black'
                    : 'border-nyt-border hover:border-gray-400'
                }`}
              >
                <div>
                  <span className="font-bold text-sm text-nyt-black">Annual Plan</span>
                  <p className="text-xs text-nyt-gray mt-1">
                    Pay once and save 25% for full year access.
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg text-nyt-black">$40</span>
                  <span className="text-xs text-nyt-gray block">/year</span>
                </div>
              </div>

              {/* Features list */}
              <ul className="text-xs text-nyt-darkgray space-y-1.5 py-2">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Unlimited articles on web and mobile apps</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>The Daily Mini Crossword, Wordle, and Spelling Bee</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Cancel anytime online with a single click</span>
                </li>
              </ul>

              <button
                onClick={handleSubscribe}
                disabled={isProcessing}
                className="w-full bg-nyt-black hover:bg-gray-800 text-white font-bold uppercase tracking-wider text-xs py-3 rounded-sm transition-colors flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <span>Activating Subscription...</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Get All Access for $1 / Week</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-1 text-[11px] text-nyt-gray text-center pt-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Renews automatically. Cancel easily online anytime.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
