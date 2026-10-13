import React from 'react';
import { UserProfile, BarbieTone } from '../types';
import { Sparkles, Flame, Award, HeartHandshake, RotateCcw } from 'lucide-react';
import { sound } from '../audio';

interface NavbarProps {
  user: UserProfile;
  currentTone: BarbieTone;
  onOpenBadges: () => void;
  onTriggerToughLove: () => void;
  onRestartOnboarding: () => void;
  activePathTitle: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  currentTone,
  onOpenBadges,
  onTriggerToughLove,
  onRestartOnboarding,
  activePathTitle,
}) => {
  const getToneBadge = () => {
    switch (currentTone) {
      case 'tough_love':
        return {
          label: '⚡ Tough Love Mode',
          sub: 'Professor / Therapist Firmness',
          bg: 'bg-rose-950 text-rose-200 border-rose-500/50 shadow-rose-950/20',
          dot: 'bg-rose-400 animate-ping',
        };
      case 'celebration':
        return {
          label: '🎉 Celebration Mode',
          sub: 'High Accolades & Accents',
          bg: 'bg-amber-100 text-amber-900 border-amber-300 shadow-amber-500/20',
          dot: 'bg-amber-500 animate-pulse',
        };
      case 'professor':
        return {
          label: '🎓 Professor Mode',
          sub: 'Intellectual Rigor Active',
          bg: 'bg-purple-100 text-purple-900 border-purple-300 shadow-purple-500/20',
          dot: 'bg-purple-500 animate-pulse',
        };
      case 'sweet':
      default:
        return {
          label: '💖 Sweet Encouragement',
          sub: 'Ultra-Motivating Poise',
          bg: 'bg-pink-100 text-pink-900 border-pink-300 shadow-pink-500/20',
          dot: 'bg-pink-500 animate-ping',
        };
    }
  };

  const toneConfig = getToneBadge();

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-pink-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-300 p-0.5 shadow-md shadow-pink-500/20 flex items-center justify-center transform group-hover:rotate-3 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <span className="text-2xl select-none" role="img" aria-label="tiara">
                  👑
                </span>
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-pink-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-700 bg-clip-text text-transparent font-serif-dream">
                The Barbie Academy
              </h1>
              <span className="hidden sm:inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                Ph.D. Edition
              </span>
            </div>
            <p className="text-xs text-stone-500 truncate max-w-[200px] sm:max-w-xs">
              <span className="font-medium text-pink-600">{activePathTitle}</span> • {user.name || 'Dream Scholar'}
            </p>
          </div>
        </div>

        {/* Dynamic Coach Tone Indicator */}
        <div className="hidden md:flex items-center">
          <div
            className={`px-3 py-1.5 rounded-full border text-xs font-medium flex items-center gap-2 shadow-xs transition-colors ${toneConfig.bg}`}
          >
            <span className={`w-2 h-2 rounded-full ${toneConfig.dot}`} />
            <div>
              <div className="font-semibold">{toneConfig.label}</div>
            </div>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Dream Points */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-full text-pink-700 text-sm font-bold shadow-xs transition-colors"
            title="Dream Academy Points"
          >
            <Sparkles className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span>{user.dreamPoints} DP</span>
          </div>

          {/* Daily Streak */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-full text-amber-800 text-sm font-bold shadow-xs transition-colors"
            title="Disciplined Day Streak"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{user.streak} Days</span>
          </div>

          {/* Badges Button */}
          <button
            onClick={() => {
              sound.playSparkle();
              onOpenBadges();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-full text-purple-700 text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            title="Dream Wardrobe of Accolades"
          >
            <Award className="w-4 h-4 text-purple-600" />
            <span className="hidden sm:inline">{user.badges.length} Badges</span>
          </button>

          {/* Emergency Tough Love Hotline */}
          <button
            onClick={() => {
              sound.playToughLove();
              onTriggerToughLove();
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-full text-xs sm:text-sm font-bold shadow-md shadow-pink-600/25 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            title="Procrastinating? Demand Professor Barbie's Tough Love & 2-Minute Protocol"
          >
            <HeartHandshake className="w-4 h-4 text-white" />
            <span className="whitespace-nowrap">I'm Stalling!</span>
          </button>

          {/* Restart Onboarding */}
          <button
            onClick={() => {
              sound.playPop();
              onRestartOnboarding();
            }}
            className="p-2 text-stone-400 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors cursor-pointer"
            title="Restart Onboarding / Change Path"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
