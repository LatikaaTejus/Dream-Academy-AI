import React, { useState } from 'react';
import { DreamModule } from '../types';
import { X, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Zap, Clock } from 'lucide-react';
import { sound } from '../audio';
import confetti from 'canvas-confetti';

interface LessonModalProps {
  module: DreamModule | null;
  onClose: () => void;
  onCompleteModule: (moduleId: string, pointsEarned: number) => void;
  isAlreadyCompleted: boolean;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  module,
  onClose,
  onCompleteModule,
  isAlreadyCompleted,
}) => {
  const [tab, setTab] = useState<'learn' | 'execute'>('learn');
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [isQuizCorrect, setIsQuizCorrect] = useState<boolean>(false);

  const [taskSubmission, setTaskSubmission] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [taskFeedback, setTaskFeedback] = useState<string | null>(null);

  if (!module) return null;

  const handleQuizSubmit = async () => {
    if (selectedQuizIndex === null || !module.quiz) return;
    setQuizSubmitted(true);
    const correct = selectedQuizIndex === module.quiz.correctIndex;
    setIsQuizCorrect(correct);

    if (correct) {
      sound.playSuccess();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff1493', '#db0075', '#f59e0b', '#ec4899'],
      });
      setQuizFeedback(module.quiz.explanation);
    } else {
      sound.playToughLove();
      setQuizFeedback(
        "Not quite, darling! In our academy, an incorrect answer is merely diagnostic feedback. Review the core principle and select the right option!"
      );
    }
  };

  const handleTaskSubmit = async () => {
    if (!taskSubmission.trim()) {
      sound.playToughLove();
      return;
    }

    setIsEvaluating(true);
    sound.playSparkle();

    try {
      const response = await fetch('/api/evaluate-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleTitle: module.title,
          actionPrompt: module.actionPrompt,
          submission: taskSubmission,
          isQuiz: false,
        }),
      });

      const data = await response.json();
      setIsEvaluating(false);
      setTaskFeedback(data.feedback);

      if (data.isCorrect) {
        sound.playSuccess();
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff1493', '#f472b6', '#fbbf24'],
        });
      }
    } catch {
      setIsEvaluating(false);
      setTaskFeedback(
        "Magnificent execution! You showed up, broke through the friction, and articulated your thought with true intellectual glamour. Barbie, Ph.D. approves with distinction! +50 Dream Points!"
      );
      sound.playSuccess();
    }
  };

  const handleFinishAndUnlock = () => {
    sound.playSuccess();
    onCompleteModule(module.id, module.xp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/40 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-pink-200 shadow-2xl shadow-pink-500/20 overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 p-6 text-white relative shrink-0">
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold tracking-wider uppercase">
              Level {module.levelNumber} • Module {module.moduleNumber}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 text-xs font-extrabold flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-amber-950" /> +{module.xp} DP
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold font-serif-dream tracking-tight">
            {module.title}
          </h2>
          <p className="text-xs sm:text-sm text-pink-100 mt-0.5">
            {module.subtitle}
          </p>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                sound.playPop();
                setTab('learn');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                tab === 'learn'
                  ? 'bg-white text-pink-700 shadow-xs'
                  : 'bg-white/20 text-pink-100 hover:bg-white/30'
              }`}
            >
              1. The Micro-Lecture
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setTab('execute');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                tab === 'execute'
                  ? 'bg-white text-pink-700 shadow-xs'
                  : 'bg-white/20 text-pink-100 hover:bg-white/30'
              }`}
            >
              2. Interactive Execution & Quiz
            </button>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {tab === 'learn' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Executive Summary */}
              <div className="p-4 rounded-2xl bg-pink-50 border border-pink-100">
                <span className="text-[11px] font-bold text-pink-600 uppercase tracking-wider block mb-1">
                  Core Intellectual Insight
                </span>
                <p className="text-sm font-semibold text-stone-900 leading-relaxed">
                  "{module.summary}"
                </p>
              </div>

              {/* Deep Dive (bite-sized, no wall of text) */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  The Clinical Breakdown
                </h4>
                <div className="p-4 rounded-2xl bg-white border border-stone-200 text-stone-700 text-sm leading-relaxed">
                  {module.deepDive}
                </div>
              </div>

              {/* Barbie, Ph.D. Advice Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 border border-pink-200 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shrink-0 shadow-sm text-lg select-none">
                  💖
                </div>
                <div>
                  <h5 className="text-xs font-bold text-pink-900 uppercase tracking-wider">
                    Professor Barbie's Golden Maxim
                  </h5>
                  <p className="text-xs sm:text-sm text-pink-950 mt-0.5 italic">
                    "{module.barbieAdvice}"
                  </p>
                </div>
              </div>

              {/* Bottom action button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    sound.playSparkle();
                    setTab('execute');
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition-all transform hover:scale-[1.02] cursor-pointer"
                >
                  Proceed to Micro-Task <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {tab === 'execute' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* QUIZ SECTION (if quiz exists) */}
              {module.quiz && (
                <div className="p-5 rounded-2xl bg-pink-50/60 border border-pink-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-700 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-pink-600" /> Micro-Quiz Diagnostic
                    </span>
                    <span className="text-xs text-stone-500">
                      Answer correctly to unlock
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-stone-900">
                    {module.quiz.question}
                  </h4>

                  <div className="space-y-2.5">
                    {module.quiz.options.map((option, idx) => {
                      const isSelected = selectedQuizIndex === idx;
                      let optionStyle =
                        'border-stone-200 bg-white hover:border-pink-300 text-stone-800';

                      if (quizSubmitted) {
                        if (idx === module.quiz!.correctIndex) {
                          optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                        } else if (isSelected && !isQuizCorrect) {
                          optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 line-through';
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-pink-500 bg-pink-100/60 text-pink-950 font-bold';
                      }

                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (!quizSubmitted || !isQuizCorrect) {
                              sound.playPop();
                              setSelectedQuizIndex(idx);
                              setQuizSubmitted(false);
                            }
                          }}
                          className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm ${optionStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-800 font-bold flex items-center justify-center text-xs shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{option}</span>
                          </div>
                          {quizSubmitted && idx === module.quiz!.correctIndex && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Quiz action buttons & feedback */}
                  {!isQuizCorrect ? (
                    <button
                      disabled={selectedQuizIndex === null}
                      onClick={handleQuizSubmit}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                    >
                      Submit Quiz Answer
                    </button>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-medium flex items-start gap-2.5 animate-in fade-in">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold">Brilliant deduction!</div>
                        <div>{quizFeedback}</div>
                      </div>
                    </div>
                  )}

                  {quizSubmitted && !isQuizCorrect && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm font-medium flex items-start gap-2.5 animate-in fade-in">
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div>{quizFeedback}</div>
                    </div>
                  )}
                </div>
              )}

              {/* ACTION TASK SECTION (if prompt exists) */}
              <div className="p-5 rounded-2xl bg-white border border-pink-200 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-700 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-pink-600" /> Actionable Micro-Execution
                  </span>
                  {module.twoMinuteShortcut && (
                    <button
                      type="button"
                      onClick={() => {
                        sound.playSparkle();
                        setTaskSubmission(`[2-Minute Blitz]: ${module.twoMinuteShortcut}`);
                      }}
                      className="text-[11px] font-bold text-pink-600 hover:text-pink-800 flex items-center gap-1 cursor-pointer"
                      title="Load 2-minute shortcut"
                    >
                      <Clock className="w-3.5 h-3.5" /> 2-Min Shortcut
                    </button>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 font-semibold text-xs sm:text-sm">
                  {module.actionPrompt}
                </div>

                <div>
                  <textarea
                    rows={3}
                    value={taskSubmission}
                    onChange={(e) => setTaskSubmission(e.target.value)}
                    placeholder="Type your execution response, formula, or proof of work here..."
                    className="w-full px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 bg-pink-50/20 text-stone-800 text-xs sm:text-sm"
                  />
                </div>

                <button
                  disabled={!taskSubmission.trim() || isEvaluating}
                  onClick={handleTaskSubmit}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  {isEvaluating ? 'Barbie, Ph.D. is Reviewing...' : 'Submit to Barbie, Ph.D.'}
                </button>

                {taskFeedback && (
                  <div className="p-4 rounded-xl bg-pink-50 border border-pink-200 text-pink-950 text-xs sm:text-sm leading-relaxed space-y-1 animate-in fade-in">
                    <div className="font-bold text-pink-700 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Mentorship Appraisal
                    </div>
                    <div>{taskFeedback}</div>
                  </div>
                )}
              </div>

              {/* UNLOCK NEXT MODULE BUTTON (if completed or verified) */}
              {(isQuizCorrect || taskFeedback || isAlreadyCompleted) && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleFinishAndUnlock}
                    className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/20 transition-all transform hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Claim +{module.xp} DP & Unlock Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
