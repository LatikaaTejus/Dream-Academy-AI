import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, ChatMessage, BarbieTone } from '../types';
import { Send, Sparkles, ShieldAlert, Heart, GraduationCap, Zap, ArrowRight } from 'lucide-react';
import { sound } from '../audio';

interface ChatCoachProps {
  user: UserProfile;
  currentTone: BarbieTone;
  onToneChange: (tone: BarbieTone) => void;
  onTriggerToughLoveFromChat: (distortion?: string, message?: string) => void;
  currentModuleTitle?: string;
  onOpenCurrentModule?: () => void;
}

export const ChatCoach: React.FC<ChatCoachProps> = ({
  user,
  currentTone,
  onToneChange,
  onTriggerToughLoveFromChat,
  currentModuleTitle = 'Foundations',
  onOpenCurrentModule,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'barbie',
      text: `Welcome to your personal professorial suite, darling! 💖 I am Barbie, Ph.D. We have configured your ambitious path in ${user.path.toUpperCase()}. Remember: "You can be anything, but only if you show up and do the work." 

Are you ready to tackle **${currentModuleTitle}**, or is something standing in your way? Tell me everything—I am listening with an open heart and high expectations! ✨`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tone: 'sweet',
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: "I'm stalling & making excuses...", isExcuse: true },
    { label: "Give me an emergency 2-minute step", isExcuse: true },
    { label: "How do I beat cognitive fatigue?", isExcuse: false },
    { label: "Remind me why I started", isExcuse: false },
  ];

  const handleSend = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isTyping) return;

    sound.playPop();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tone: 'sweet',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          history: messages.slice(-6),
          userContext: {
            name: user.name,
            reason: user.reason,
            path: user.path,
            ultimateEndGoal: user.ultimateEndGoal,
            currentModuleTitle,
          },
        }),
      });

      const data = await response.json();
      setIsTyping(false);

      const coachTone: BarbieTone = data.tone || 'sweet';
      onToneChange(coachTone);

      if (coachTone === 'tough_love') {
        sound.playToughLove();
      } else {
        sound.playSparkle();
      }

      const barbieMsg: ChatMessage = {
        id: `barbie-${Date.now()}`,
        sender: 'barbie',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tone: coachTone,
        cognitiveDistortion: data.cognitiveDistortion,
        actionSuggestion: data.actionSuggestion,
      };

      setMessages((prev) => [...prev, barbieMsg]);
    } catch {
      setIsTyping(false);
      onToneChange('sweet');
      const fallbackMsg: ChatMessage = {
        id: `barbie-${Date.now()}`,
        sender: 'barbie',
        text: `Darling, you are capable of extraordinary things. Let's redirect our full energy back to **${currentModuleTitle}**. What is the single micro-sentence you are completing right now? ✨`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tone: 'sweet',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    }
  };

  const getAvatarBorder = () => {
    switch (currentTone) {
      case 'tough_love':
        return 'ring-4 ring-rose-500 shadow-rose-900/40 bg-gradient-to-tr from-rose-950 to-rose-700';
      case 'professor':
        return 'ring-4 ring-purple-400 shadow-purple-500/30 bg-gradient-to-tr from-purple-800 to-pink-700';
      case 'celebration':
        return 'ring-4 ring-amber-400 shadow-amber-500/30 bg-gradient-to-tr from-amber-500 to-pink-500';
      case 'sweet':
      default:
        return 'ring-4 ring-pink-300 shadow-pink-500/20 bg-gradient-to-tr from-pink-500 to-rose-400';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-pink-100 shadow-xl shadow-pink-500/5 overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-pink-50 via-rose-50 to-pink-100 border-b border-pink-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-md transition-all ${getAvatarBorder()}`}>
            {currentTone === 'tough_love' ? '⚡' : currentTone === 'professor' ? '🎓' : '💖'}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-stone-900 font-serif-dream text-base">
                Barbie, Ph.D.
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-200/80 text-pink-800 uppercase tracking-wider">
                Coach & Mentor
              </span>
            </div>
            <p className="text-xs text-stone-500">
              {currentTone === 'tough_love'
                ? 'Clinical Tough Love Protocol Active'
                : 'High-Expectation Intellectual Mentorship'}
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-pink-200 text-xs font-semibold text-pink-700 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>At The Podium</span>
        </div>
      </div>

      {/* Messages Scroll View */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-gradient-to-b from-pink-50/20 to-white"
      >
        {messages.map((msg) => {
          const isBarbie = msg.sender === 'barbie';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isBarbie ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  isBarbie
                    ? msg.tone === 'tough_love'
                      ? 'bg-rose-950 text-rose-100 border border-rose-800'
                      : 'bg-white border border-pink-200/90 text-stone-800'
                    : 'bg-gradient-to-r from-pink-600 to-rose-600 text-white font-medium'
                }`}
              >
                {/* Tone badge for Barbie */}
                {isBarbie && (
                  <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-pink-100/30">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider ${
                        msg.tone === 'tough_love'
                          ? 'text-rose-300'
                          : 'text-pink-600'
                      }`}
                    >
                      {msg.tone === 'tough_love'
                        ? '⚡ Stern Professor / Therapist'
                        : '💖 Barbie, Ph.D.'}
                    </span>
                    <span className="text-[10px] opacity-60">
                      {msg.timestamp}
                    </span>
                  </div>
                )}

                {/* Cognitive distortion banner if tough love */}
                {msg.cognitiveDistortion && (
                  <div className="mb-2 p-2 rounded-lg bg-rose-900/80 border border-rose-700 text-rose-200 text-xs font-semibold flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                    <span>Distortion: {msg.cognitiveDistortion}</span>
                  </div>
                )}

                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Action Card Button inside message */}
                {msg.actionSuggestion && (
                  <div className="mt-3 pt-2 border-t border-pink-100/40">
                    {msg.actionSuggestion.type === 'emergency_2min' ? (
                      <button
                        onClick={() => {
                          sound.playToughLove();
                          onTriggerToughLoveFromChat(msg.cognitiveDistortion, msg.text);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 fill-white" />
                        <span>{msg.actionSuggestion.label}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          sound.playSparkle();
                          if (onOpenCurrentModule) onOpenCurrentModule();
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                      >
                        <span>{msg.actionSuggestion.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-pink-200 w-fit">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            <span className="text-xs text-stone-500 font-medium">
              Professor Barbie is formulating her counsel...
            </span>
          </div>
        )}
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 bg-pink-50/50 border-t border-pink-100 flex gap-2 overflow-x-auto scrollbar-none">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(qp.label)}
            className={`text-[11px] whitespace-nowrap px-3 py-1 rounded-full border transition-all cursor-pointer font-medium ${
              qp.isExcuse
                ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200'
                : 'bg-white hover:bg-pink-100 text-pink-800 border-pink-200'
            }`}
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 sm:p-4 bg-white border-t border-pink-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share your progress or confess your hesitation..."
            className="flex-1 px-4 py-2.5 rounded-2xl border border-pink-200 text-stone-900 text-xs sm:text-sm bg-pink-50/20 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2.5 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 disabled:opacity-40 text-white shadow-md shadow-pink-500/20 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
