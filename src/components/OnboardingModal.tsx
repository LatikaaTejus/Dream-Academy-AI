import React, { useState } from 'react';
import { PathId, UserProfile } from '../types';
import { PATH_OPTIONS } from '../data/defaultCurriculums';
import { Sparkles, ArrowRight, CheckCircle2, Heart, GraduationCap } from 'lucide-react';
import { sound } from '../audio';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: Partial<UserProfile>) => void;
  initialProfile: UserProfile;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  initialProfile,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState(initialProfile.name || 'Scholar');
  const [reason, setReason] = useState(initialProfile.reason || 'Conquering procrastination and learning rock-solid daily habits');
  const [selectedPath, setSelectedPath] = useState<PathId>(initialProfile.path || 'academic');
  const [customPathTitle, setCustomPathTitle] = useState(initialProfile.customPathTitle || '');
  const [baselineLevel, setBaselineLevel] = useState(initialProfile.baselineLevel || 'Beginner (fighting daily resistance)');
  const [ultimateEndGoal, setUltimateEndGoal] = useState(
    initialProfile.ultimateEndGoal || 'Ace my upcoming milestones with flawless poise and zero all-nighters'
  );

  if (!isOpen) return null;

  const quickReasons = [
    'Stopping procrastination once and for all',
    'Building bulletproof daily study/work habits',
    'Mastering a complex high-stakes topic',
    'Reigniting my ambition with poise and discipline'
  ];

  const quickBaselines = [
    'Total Beginner (prone to stalling & phone doom-scrolling)',
    'Inconsistent Intermediate (great bursts, sudden crashes)',
    'Ambitious Achiever (seeking high-level executive poise)',
  ];

  const handleStep1Next = () => {
    sound.playSparkle();
    setStep(2);
  };

  const handleStep2Next = () => {
    sound.playSparkle();
    setStep(3);
  };

  const handleFinish = () => {
    sound.playSuccess();
    onComplete({
      name: name.trim() || 'Dream Scholar',
      reason: reason.trim(),
      path: selectedPath,
      customPathTitle: selectedPath === 'custom' ? customPathTitle.trim() : undefined,
      baselineLevel: baselineLevel.trim(),
      ultimateEndGoal: ultimateEndGoal.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/40 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white/95 rounded-3xl border border-pink-200 shadow-2xl shadow-pink-500/20 overflow-hidden my-8">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 p-6 sm:p-8 text-white relative overflow-hidden">
          {/* Subtle sparkle overlays */}
          <div className="absolute top-2 right-4 text-3xl opacity-30 select-none animate-sparkle">✨</div>
          <div className="absolute bottom-2 left-6 text-2xl opacity-20 select-none">👑</div>

          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Matriculation Protocol
            </span>
            <span className="text-pink-100 text-xs font-semibold">
              Step {step} of 3
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif-dream">
            Welcome to the Dream Academy!
          </h2>
          <p className="text-pink-100 text-sm sm:text-base mt-1">
            Mentored by <span className="font-semibold text-white">Barbie, Ph.D.</span> — where high intellect meets glamorous discipline.
          </p>

          {/* Stepper bar */}
          <div className="flex gap-2 mt-5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full flex-1 transition-all ${
                  s <= step ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* STEP 1: WELCOME & REASON */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="p-4 bg-pink-50/80 rounded-2xl border border-pink-100 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Heart className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-pink-900">
                    "Welcome, my darling scholar!"
                  </h4>
                  <p className="text-xs text-pink-700 mt-0.5 leading-relaxed">
                    "I am Professor Barbie, Ph.D. You can be anything in this world, but only if you show up and do the work. Why are we creating your account today?"
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Your Scholar Name or Title
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elle, Future Chancellor, Alex"
                  className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 bg-pink-50/30 text-stone-800 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Why are you joining the Academy today?
                </label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Stopping procrastination, building rock-solid habits, mastering a topic..."
                  className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 bg-pink-50/30 text-stone-800 text-sm font-medium"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickReasons.map((qr) => (
                    <button
                      key={qr}
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        setReason(qr);
                      }}
                      className="text-xs px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 transition-colors cursor-pointer text-left"
                    >
                      + {qr}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleStep1Next}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Continue to Path Selection <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: INTEREST & PATH SELECTION */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="p-4 bg-purple-50/80 rounded-2xl border border-purple-100 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-purple-950">
                    "Select Your Dream Major"
                  </h4>
                  <p className="text-xs text-purple-700 mt-0.5 leading-relaxed">
                    "Every great pursuit requires a tailored curriculum. Choose your focus path below to generate your personalized Duolingo-style Skill Tree!"
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {PATH_OPTIONS.map((path) => {
                  const isSelected = selectedPath === path.id;
                  return (
                    <div
                      key={path.id}
                      onClick={() => {
                        sound.playPop();
                        setSelectedPath(path.id);
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50/60 shadow-md shadow-pink-500/10'
                          : 'border-pink-100 hover:border-pink-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-pink-100 flex items-center justify-center text-xl shrink-0">
                          {path.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-pink-200/70 text-pink-800">
                              [{path.code}]
                            </span>
                            <h4 className="font-bold text-sm text-stone-900">
                              {path.title}
                            </h4>
                          </div>
                          <p className="text-xs text-stone-500 mt-0.5">
                            {path.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 ml-2">
                        {isSelected ? (
                          <CheckCircle2 className="w-5 h-5 text-pink-600 fill-pink-100" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-stone-300" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedPath === 'custom' && (
                <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 space-y-2">
                  <label className="block text-xs font-bold text-pink-900 uppercase tracking-wider">
                    Specify Your Custom Focus Area:
                  </label>
                  <input
                    type="text"
                    value={customPathTitle}
                    onChange={(e) => setCustomPathTitle(e.target.value)}
                    placeholder="e.g. Master LSAT Prep, Learn Mandarin, Build SaaS MVP"
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  />
                </div>
              )}

              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleStep2Next}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Set Goals & Baselines <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: BASELINE & GOAL SETTING */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-sm text-lg font-bold">
                  🎯
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-950">
                    "Setting High Expectations"
                  </h4>
                  <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                    "Honesty is the foundation of moral science. Tell me your exact starting point and your ultimate end-goal so I can hold you accountable with love!"
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  What level are you starting from? (Baseline)
                </label>
                <input
                  type="text"
                  value={baselineLevel}
                  onChange={(e) => setBaselineLevel(e.target.value)}
                  placeholder="e.g. Beginner struggling with discipline, Intermediate..."
                  className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 bg-pink-50/30 text-stone-800 text-sm font-medium"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickBaselines.map((qb) => (
                    <button
                      key={qb}
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        setBaselineLevel(qb);
                      }}
                      className="text-xs px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 transition-colors cursor-pointer text-left"
                    >
                      + {qb}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  What is your ultimate end-goal?
                </label>
                <textarea
                  rows={2}
                  value={ultimateEndGoal}
                  onChange={(e) => setUltimateEndGoal(e.target.value)}
                  placeholder="e.g. Read 20 books, score top percentile on GRE, ship the novel draft..."
                  className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 bg-pink-50/30 text-stone-800 text-sm font-medium"
                />
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleFinish}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 text-white font-extrabold text-sm shadow-xl shadow-pink-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Generate My Dream Curriculum <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
