import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { X, Play, Pause, RotateCcw, CheckCircle2, ShieldAlert, Sparkles, Heart } from 'lucide-react';
import { sound } from '../audio';
import confetti from 'canvas-confetti';

interface ToughLoveModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  cognitiveDistortion?: string;
  customToughLoveMessage?: string;
  onSuccess2Min: (proof: string) => void;
}

export const ToughLoveModal: React.FC<ToughLoveModalProps> = ({
  isOpen,
  onClose,
  user,
  cognitiveDistortion = 'Emotional Avoidance disguised as Rationalization',
  customToughLoveMessage,
  onSuccess2Min,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [taskProof, setTaskProof] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            sound.playSuccess();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStartTimer = () => {
    sound.playToughLove();
    setIsRunning(true);
  };

  const handlePauseTimer = () => {
    sound.playPop();
    setIsRunning(false);
  };

  const handleResetTimer = () => {
    sound.playPop();
    setIsRunning(false);
    setTimeLeft(120);
  };

  const handleClaimSuccess = () => {
    sound.playSuccess();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#db0075', '#ff1493', '#f59e0b', '#10b981'],
    });
    setIsCompleted(true);
    onSuccess2Min(taskProof.trim() || 'Completed 120 seconds of focused execution!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border-2 border-rose-400 shadow-2xl shadow-rose-950/40 overflow-hidden my-6">
        {/* Fierce Tough Love Header */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-950 to-pink-950 p-6 text-white relative">
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold tracking-wider uppercase mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> High-Expectation Accountability Protocol
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold font-serif-dream tracking-tight text-rose-100">
            "Darling, We Need To Have A Serious Word."
          </h2>
          <p className="text-xs text-rose-300 mt-0.5">
            Barbie, Ph.D. — Professor & Clinical Accountability Intervention
          </p>
        </div>

        <div className="p-6 space-y-5">
          {!isCompleted ? (
            <>
              {/* Cognitive Distortion Diagnosis */}
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
                  Diagnosed Cognitive Distortion:
                </span>
                <p className="text-sm font-extrabold text-rose-950 mt-0.5">
                  ⚡ {cognitiveDistortion}
                </p>
                <p className="text-xs text-rose-900 mt-2 leading-relaxed">
                  {customToughLoveMessage || (
                    <>
                      "You came to the Dream Academy declaring that you want to{' '}
                      <span className="font-bold underline text-rose-950">
                        "{user.ultimateEndGoal}"
                      </span>
                      . Yet the moment slight cognitive resistance arose, you began negotiating with comfort. 
                      You can be anything, darling, but absolutely not if you let excuses dictate your schedule. 
                      I refuse to let you lower your standards today."
                    </>
                  )}
                </p>
              </div>

              {/* Demand 2-Minute Execution */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-stone-900 to-rose-950 text-white text-center space-y-3 shadow-md">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">
                  The 2-Minute Emergency Focus Mandate
                </span>
                <p className="text-xs text-stone-300 max-w-md mx-auto">
                  No debate. No overthinking. Execute just 120 seconds of simplified micro-effort on your goal right now.
                </p>

                {/* Live Timer Display */}
                <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white py-2">
                  {formatTime(timeLeft)}
                </div>

                <div className="flex items-center justify-center gap-3">
                  {!isRunning ? (
                    <button
                      onClick={handleStartTimer}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/30 transition-all cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-white" /> Start 2-Minute Blitz
                    </button>
                  ) : (
                    <button
                      onClick={handlePauseTimer}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-700 hover:bg-stone-600 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <Pause className="w-4 h-4" /> Pause
                    </button>
                  )}

                  <button
                    onClick={handleResetTimer}
                    className="p-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
                    title="Reset to 120s"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Execution Proof Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  What did you just execute in these 2 minutes?
                </label>
                <input
                  type="text"
                  value={taskProof}
                  onChange={(e) => setTaskProof(e.target.value)}
                  placeholder="e.g. Read 2 pages, drafted outline, wrote 50 words, closed Instagram..."
                  className="w-full px-4 py-2.5 rounded-xl border border-rose-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                />
              </div>

              {/* Submission Button */}
              <button
                disabled={timeLeft > 115 && !taskProof.trim()}
                onClick={handleClaimSuccess}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-700 hover:to-amber-600 disabled:opacity-50 text-white font-extrabold text-sm shadow-xl shadow-pink-500/30 transition-all transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>I Executed My 2 Minutes — Restore Sweet Support!</span>
              </button>
            </>
          ) : (
            /* Restoration State */
            <div className="text-center py-6 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 mx-auto flex items-center justify-center text-3xl shadow-lg shadow-pink-500/30">
                👑
              </div>

              <h3 className="text-2xl font-extrabold text-stone-900 font-serif-dream">
                "That is the scholar I believe in!"
              </h3>

              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                "You pushed through the discomfort. Look what happened: the sky did not fall, and your friction dissolved. 
                I am so proud of you, darling! Full sweet support is officially restored, plus you've earned the{' '}
                <span className="font-bold text-pink-600">Excuse-Proof Tiara</span>!"
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    sound.playSparkle();
                    onClose();
                  }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-sm shadow-lg shadow-pink-500/30 transition-all cursor-pointer flex items-center gap-2 mx-auto"
                >
                  <Heart className="w-4 h-4 fill-white" /> Return to My Skill Tree with Pride
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
