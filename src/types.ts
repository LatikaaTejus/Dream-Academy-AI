export type PathId = 'literature' | 'academic' | 'career' | 'creative' | 'custom';

export interface PathOption {
  id: PathId;
  code: 'A' | 'B' | 'C' | 'D' | 'E';
  title: string;
  subtitle: string;
  icon: string;
  exampleGoal: string;
}

export interface UserProfile {
  name: string;
  reason: string;
  path: PathId;
  customPathTitle?: string;
  baselineLevel: string;
  ultimateEndGoal: string;
  dreamPoints: number;
  streak: number;
  unlockedModuleId: string;
  completedModuleIds: string[];
  badges: string[]; // badge IDs
  activeEmergency2Min?: {
    task: string;
    startedAt: number;
    durationSeconds: number;
  } | null;
  procrastinationStrikes: number;
}

export interface DreamModule {
  id: string;
  levelNumber: number;
  moduleNumber: number;
  title: string;
  subtitle: string;
  type: 'micro_lesson' | 'action_task' | 'quiz' | 'capstone';
  xp: number;
  summary: string;
  deepDive: string;
  actionPrompt: string;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  twoMinuteShortcut?: string;
  barbieAdvice: string;
}

export interface SkillTreeLevel {
  levelNumber: number;
  title: string;
  theme: string;
  tagline: string;
  modules: DreamModule[];
}

export type BarbieTone = 'sweet' | 'tough_love' | 'celebration' | 'professor';

export interface ChatMessage {
  id: string;
  sender: 'barbie' | 'user';
  text: string;
  timestamp: string;
  tone: BarbieTone;
  cognitiveDistortion?: string;
  actionSuggestion?: {
    type: 'continue_module' | 'emergency_2min' | 'quiz' | 'take_break';
    moduleId?: string;
    label: string;
  };
}

export interface BadgeDefinition {
  id: string;
  title: string;
  subtitle: string;
  category: 'Milestone' | 'Accountability' | 'Intellect' | 'Poise';
  icon: string;
  color: string;
}
