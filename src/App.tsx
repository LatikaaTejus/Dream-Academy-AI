import React, { useState, useEffect } from 'react';
import { UserProfile, DreamModule, BarbieTone, PathId } from './types';
import { PATH_CURRICULUMS, PATH_OPTIONS } from './data/defaultCurriculums';
import { Navbar } from './components/Navbar';
import { SkillTree } from './components/SkillTree';
import { LessonModal } from './components/LessonModal';
import { ToughLoveModal } from './components/ToughLoveModal';
import { BadgesModal } from './components/BadgesModal';
import { ChatCoach } from './components/ChatCoach';
import { OnboardingModal } from './components/OnboardingModal';
import { Sparkles, BookOpen, MessageCircle, Heart, Zap, Award, CheckCircle2 } from 'lucide-react';
import { sound } from './audio';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'barbie_academy_user_profile';

const INITIAL_PROFILE: UserProfile = {
  name: 'Dream Scholar',
  reason: 'Stopping procrastination and building daily habits of excellence',
  path: 'academic',
  baselineLevel: 'Beginner (prone to stalling)',
  ultimateEndGoal: 'Achieve peak performance with poise and high honors',
  dreamPoints: 120,
  streak: 3,
  unlockedModuleId: 'acad-1-1',
  completedModuleIds: [],
  badges: ['first_step'],
  procrastinationStrikes: 0,
};

