import React from 'react';
import { BADGE_DEFINITIONS } from '../data/defaultCurriculums';
import { X, Award, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { sound } from '../audio';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  earnedBadgeIds: string[];
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  earnedBadgeIds,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/40 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-pink-200 shadow-2xl shadow-pink-500/20 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-rose-600 p-6 text-white relative">
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Accolades & Sashes
            </span>
            <span className="text-pink-100 text-xs font-medium">
              {earnedBadgeIds.length} of {BADGE_DEFINITIONS.length} Unlocked
            </span>
          </div>

          <h2 className="text-2xl font-extrabold font-serif-dream tracking-tight">
            Dream Wardrobe of Accolades
          </h2>
          <p className="text-xs sm:text-sm text-pink-100 mt-0.5">
            Wear your discipline like bespoke couture. Every badge earned marks real cognitive victory.
          </p>
        </div>

        {/* Badge Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
          {BADGE_DEFINITIONS.map((badge) => {
            const isEarned = earnedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${
                  isEarned
                    ? 'border-pink-300 bg-pink-50/50 shadow-sm'
                    : 'border-stone-200 bg-stone-50/60 opacity-60'
                }`}
              >
                {/* Badge Avatar */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm ${
                    isEarned
                      ? `bg-gradient-to-tr ${badge.color} text-white shadow-pink-500/20`
                      : 'bg-stone-200 text-stone-400'
                  }`}
                >
                  {badge.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4
                      className={`text-sm font-bold truncate ${
                        isEarned ? 'text-stone-900' : 'text-stone-500'
                      }`}
                    >
                      {badge.title}
                    </h4>
                    {isEarned ? (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3 h-3" /> Earned
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-stone-200 text-stone-600 flex items-center gap-1 shrink-0">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">
                    {badge.subtitle}
                  </p>

                  <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-pink-700">
                    Category: {badge.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
