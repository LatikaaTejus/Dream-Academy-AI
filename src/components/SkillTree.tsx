import React from 'react';
import { SkillTreeLevel, DreamModule } from '../types';
import { Check, Lock, Play, Star, BookOpen, Award, CheckCircle } from 'lucide-react';
import { sound } from '../audio';

interface SkillTreeProps {
  levels: SkillTreeLevel[];
  completedModuleIds: string[];
  activeModuleId: string;
  onSelectModule: (module: DreamModule) => void;
}

export const SkillTree: React.FC<SkillTreeProps> = ({
  levels,
  completedModuleIds,
  activeModuleId,
  onSelectModule,
}) => {
  const getModuleIcon = (type: DreamModule['type']) => {
    switch (type) {
      case 'quiz':
        return <Award className="w-5 h-5" />;
      case 'action_task':
        return <Star className="w-5 h-5" />;
      case 'capstone':
        return <CrownIcon className="w-5 h-5" />;
      case 'micro_lesson':
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4 space-y-12">
      {levels.map((level, lvlIdx) => {
        // Calculate level completion percentage
        const totalInLevel = level.modules.length;
        const completedInLevel = level.modules.filter((m) =>
          completedModuleIds.includes(m.id)
        ).length;
        const isLevelComplete = completedInLevel === totalInLevel && totalInLevel > 0;

        return (
          <section
            key={level.levelNumber}
            className="relative bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xl shadow-pink-500/5 overflow-hidden"
          >
            {/* Level Decorative Header Banner */}
            <div className="relative mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold tracking-wider uppercase shadow-md shadow-pink-500/20 mb-2">
                <span>Level {level.levelNumber}</span>
                {isLevelComplete && (
                  <span className="flex items-center gap-1 text-amber-200">
                    • Completed <CheckCircle className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif-dream tracking-tight">
                {level.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto mt-1">
                {level.tagline}
              </p>

              {/* Progress bar for level */}
              <div className="max-w-xs mx-auto mt-3">
                <div className="flex justify-between text-[11px] font-bold text-pink-700 mb-1">
                  <span>Progress</span>
                  <span>
                    {completedInLevel}/{totalInLevel} Modules
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-pink-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500"
                    style={{
                      width: `${(completedInLevel / totalInLevel) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Stepping Stones Path */}
            <div className="relative flex flex-col items-center gap-8 py-2">
              {level.modules.map((module, modIdx) => {
                const isCompleted = completedModuleIds.includes(module.id);
                const isCurrent = module.id === activeModuleId;
                const isLocked = !isCompleted && !isCurrent;

                // Alternate horizontal offsets for subtle playful Duolingo curve
                const offsets = ['translate-x-0', '-translate-x-6 sm:-translate-x-12', 'translate-x-6 sm:translate-x-12'];
                const offsetClass = offsets[modIdx % offsets.length];

                return (
                  <div
                    key={module.id}
                    className={`relative flex flex-col items-center ${offsetClass} transition-transform duration-300`}
                  >
                    {/* Speech bubble prompt for current module */}
                    {isCurrent && (
                      <div className="absolute -top-12 z-20 animate-bounce">
                        <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-extrabold shadow-lg shadow-pink-500/30 flex items-center gap-1.5 whitespace-nowrap">
                          <Play className="w-3 h-3 fill-white" />
                          <span>Start Here, Darling!</span>
                        </div>
                        <div className="w-2.5 h-2.5 bg-rose-600 rotate-45 mx-auto -mt-1" />
                      </div>
                    )}

                    {/* Node Button */}
                    <button
                      disabled={isLocked}
                      onClick={() => {
                        if (isCompleted || isCurrent) {
                          sound.playSparkle();
                          onSelectModule(module);
                        } else {
                          sound.playToughLove();
                        }
                      }}
                      className={`group relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-95 ${
                        isCompleted
                          ? 'bg-gradient-to-tr from-amber-400 via-rose-400 to-pink-500 text-white shadow-lg shadow-amber-400/30 hover:scale-105 cursor-pointer ring-4 ring-amber-100'
                          : isCurrent
                          ? 'bg-gradient-to-tr from-pink-600 to-rose-500 text-white shadow-xl shadow-pink-500/40 ring-4 ring-pink-200 animate-pulse-subtle hover:scale-105 cursor-pointer'
                          : 'bg-stone-100 text-stone-400 border-2 border-stone-200 cursor-not-allowed opacity-75'
                      }`}
                    >
                      {/* Inner Ring */}
                      <div className="flex flex-col items-center justify-center">
                        {isCompleted ? (
                          <Check className="w-8 h-8 stroke-[3]" />
                        ) : isCurrent ? (
                          <div className="relative">
                            {getModuleIcon(module.type)}
                            <span className="absolute -bottom-1 -right-1 text-[10px]">✨</span>
                          </div>
                        ) : (
                          <Lock className="w-6 h-6 stroke-[2]" />
                        )}
                      </div>

                      {/* XP Pill */}
                      <div
                        className={`absolute -bottom-2 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs whitespace-nowrap ${
                          isCompleted
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : isCurrent
                            ? 'bg-pink-100 text-pink-800 border border-pink-300 font-extrabold'
                            : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        +{module.xp} DP
                      </div>
                    </button>

                    {/* Module Title & Subtitle */}
                    <div className="mt-3 text-center max-w-[190px]">
                      <h4
                        className={`text-xs sm:text-sm font-bold ${
                          isCompleted
                            ? 'text-pink-900'
                            : isCurrent
                            ? 'text-pink-600 font-extrabold'
                            : 'text-stone-400'
                        }`}
                      >
                        {module.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                        {module.subtitle}
                      </p>
                    </div>

                    {/* Connecting vertical line to next module */}
                    {modIdx < level.modules.length - 1 && (
                      <div className="w-1 h-6 bg-dashed border-l-2 border-dashed border-pink-200 my-1" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Connecting line between levels */}
            {lvlIdx < levels.length - 1 && (
              <div className="w-1 h-10 border-l-2 border-dashed border-pink-300 mx-auto mt-6" />
            )}
          </section>
        );
      })}
    </div>
  );
};

function CrownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V18H19V19Z" />
    </svg>
  );
}