export default function App() {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return INITIAL_PROFILE;
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    return !localStorage.getItem(STORAGE_KEY);
  });

  const [activeTab, setActiveTab] = useState<'tree' | 'chat'>('tree');
  const [selectedModule, setSelectedModule] = useState<DreamModule | null>(null);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState<boolean>(false);
  const [isToughLoveModalOpen, setIsToughLoveModalOpen] = useState<boolean>(false);
  const [toughLoveDistortion, setToughLoveDistortion] = useState<string>(
    'Emotional Avoidance disguised as Rationalization'
  );
  const [toughLoveMessage, setToughLoveMessage] = useState<string>('');
  const [coachTone, setCoachTone] = useState<BarbieTone>('sweet');

  // Persist user profile
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {}
  }, [user]);

  // Current curriculum tree
  const currentLevels = PATH_CURRICULUMS[user.path] || PATH_CURRICULUMS.academic;
  const currentPathOption = PATH_OPTIONS.find((p) => p.id === user.path);
  const activePathTitle =
    user.path === 'custom' && user.customPathTitle
      ? user.customPathTitle
      : currentPathOption?.title || 'Academic & School Studies';

  // Find active module metadata
  let activeModuleObj: DreamModule | undefined;
  for (const lvl of currentLevels) {
    const found = lvl.modules.find((m) => m.id === user.unlockedModuleId);
    if (found) {
      activeModuleObj = found;
      break;
    }
  }

  // Handle Onboarding Completion
  const handleOnboardingComplete = (updatedProfile: Partial<UserProfile>) => {
    const newPath = updatedProfile.path || 'academic';
    const firstModuleId = PATH_CURRICULUMS[newPath][0].modules[0].id;

    setUser((prev) => ({
      ...prev,
      ...updatedProfile,
      unlockedModuleId: firstModuleId,
      completedModuleIds: [],
      badges: ['first_step'],
    }));

    setIsOnboardingOpen(false);
    setCoachTone('sweet');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff1493', '#f472b6', '#f59e0b'],
    });
  };

  // Complete a module & unlock next
  const handleCompleteModule = (moduleId: string, pointsEarned: number) => {
    sound.playSuccess();

    setUser((prev) => {
      const newCompleted = prev.completedModuleIds.includes(moduleId)
        ? prev.completedModuleIds
        : [...prev.completedModuleIds, moduleId];

      // Find next module in curriculum
      let nextModuleId = prev.unlockedModuleId;
      let allModules: DreamModule[] = [];
      currentLevels.forEach((l) => allModules.push(...l.modules));
      const currentIdx = allModules.findIndex((m) => m.id === moduleId);

      if (currentIdx >= 0 && currentIdx < allModules.length - 1) {
        nextModuleId = allModules[currentIdx + 1].id;
      }

      // Check badge awards
      const newBadges = [...prev.badges];
      if (!newBadges.includes('first_step')) {
        newBadges.push('first_step');
      }
      if (newCompleted.length >= 3 && !newBadges.includes('streak_3')) {
        newBadges.push('streak_3');
      }
      if (newCompleted.length >= currentLevels[0].modules.length && !newBadges.includes('level_1_complete')) {
        newBadges.push('level_1_complete');
      }

      return {
        ...prev,
        completedModuleIds: newCompleted,
        unlockedModuleId: nextModuleId,
        dreamPoints: prev.dreamPoints + pointsEarned,
        badges: newBadges,
      };
    });

    setCoachTone('celebration');
    setTimeout(() => {
      setCoachTone('sweet');
    }, 8000);
  };

  // Handle emergency 2-minute success
  const handleSuccess2Min = (_proof: string) => {
    setUser((prev) => {
      const newBadges = [...prev.badges];
      if (!newBadges.includes('anti_stall')) {
        newBadges.push('anti_stall');
      }
      return {
        ...prev,
        dreamPoints: prev.dreamPoints + 75,
        badges: newBadges,
        procrastinationStrikes: 0,
      };
    });

    setCoachTone('sweet');
  };

  const handleTriggerToughLove = (distortion?: string, message?: string) => {
    setToughLoveDistortion(distortion || 'Emotional Avoidance disguised as Rationalization');
    setToughLoveMessage(message || '');
    setCoachTone('tough_love');
    setIsToughLoveModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff6fa] selection:bg-pink-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        user={user}
        currentTone={coachTone}
        onOpenBadges={() => setIsBadgesModalOpen(true)}
        onTriggerToughLove={() => handleTriggerToughLove()}
        onRestartOnboarding={() => setIsOnboardingOpen(true)}
        activePathTitle={activePathTitle}
      />

      {/* Motivational Ticker / Motto Bar */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 text-white py-2 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm font-semibold gap-2">
          <div className="flex items-center gap-2">
            <span className="text-amber-200">✨</span>
            <span className="font-serif-dream italic">
              "You can be anything, but only if you show up and do the work."
            </span>
          </div>

          <div className="flex items-center gap-3 text-pink-100 text-xs">
            <span>
              Target:{' '}
              <span className="text-white font-bold underline decoration-pink-300">
                {user.ultimateEndGoal}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Mobile View Switcher */}
        <div className="flex lg:hidden bg-pink-100/70 p-1.5 rounded-2xl border border-pink-200 self-center w-full max-w-md">
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('tree');
            }}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'tree'
                ? 'bg-white text-pink-700 shadow-md shadow-pink-500/10'
                : 'text-pink-900/70 hover:text-pink-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Dream Skill Tree</span>
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('chat');
            }}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-white text-pink-700 shadow-md shadow-pink-500/10'
                : 'text-pink-900/70 hover:text-pink-900'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Coach Barbie</span>
          </button>
        </div>

        {/* Dual Column Layout (Desktop side-by-side, Mobile toggled) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-start">
          {/* Left Column: Duolingo Skill Tree */}
          <div
            className={`lg:col-span-7 flex flex-col space-y-6 ${
              activeTab === 'tree' ? 'block' : 'hidden lg:block'
            }`}
          >
            {/* Hero Card for Current Active Step */}
            {activeModuleObj && (
              <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 rounded-3xl p-6 text-white shadow-xl shadow-pink-500/15 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold uppercase tracking-wider">
                      Up Next In Your Journey
                    </span>
                    <span className="text-pink-200 text-xs font-semibold">
                      +{activeModuleObj.xp} DP
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-serif-dream">
                    {activeModuleObj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-pink-100 max-w-md mt-0.5">
                    {activeModuleObj.summary}
                  </p>
                </div>

                <button
                  onClick={() => {
                    sound.playSparkle();
                    setSelectedModule(activeModuleObj);
                  }}
                  className="relative z-10 shrink-0 px-6 py-3 rounded-2xl bg-white text-pink-700 hover:bg-pink-50 font-extrabold text-sm shadow-md shadow-pink-900/20 transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 fill-pink-600 text-pink-600" />
                  <span>Execute Now</span>
                </button>
              </div>
            )}

            {/* Skill Tree Visualizer */}
            <SkillTree
              levels={currentLevels}
              completedModuleIds={user.completedModuleIds}
              activeModuleId={user.unlockedModuleId}
              onSelectModule={(mod) => setSelectedModule(mod)}
            />
          </div>

          {/* Right Column: Barbie, Ph.D. Live Coach Suite */}
          <div
            className={`lg:col-span-5 h-[650px] lg:h-[750px] sticky top-28 ${
              activeTab === 'chat' ? 'block' : 'hidden lg:block'
            }`}
          >
            <ChatCoach
              user={user}
              currentTone={coachTone}
              onToneChange={(tone) => setCoachTone(tone)}
              onTriggerToughLoveFromChat={(dist, msg) =>
                handleTriggerToughLove(dist, msg)
              }
              currentModuleTitle={activeModuleObj?.title}
              onOpenCurrentModule={() => {
                if (activeModuleObj) setSelectedModule(activeModuleObj);
              }}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-pink-200/60 bg-white/70 py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-pink-600">The Barbie Academy</span> •
            <span>High-Fashion Discipline & Moral Science</span>
          </div>
          <div>
            "Excellence is not an accident; it is an ensemble tailored by daily discipline." 💖
          </div>
        </div>
      </footer>

      {/* Modals */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onComplete={handleOnboardingComplete}
        initialProfile={user}
      />

      <LessonModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
        onCompleteModule={handleCompleteModule}
        isAlreadyCompleted={
          selectedModule ? user.completedModuleIds.includes(selectedModule.id) : false
        }
      />

      <ToughLoveModal
        isOpen={isToughLoveModalOpen}
        onClose={() => setIsToughLoveModalOpen(false)}
        user={user}
        cognitiveDistortion={toughLoveDistortion}
        customToughLoveMessage={toughLoveMessage}
        onSuccess2Min={handleSuccess2Min}
      />

      <BadgesModal
        isOpen={isBadgesModalOpen}
        onClose={() => setIsBadgesModalOpen(false)}
        earnedBadgeIds={user.badges}
      />
    </div>
  );
}
