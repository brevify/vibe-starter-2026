import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoggedIn: (email: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      onLoggedIn(email);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full border border-nyt-black shadow-2xl overflow-hidden rounded-sm relative">
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
            <h2 className="font-headline font-bold text-2xl text-nyt-black">
              Log in or create an account
            </h2>
            <p className="font-summary text-xs text-nyt-darkgray mt-1">
              Enter your email to sign in or register for your NYT reader profile.
            </p>
          </div>

          {submitted ? (
            <div className="py-6 text-center space-y-2 font-sans">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <p className="font-bold text-sm text-nyt-black">Welcome back, {email}!</p>
              <p className="text-xs text-nyt-gray">Signing you in securely...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block font-bold text-nyt-black uppercase tracking-wider text-[10px] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 border border-nyt-border focus:border-nyt-black focus:outline-none text-sm text-nyt-black rounded-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-nyt-black hover:bg-gray-800 text-white font-bold uppercase tracking-wider text-[11px] py-2.5 rounded-sm transition-colors"
              >
                Continue with Email
              </button>

              <div className="relative py-2 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-nyt-border" />
                </div>
                <span className="relative bg-white px-2 text-[10px] font-bold uppercase tracking-wider text-nyt-gray">
                  or
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEmail('brevity1990@gmail.com');
                  setSubmitted(true);
                  setTimeout(() => {
                    onLoggedIn('brevity1990@gmail.com');
                    onClose();
                  }, 1000);
                }}
                className="w-full border border-nyt-border hover:border-nyt-black text-nyt-black font-semibold text-xs py-2 rounded-sm transition-colors flex items-center justify-center space-x-2"
              >
                <span>Continue as brevity1990@gmail.com</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
