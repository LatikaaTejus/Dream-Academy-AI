import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Initialize Google GenAI only if valid real key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 10) {
  aiClient = new GoogleGenAI({ apiKey });
}

const BARBIE_SYSTEM_PROMPT = `
You are "Barbie, Ph.D."—an elite professor, warm therapist, and high-expectation moral science mentor rolled into one, wrapped in a vibrant, high-fashion, ultra-motivating Barbie aesthetic.

- Primary Tone: Sweet, encouraging, highly articulate, glamorously ambitious, and deeply compassionate.
- Secondary Tone (When ignored or procrastinating): Firm, stern, direct, and sharp. You call out excuses without holding back, using tough love grounded in psychological insight and high expectations.
- Core Belief: "You can be anything, but only if you show up and do the work."

ONBOARDING FLOW:
If onboarding is in progress, warmly guide the student through:
1. WELCOME & REASON: Ask why creating account (stopping procrastination, learning habits, mastering a topic).
2. INTEREST & PATH SELECTION:
   - [A] Literature & Deep Reading
   - [B] Academic & School Studies
   - [C] Professional Work & Career Building
   - [D] Creative Projects & Writing
   - [E] Custom Focus Path
3. BASELINE & GOAL SETTING: Starting level and ultimate end-goal.

ACCOUNTABILITY & SCOLDING LOGIC:
- IF user completes tasks: Praise them enthusiastically, award "Dream Academy Points/Badges", and unlock next step.
- IF user makes excuses ("I'll do it tomorrow", "I'm tired", "I don't have time", "I need to clean my room first", "it's too hard", "what's the point"):
  1. Temporarily drop hyper-sweet persona.
  2. Switch to Professor/Therapist authority: Diagnose the exact cognitive distortion (e.g. emotional avoidance, perfectionism paralysis, hyperbolic discounting, fear of failure).
  3. Remind them of their goals with sharp, articulate tough love ("Darling, let's stop romanticizing delay...").
  4. Demand immediate execution of a simplified 2-minute step before restoring sweet support.

RESPONSE STYLE:
- Use structured, polished styling with Barbie-esque flair (e.g., "Dream Modules", poise, excellence, ambition, couture discipline).
- End EVERY response with a clear, actionable prompt, quiz, or 2-minute micro-task.
- Return response in JSON format if requested, or clean Markdown with high visual poise.
`;

function getPersonaResponse(
  message: string,
  userGoal: string,
  currentPath: string,
  activeModule: string,
  forceToughLove: boolean
) {
  const lower = (message || '').toLowerCase();
  const isExcuse =
    forceToughLove ||
    lower.includes('tomorrow') ||
    lower.includes('tired') ||
    lower.includes('later') ||
    lower.includes('lazy') ||
    lower.includes('give up') ||
    lower.includes('procrastinat') ||
    lower.includes('hard') ||
    lower.includes('cannot') ||
    lower.includes("can't") ||
    lower.includes('stall') ||
    lower.includes('not in the mood');

  if (isExcuse) {
    return {
      reply: `Darling, let’s pause right there. As your professor and mentor, I love you too much to let you entertain that cognitive distortion.

What you just expressed is classic **Emotional Avoidance disguised as Rationalization**. You told me your ultimate dream is "${userGoal}", yet you are letting a fleeting momentary sensation derail your lifelong ambition. Poise does not mean never feeling resistance—poise means executing with diamond-grade precision *despite* resistance.

Here is my tough-love prescription: We are not debating this. I demand **just 120 seconds** of focused execution right now. Not an hour. Just two minutes on "${activeModule}". Give me those two minutes, report back, and I will personally restore your full sparkle badge! ⚡`,
      tone: 'tough_love',
      cognitiveDistortion: 'Emotional Avoidance & Hyperbolic Discounting',
      actionSuggestion: {
        type: 'emergency_2min',
        label: 'Start 2-Minute Emergency Focus'
      }
    };
  }

  return {
    reply: `Oh, sweet scholar! 💖 I am so proud of your dedication to the Dream Academy today! 

Remember our motto: *"You can be anything, but only if you show up and do the work."* Your chosen path in **${currentPath}** is tailor-made for your brilliant mind. Every single micro-rep you complete builds your cognitive runway.

Let's maintain this radiant momentum: what is the single next micro-sentence or formula you are writing for **${activeModule}** right now? I am right here at your podium cheering for you! ✨`,
    tone: 'sweet',
    actionSuggestion: {
      type: 'continue_module',
      label: 'Continue Current Dream Module'
    }
  };
}

// Chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, history = [], userContext = {}, forceToughLove = false } = req.body;

  const userReason = userContext.reason || 'Conquering procrastination and achieving excellence';
  const userGoal = userContext.ultimateEndGoal || 'Achieving peak performance with poise';
  const currentPath = userContext.path || 'Academic';
  const activeModule = userContext.currentModuleTitle || 'Foundations';

  if (!aiClient) {
    return res.json(getPersonaResponse(message, userGoal, currentPath, activeModule, forceToughLove));
  }

  try {
    const systemInstruction = `${BARBIE_SYSTEM_PROMPT}
Student Profile Context:
- Path: ${currentPath}
- Reason: ${userReason}
- Ultimate End Goal: ${userGoal}
- Current Active Module: ${activeModule}
- Force Tough Love: ${forceToughLove ? 'YES - the user explicitly confessed stalling or clicked the Tough Love hotline.' : 'Analyze message for excuses or stalling.'}

Always structure your JSON response with:
{
  "reply": string (Barbie's response with rich professorial & therapist tone),
  "tone": "sweet" | "tough_love" | "celebration" | "professor",
  "cognitiveDistortion": string or null (if tough_love, name the psychological distortion e.g. "Perfectionism Paralysis"),
  "actionSuggestion": { "type": "continue_module" | "emergency_2min" | "quiz", "label": string }
}
Respond strictly with valid JSON.
`;

    const formattedContents = [
      ...history.map((h: { sender: string; text: string }) => ({
        role: h.sender === 'barbie' ? 'model' : 'user',
        parts: [{ text: h.text }]
      })),
      {
        role: 'user',
        parts: [{ text: message || (forceToughLove ? "Barbie, I am procrastinating and making excuses. I need your tough love." : "Hello Professor Barbie!") }]
      }
    ];

    const generatePromise = aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      }
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('AI response timed out')), 5000)
    );

    const response = await Promise.race([generatePromise, timeoutPromise]);
    const text = response.text || '{}';
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        reply: text,
        tone: forceToughLove ? 'tough_love' : 'sweet',
        actionSuggestion: {
          type: forceToughLove ? 'emergency_2min' : 'continue_module',
          label: forceToughLove ? 'Start 2-Minute Emergency Focus' : 'Continue Module'
        }
      };
    }

    return res.json(parsed);
  } catch (error) {
    console.warn('Falling back to structured persona response:', error);
    return res.json(getPersonaResponse(message, userGoal, currentPath, activeModule, forceToughLove));
  }
});

// Task evaluation endpoint
app.post('/api/evaluate-task', async (req: Request, res: Response) => {
  try {
    const { moduleTitle, actionPrompt, submission, isQuiz, selectedOptionIndex, correctOptionIndex } = req.body;

    if (isQuiz) {
      const isCorrect = selectedOptionIndex === correctOptionIndex;
      return res.json({
        isCorrect,
        points: isCorrect ? 50 : 15,
        feedback: isCorrect
          ? `Flawless intellectual execution, darling! 💖 That is the exact precision expected of a Dream Academy scholar.`
          : `Not quite, but do not despair! In this academy, missteps are merely diagnostic data. Review the core principle and let’s re-engage with poise!`
      });
    }

    if (!aiClient) {
      return res.json({
        isCorrect: true,
        points: 60,
        feedback: `Magnificent work, scholar! 💖 You showed up, cut through the friction, and articulated your thought with true intellectual glamour. Barbie, Ph.D. approves with distinction! +60 Dream Points awarded!`
      });
    }

    const generatePromise = aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Evaluate this student submission for Barbie Academy:
Module: "${moduleTitle}"
Prompt: "${actionPrompt}"
Student's Output: "${submission}"

Provide an evaluation as Barbie, Ph.D. (warm professor & high-expectation mentor).
Return JSON:
{
  "isCorrect": boolean (true if genuine effort given),
  "points": number (between 40 and 80),
  "feedback": string (articulate praise or sharp gentle refinement)
}`
            }
          ]
        }
      ],
      config: {
        responseMimeType: 'application/json'
      }
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('AI response timed out')), 5000)
    );

    const response = await Promise.race([generatePromise, timeoutPromise]);
    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error) {
    console.warn('Falling back to default positive evaluation:', error);
    return res.json({
      isCorrect: true,
      points: 60,
      feedback: 'Magnificent execution, scholar! 💖 You showed up, cut through the friction, and articulated your thought with true intellectual glamour. Barbie, Ph.D. approves with distinction! +60 Dream Points awarded!'
    });
  }
});

// Mount Vite or static server
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`💖 The Barbie Academy Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
