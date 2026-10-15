import React, { useState } from 'react';
import { X, Clock, Users, Star, Bookmark, Check, UtensilsCrossed } from 'lucide-react';

interface CookingRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookingRecipeModal: React.FC<CookingRecipeModalProps> = ({ isOpen, onClose }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [servings, setServings] = useState(4);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const ingredients = [
    '2 packages (16 to 18 ounces each) shelf-stable potato gnocchi',
    '2 pints cherry tomatoes or grape tomatoes (about 4 cups)',
    '2 large shallots, thinly sliced lengthwise',
    '4 cloves garlic, thinly sliced',
    '1 teaspoon ground coriander (optional)',
    '1/2 teaspoon crushed red-pepper flakes, plus more for serving',
    '1/4 cup extra-virgin olive oil, plus more for drizzling',
    'Kosher salt and freshly cracked black pepper',
    '1 cup whole-milk ricotta cheese',
    '1 cup fresh basil leaves, torn into bite-sized pieces'
  ];

  const steps = [
    {
      step: 1,
      title: 'Heat oven and prep sheet pan',
      text: 'Position an oven rack in the middle position and heat the oven to 425°F (220°C).'
    },
    {
      step: 2,
      title: 'Toss gnocchi and aromatics',
      text: 'On a large rimmed baking sheet, combine the uncooked gnocchi, cherry tomatoes, shallots, garlic, coriander (if using), and red-pepper flakes. Drizzle with the 1/4 cup olive oil and season generously with 1 teaspoon kosher salt and several grinds of black pepper. Toss gently with hands until evenly coated, then spread into a single layer.'
    },
    {
      step: 3,
      title: 'Roast until crisp and blistered',
      text: 'Roast without stirring for 25 to 30 minutes, until the gnocchi are crisp and golden brown on the bottom and the tomatoes have blistered and burst their sweet juices across the sheet pan.'
    },
    {
      step: 4,
      title: 'Finish with ricotta and basil',
      text: 'Dollop cool ricotta over the warm gnocchi. Scatter fresh basil leaves on top, drizzle with a little more olive oil, sprinkle with flaky sea salt and extra pepper flakes, and serve immediately straight from the pan.'
    }
  ];

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white max-w-3xl w-full border border-nyt-black shadow-2xl relative my-8 overflow-hidden rounded-sm">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-nyt-border px-6 py-4 bg-amber-50/40">
          <div className="flex items-center space-x-2">
            <UtensilsCrossed className="w-5 h-5 text-amber-800" />
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-amber-900">
              The New York Times Cooking
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSaved(!saved)}
              className={`p-1.5 border rounded-sm transition-colors ${
                saved ? 'bg-amber-100 border-amber-400 text-amber-900' : 'border-nyt-border text-nyt-gray hover:text-nyt-black'
              }`}
              title="Save Recipe to Recipe Box"
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-amber-800 text-amber-800' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 text-nyt-gray hover:text-nyt-black rounded-sm"
              aria-label="Close recipe"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-amber-800">
            Easy Weeknight Dinner • 5-Star Classic
          </span>
          <h2 className="font-headline font-bold text-2xl md:text-3xl text-nyt-black mt-1 mb-2">
            Crispy Sheet-Pan Gnocchi With Ricotta and Burst Tomatoes
          </h2>
          <p className="font-summary text-sm text-nyt-darkgray mb-4 leading-relaxed">
            By Ali Slagle • Featured on NYT Cooking’s Most-Loved Sheet-Pan Meals
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-4 border-y border-nyt-border py-3 mb-6 text-xs font-sans text-nyt-black">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-nyt-gray" />
              <div>
                <span className="text-gray-500 block text-[10px] uppercase">Total Time</span>
                <span className="font-semibold">30 minutes</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-nyt-gray" />
              <div>
                <span className="text-gray-500 block text-[10px] uppercase">Yield</span>
                <span className="font-semibold">{servings} servings</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div>
                <span className="text-gray-500 block text-[10px] uppercase">Rating</span>
                <span className="font-semibold">4.9 (4,820 notes)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Ingredients column */}
            <div className="md:col-span-5 bg-stone-50 p-4 border border-stone-200 rounded-sm">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 mb-3">
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-stone-900">
                  Ingredients
                </h3>
                <span className="text-[11px] text-stone-500">Tap to cross off</span>
              </div>
              <ul className="space-y-2.5 text-xs text-stone-800">
                {ingredients.map((item, idx) => {
                  const isChecked = checkedIngredients.includes(idx);
                  return (
                    <li
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className="flex items-start space-x-2 cursor-pointer select-none group"
                    >
                      <div
                        className={`mt-0.5 w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-amber-700 border-amber-700 text-white'
                            : 'border-stone-300 group-hover:border-stone-500 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={isChecked ? 'line-through text-stone-400' : ''}>
                        {item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Preparation column */}
            <div className="md:col-span-7 space-y-6">
              <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-nyt-black pb-2 border-b border-nyt-black">
                Preparation
              </h3>
              {steps.map(s => (
                <div key={s.step} className="space-y-1">
                  <h4 className="font-sans font-bold text-xs text-nyt-black uppercase tracking-wider">
                    Step {s.step} — {s.title}
                  </h4>
                  <p className="font-summary text-sm text-nyt-darkgray leading-relaxed">
                    {s.text}
                  </p>
                </div>
              ))}

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-sm text-xs font-sans text-amber-950">
                <span className="font-bold block mb-1">Cook’s Tip:</span>
                Do not boil the gnocchi first! The dry, shelf-stable packages roast best right from the box. They develop a crust similar to roasted cubed potatoes while maintaining a tender center.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-nyt-border bg-nyt-subtle flex items-center justify-between text-xs">
          <span className="text-nyt-gray">Access to 20,000+ recipes available with an NYT Cooking subscription.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-nyt-black text-white font-bold uppercase tracking-wider text-[10px] rounded-sm hover:bg-gray-800"
          >
            Close Recipe
          </button>
        </div>
      </div>
    </div>
  );
};
