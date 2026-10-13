import { SkillTreeLevel, PathId, BadgeDefinition } from '../types';

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'first_step',
    title: 'First Step to Stardom',
    subtitle: 'Completed your very first Dream Module',
    category: 'Milestone',
    icon: '✨',
    color: 'from-pink-400 to-rose-400',
  },
  {
    id: 'anti_stall',
    title: 'Excuse-Proof Tiara',
    subtitle: 'Conquered procrastination via the 2-Minute Tough-Love Protocol',
    category: 'Accountability',
    icon: '👑',
    color: 'from-fuchsia-500 to-pink-500',
  },
  {
    id: 'quiz_master',
    title: 'Phi Beta Barbie',
    subtitle: 'Aced a micro-quiz on the first attempt with flying colors',
    category: 'Intellect',
    icon: '🎓',
    color: 'from-amber-400 to-pink-400',
  },
  {
    id: 'streak_3',
    title: 'Unstoppable Momentum',
    subtitle: 'Maintained discipline across 3 active sessions',
    category: 'Milestone',
    icon: '🔥',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'level_1_complete',
    title: 'Foundations of Glamour',
    subtitle: 'Fully mastered Level 1: Foundations',
    category: 'Milestone',
    icon: '💖',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'poise_mastery',
    title: 'Doctor of Poise',
    subtitle: 'Unlocked advanced execution without stalling',
    category: 'Poise',
    icon: '💎',
    color: 'from-pink-400 to-purple-500',
  },
];

export const PATH_CURRICULUMS: Record<PathId, SkillTreeLevel[]> = {
  literature: [
    {
      levelNumber: 1,
      title: 'Level 1: Foundations of Deep Reading',
      theme: 'Curation & Syntopic Framing',
      tagline: 'Before diving in, calibrate your cognitive apparatus with high glamour.',
      modules: [
        {
          id: 'lit-1-1',
          levelNumber: 1,
          moduleNumber: 1,
          title: 'The Inspectional Skim',
          subtitle: 'Grasping the architecture in 120 seconds',
          type: 'micro_lesson',
          xp: 50,
          summary: 'Elite scholars do not read blindly from page one. We read the structural spine first.',
          deepDive: 'Inspectional reading (Mortimer Adler) requires examining the table of contents, preface, and concluding chapter summaries before committing. This primes your mental model so working memory is not overloaded.',
          actionPrompt: 'Name the book you are studying, and write in ONE sentence what the author’s primary thesis or core dilemma is.',
          quiz: {
            question: 'What is the primary psychological purpose of inspectional skimming?',
            options: [
              'To avoid reading the difficult chapters altogether',
              'To build an overarching cognitive schema before granular processing',
              'To speed-read without retaining nuance',
              'To impress dinner guests with book titles'
            ],
            correctIndex: 1,
            explanation: 'Correct, brilliant darling! A cognitive schema allows your brain to anchor details as you read, cutting down comprehension fatigue dramatically.'
          },
          twoMinuteShortcut: 'Open your book, read the back cover and table of contents, and write down the single key theme in 20 words.',
          barbieAdvice: 'Darling, true sophistication is knowing the layout of the palace before walking into the ballroom. Inspect first!'
        },
        {
          id: 'lit-1-2',
          levelNumber: 1,
          moduleNumber: 2,
          title: 'Marginalia & Dialogue',
          subtitle: 'Active marginal notations that stimulate retention',
          type: 'action_task',
          xp: 60,
          summary: 'Passive reading is intellectual vanity. Active marginalia is conversing with greatness.',
          deepDive: 'Use the 3-symbol method: ★ for pivotal paradigm shifts, ? for contentions you dispute, and ➔ for direct applications to your own life.',
          actionPrompt: 'Open a difficult passage or article right now. Jot down 2 short marginal notes: one insight you love and one objection you have.',
          twoMinuteShortcut: 'Write down 1 quote from your current reading and your sharp 1-sentence rebuttal.',
          barbieAdvice: 'Never let an author intimidate you. You are entering this intellectual salon as an equal partner.'
        },
        {
          id: 'lit-1-3',
          levelNumber: 1,
          moduleNumber: 3,
          title: 'Foundational Retention Quiz',
          subtitle: 'Verifying active recall protocols',
          type: 'quiz',
          xp: 75,
          summary: 'Testing your retention protocols before we unlock analytical synthesis.',
          deepDive: 'Feynman retrieval outperforms passive re-reading by 300% in long-term retention benchmarks.',
          actionPrompt: 'Pass this diagnostic quiz to claim your Level 1 Scholar badge.',
          quiz: {
            question: 'Why does passive re-reading create the “Illusion of Competence”?',
            options: [
              'Because familiar text feels fluent without requiring retrieval effort',
              'Because the font size alters optic nerve stimulation',
              'Because our memory naturally decays every 10 minutes',
              'Because books are inherently obsolete'
            ],
            correctIndex: 0,
            explanation: 'Flawless analysis! Fluency of recognition mimics true mastery, which is why testing yourself through active recall is non-negotiable.'
          },
          twoMinuteShortcut: 'Close your eyes and recite aloud the 3 key takeaways from your last reading session.',
          barbieAdvice: 'A quick quiz keeps your mind razor-sharp. Wear your intellect like bespoke couture!'
        }
      ]
    },
    {
      levelNumber: 2,
      title: 'Level 2: Analytical Syntopics',
      theme: 'Cross-Textual Comparative Analysis',
      tagline: 'Weave diverse philosophies into your own coherent worldview.',
      modules: [
        {
          id: 'lit-2-1',
          levelNumber: 2,
          moduleNumber: 1,
          title: 'Syntopic Dialectic',
          subtitle: 'Pitting two masters against each other',
          type: 'micro_lesson',
          xp: 80,
          summary: 'Syntopic reading looks at multiple authors addressing the same philosophical question.',
          deepDive: 'Rather than following the author’s terms, you establish your own vocabulary and force both texts to answer your central inquiry.',
          actionPrompt: 'Compare two perspectives on a single theme you care about (e.g. ambition vs tranquility) and formulate your verdict.',
          quiz: {
            question: 'In syntopic reading, who sets the terms of the conversation?',
            options: [
              'The most famous author',
              'The publisher and critics',
              'You, the discerning reader',
              'The chronological order of history'
            ],
            correctIndex: 2,
            explanation: 'Exactly right! As Barbie, Ph.D. always teaches: you are the intellectual moderator in this dialogue.'
          },
          twoMinuteShortcut: 'Summarize how two different thinkers would answer: "What makes life truly meaningful?"',
          barbieAdvice: 'True poise means you hold court between giants.'
        },
        {
          id: 'lit-2-2',
          levelNumber: 2,
          moduleNumber: 2,
          title: 'The Commonplace Book',
          subtitle: 'Building your personal archive of wisdom',
          type: 'action_task',
          xp: 90,
          summary: 'Cultivate an exquisite indexed catalog of timeless quotes, arguments, and mental models.',
          deepDive: 'Ryan Holiday and Marcus Aurelius both used commonplace notebooks. Organize by thematic tags rather than chronology.',
          actionPrompt: 'Add your top 3 golden insights into your notes and tag each with a specific life action.',
          twoMinuteShortcut: 'Select 1 striking sentence from memory or notes that sparks immediate inspiration.',
          barbieAdvice: 'An organized commonplace archive is the ultimate accessory for the modern intellectual.'
        }
      ]
    },
    {
      levelNumber: 3,
      title: 'Level 3: Intellectual Mastery & Prose',
      theme: 'Original Thesis Formulation',
      tagline: 'Translate deep reading into peerless original contribution.',
      modules: [
        {
          id: 'lit-3-1',
          levelNumber: 3,
          moduleNumber: 1,
          title: 'The Capstone Critical Essay',
          subtitle: 'Publishing your definitive critique',
          type: 'capstone',
          xp: 150,
          summary: 'Synthesize everything you have read into a 500-word manifesto or persuasive essay.',
          deepDive: 'Clear writing equals clear thinking. Strip away extraneous jargon and deliver pure, sparkling intellectual force.',
          actionPrompt: 'Draft your opening thesis paragraph with conviction and high style.',
          twoMinuteShortcut: 'Draft a 2-sentence thesis statement that takes an unexpected stance.',
          barbieAdvice: 'You have done the work, darling. Now show the world what happens when beauty meets brilliance!'
        }
      ]
    }
  ],

  academic: [
    {
      levelNumber: 1,
      title: 'Level 1: Academic Foundations & Focus',
      theme: 'Defeating Cognitive Overload',
      tagline: 'Transform chaotic study marathons into high-yield, glamorous focus blocks.',
      modules: [
        {
          id: 'acad-1-1',
          levelNumber: 1,
          moduleNumber: 1,
          title: 'The 25/5 Pomodoro with Poise',
          subtitle: 'High-energy, single-task deep focus',
          type: 'micro_lesson',
          xp: 50,
          summary: 'Multi-tasking is an illusion that drains cognitive glucose. Single-tasking is pure luxury.',
          deepDive: 'The brain experiences "attention residue" when switching contexts. A disciplined 25-minute sprint protects working memory and builds intense momentum.',
          actionPrompt: 'State the exact topic/chapter you are studying right now, and banish all tabs except the one in front of you.',
          quiz: {
            question: 'What is “attention residue” according to Cal Newport’s cognitive research?',
            options: [
              'Tiredness after drinking iced coffee',
              'Cognitive bandwidth remaining stuck on a previous task when switching',
              'The dust accumulated on your textbook',
              'The satisfaction of finishing early'
            ],
            correctIndex: 1,
            explanation: 'Splendid! Switching between your phone and study materials leaves mental residue, reducing your processing capacity by up to 40%.'
          },
          twoMinuteShortcut: 'Pick your #1 priority exam or assignment, write it down, and close every irrelevant browser tab.',
          barbieAdvice: 'Darling, you wouldn’t wear mismatched couture, so don’t study with fractured focus!'
        },
        {
          id: 'acad-1-2',
          levelNumber: 1,
          moduleNumber: 2,
          title: 'The Blurting Active Recall Method',
          subtitle: 'Rapid retrieval under zero-pressure conditions',
          type: 'action_task',
          xp: 65,
          summary: 'Close your book and dump everything you remember onto a blank sheet of pink paper.',
          deepDive: 'The blurting technique exposes precise knowledge gaps without the false comfort of recognizing terms in a textbook.',
          actionPrompt: 'Take a blank paper (or notepad), spend 2 minutes writing down every concept you recall from your current unit.',
          twoMinuteShortcut: 'Write 5 key terms from your subject and a 1-phrase definition for each from memory.',
          barbieAdvice: 'Finding out what you don’t know is not failure—it’s the fastest diagnostic tool in our academy.'
        },
        {
          id: 'acad-1-3',
          levelNumber: 1,
          moduleNumber: 3,
          title: 'The Spaced Repetition Matrix',
          subtitle: 'Outsmarting the Ebbinghaus forgetting curve',
          type: 'quiz',
          xp: 75,
          summary: 'Reviewing at expanding intervals turns short-term struggle into permanent cognitive mastery.',
          deepDive: 'Testing yourself after 1 day, 3 days, and 7 days yields exponential durability.',
          actionPrompt: 'Schedule your review intervals and answer this spacing diagnostic.',
          quiz: {
            question: 'When is the optimal time to review a challenging academic concept?',
            options: [
              'Right after you finish reading it for the tenth time',
              'Just as the memory is beginning to fade and requires retrieval effort',
              'The night before the final examination at 3 AM',
              'Never, if you understood it once'
            ],
            correctIndex: 1,
            explanation: 'Magnificent! Desirable difficulty during retrieval is what triggers neural consolidation and dendritic growth.'
          },
          twoMinuteShortcut: 'Add a calendar alert for 3 days from now to review today’s key formulas or dates.',
          barbieAdvice: 'Cramming is so last season. We build long-term empires with strategic elegance.'
        }
      ]
    },
    {
      levelNumber: 2,
      title: 'Level 2: High-Yield Synthesis & Problem Sets',
      theme: 'Mastering Hard STEM & Humanities',
      tagline: 'Attack difficult problem sets with professorial precision.',
      modules: [
        {
          id: 'acad-2-1',
          levelNumber: 2,
          moduleNumber: 1,
          title: 'The Feynman Explanation Protocol',
          subtitle: 'Teaching complex proofs to a 10-year-old',
          type: 'action_task',
          xp: 85,
          summary: 'If you cannot explain a concept using simple, vibrant language, you do not truly understand it.',
          deepDive: 'Strip away jargon. Use vivid analogies and intuitive causality.',
          actionPrompt: 'Take your toughest concept (e.g. mitosis, supply elasticity, or constitutional law) and explain it in 3 clear sentences.',
          twoMinuteShortcut: 'Write a 2-sentence analogy explaining your hardest topic using an everyday scenario.',
          barbieAdvice: 'True intelligence is making the complex look effortless and gorgeous.'
        },
        {
          id: 'acad-2-2',
          levelNumber: 2,
          moduleNumber: 2,
          title: 'Timed Past-Paper Drills',
          subtitle: 'Simulating high-stakes examination poise',
          type: 'quiz',
          xp: 100,
          summary: 'Conditioning your nervous system to stay poised and relaxed under strict time pressure.',
          deepDive: 'Anxiety drops when exam conditions are rehearsed routinely.',
          actionPrompt: 'Complete a timed challenge problem and evaluate your psychological poise.',
          quiz: {
            question: 'What is the most effective psychological tactic when hitting an unfamiliar question on a test?',
            options: [
              'Panic and second-guess all prior answers',
              'Take a slow physiological sigh, circle the core question stem, and break it into known sub-parts',
              'Leave the exam hall immediately',
              'Spend 25 minutes staring without writing'
            ],
            correctIndex: 1,
            explanation: 'Spot on! The physiological sigh resets sympathetic arousal, allowing your prefrontal cortex to re-engage.'
          },
          twoMinuteShortcut: 'Do 2 deep physiological sighs (two quick inhales through the nose, long exhale through mouth) right now.',
          barbieAdvice: 'Poise under pressure is the crowning jewel of a true Dream Academy scholar.'
        }
      ]
    },
    {
      levelNumber: 3,
      title: 'Level 3: Summa Cum Laude Performance',
      theme: 'Peak Academic Execution',
      tagline: 'Claim your top honors with grace and unshakeable mastery.',
      modules: [
        {
          id: 'acad-3-1',
          levelNumber: 3,
          moduleNumber: 1,
          title: 'The Honors Defense & Final Synthesis',
          subtitle: 'Showcasing full mastery of your curriculum',
          type: 'capstone',
          xp: 200,
          summary: 'Review your complete roadmap, compile your golden cheat-sheet, and declare academic triumph.',
          deepDive: 'Synthesize all units into a 1-page visual executive summary.',
          actionPrompt: 'Summarize the 3 core pillars of your course and celebrate your mastery with Barbie, Ph.D.!',
          twoMinuteShortcut: 'List the 3 highest-weight topics you must ace and verify you have flashcards for each.',
          barbieAdvice: 'You are capable of being at the top of your class. Hold your head high and claim your degree!'
        }
      ]
    }
  ],

  career: [
    {
      levelNumber: 1,
      title: 'Level 1: Executive Foundations',
      theme: 'High-Impact Prioritization',
      tagline: 'Stop drowning in low-value busywork. Step into your executive aura.',
      modules: [
        {
          id: 'car-1-1',
          levelNumber: 1,
          moduleNumber: 1,
          title: 'The Eisenhower Glam Matrix',
          subtitle: 'Distinguishing urgent noise from career-defining impact',
          type: 'micro_lesson',
          xp: 50,
          summary: 'Answering emails all day feels productive, but it builds other people’s dreams, not yours.',
          deepDive: 'Quadrant 2 (Important but Not Urgent) is where promotions, patents, and visionary career steps are born.',
          actionPrompt: 'Identify the ONE career-defining deliverable that would move the needle most this week.',
          quiz: {
            question: 'Why do high-achievers frequently fall into the “Urgency Trap”?',
            options: [
              'Urgent tasks provide fast dopamine hits despite generating low long-term leverage',
              'Bosses only reward answering instant messages',
              'Planning requires too much paper',
              'Important tasks are illegal'
            ],
            correctIndex: 0,
            explanation: 'Bullseye! Urgent trivia triggers quick dopamine, whereas deep strategic work requires cognitive grit. We choose leverage, darling!'
          },
          twoMinuteShortcut: 'Write down your #1 most important project and identify 1 micro-task you can finish in 10 minutes.',
          barbieAdvice: 'You are the CEO of your own destiny. Dress your calendar like a board member!'
        },
        {
          id: 'car-1-2',
          levelNumber: 1,
          moduleNumber: 2,
          title: 'The Deep Work Morning Moat',
          subtitle: 'Protecting your prime 90 minutes of executive flow',
          type: 'action_task',
          xp: 65,
          summary: 'Block 90 uninterrupted minutes before checking Slack or incoming requests.',
          deepDive: 'Your prefrontal cortex is at peak clarity in the first hours of the day. Protect it with ruthless elegance.',
          actionPrompt: 'Set your calendar for tomorrow morning: 90 minutes of dedicated building with notifications silenced.',
          twoMinuteShortcut: 'Turn on "Do Not Disturb" on your phone and close your email client right now.',
          barbieAdvice: 'Boundaries are the ultimate form of self-respect. Let them wait while you craft brilliance.'
        },
        {
          id: 'car-1-3',
          levelNumber: 1,
          moduleNumber: 3,
          title: 'Executive Communication Quiz',
          subtitle: 'High-leverage conciseness and boardroom poise',
          type: 'quiz',
          xp: 75,
          summary: 'How you frame your updates dictates how leadership perceives your command.',
          deepDive: 'Use BLUF: Bottom Line Up Front. State the decision or result before the backstory.',
          actionPrompt: 'Master executive brevity by passing this scenario quiz.',
          quiz: {
            question: 'What is the most effective way to brief an executive or stakeholder?',
            options: [
              'Send a 6-paragraph email detailing every meeting and personal frustration',
              'Lead with the conclusion/decision requested (BLUF), followed by 3 concise data points',
              'Wait until they ask you three times before giving an update',
              'Use ambiguous language so nobody holds you accountable'
            ],
            correctIndex: 1,
            explanation: 'Exemplary executive presence! BLUF demonstrates high respect for everyone’s time and signals instant authority.'
          },
          twoMinuteShortcut: 'Review your last drafted email or message and cut 30% of unnecessary filler words.',
          barbieAdvice: 'Poise is saying what matters with crystalline clarity and sparkling confidence.'
        }
      ]
    },
    {
      levelNumber: 2,
      title: 'Level 2: Strategic Leverage & Influence',
      theme: 'Scaling Your Output & Reputation',
      tagline: 'Multiply your impact through systems, delegation, and executive presence.',
      modules: [
        {
          id: 'car-2-1',
          levelNumber: 2,
          moduleNumber: 1,
          title: 'Systematizing Your Playbook',
          subtitle: 'Turning one-off tasks into reusable templates',
          type: 'action_task',
          xp: 85,
          summary: 'If you do a task more than twice, create a SOP (Standard Operating Procedure).',
          deepDive: 'Systems build freedom. Document your workflows so you can operate at 10x speed.',
          actionPrompt: 'Draft a 3-step checklist for a recurring process you handle weekly.',
          twoMinuteShortcut: 'List the 3 steps of your most frequent workflow into a quick bulleted template.',
          barbieAdvice: 'Work smart, look stunning, and build systems that work for you.'
        },
        {
          id: 'car-2-2',
          levelNumber: 2,
          moduleNumber: 2,
          title: 'The Art of the Strategic "No"',
          subtitle: 'Saying no to distractions so you can say yes to greatness',
          type: 'quiz',
          xp: 90,
          summary: 'Every time you say yes to a low-priority request, you say no to your ultimate goal.',
          deepDive: 'Polite, firm declining preserves your energy for high-impact achievements.',
          actionPrompt: 'Refine your boundary articulation with this executive check.',
          quiz: {
            question: 'Which response conveys high professionalism when turning down non-essential work?',
            options: [
              '"I\'m too busy and overwhelmed, leave me alone."',
              '"I\'d love to help, but given my primary focus on delivering [Core Project], I cannot take this on without compromising quality."',
              '"Sure, I guess I\'ll do it and complain about it later."',
              'Ignore the message for two weeks.'
            ],
            correctIndex: 1,
            explanation: 'Magnificent! Linking your refusal directly to safeguarding high-priority business outcomes shows supreme maturity.'
          },
          twoMinuteShortcut: 'Identify 1 commitment on your plate that is not moving your needle and draft a polite decline.',
          barbieAdvice: 'A gracious "no" protects your crown.'
        }
      ]
    },
    {
      levelNumber: 3,
      title: 'Level 3: C-Suite Mastery & Leadership',
      theme: 'Visionary Career Triumph',
      tagline: 'Own the boardroom with undeniable excellence and ethical leadership.',
      modules: [
        {
          id: 'car-3-1',
          levelNumber: 3,
          moduleNumber: 1,
          title: 'The Presidential Career Capstone',
          subtitle: 'Your 12-month visionary career roadmap',
          type: 'capstone',
          xp: 200,
          summary: 'Chart your next promotion, venture, or landmark achievement with strategic ambition.',
          deepDive: 'Set clear OKRs (Objectives and Key Results) paired with accountability check-ins.',
          actionPrompt: 'Write down your 12-month ambition and the immediate next milestone for this quarter.',
          twoMinuteShortcut: 'Write down the title or milestone you will hold 1 year from today.',
          barbieAdvice: 'The world is waiting for leaders with intellect, compassion, and bold style. Shine bright!'
        }
      ]
    }
  ],

  creative: [
    {
      levelNumber: 1,
      title: 'Level 1: Unlocking Creative Flow',
      theme: 'Overcoming the Blank Canvas Terror',
      tagline: 'Silence your inner perfectionist and unleash your sparkling imagination.',
      modules: [
        {
          id: 'cre-1-1',
          levelNumber: 1,
          moduleNumber: 1,
          title: 'The "Ugly First Draft" Permission',
          subtitle: 'Separating generation from editorial critique',
          type: 'micro_lesson',
          xp: 50,
          summary: 'Perfectionism is merely anxiety in a designer dress. You cannot edit what does not exist.',
          deepDive: 'Writing/creating and editing use diametrically opposed cognitive networks. Trying to do both at once causes creative paralysis.',
          actionPrompt: 'Write or outline 150 messy, unfiltered words or sketch your raw initial idea without backspacing.',
          quiz: {
            question: 'Why does editing while creating shut down creative momentum?',
            options: [
              'Because the pen runs out of ink faster',
              'Because the critical dorsolateral prefrontal cortex inhibits generative associative flow',
              'Because paper gets crumpled',
              'Because grammar is totally unimportant'
            ],
            correctIndex: 1,
            explanation: 'Pure neuroscience, darling! Generative flow requires lowering self-censorship. Polish later, create now!'
          },
          twoMinuteShortcut: 'Set a 120-second timer and write continuously without hitting delete or backspace once.',
          barbieAdvice: 'A messy draft is like fabric before tailoring. You need the raw cloth first, darling!'
        },
        {
          id: 'cre-1-2',
          levelNumber: 1,
          moduleNumber: 2,
          title: 'The Moodboard & Aesthetic Anchor',
          subtitle: 'Collecting sensory inspirations before execution',
          type: 'action_task',
          xp: 65,
          summary: 'Curate 3 visceral references: a color palette, a soundtrack, and a masterwork style.',
          deepDive: 'Sensory priming stimulates the default mode network to make unexpected, brilliant connections.',
          actionPrompt: 'Describe the exact emotional tone, visual style, or rhythm your creative piece will embody.',
          twoMinuteShortcut: 'Write down 3 adjectives that describe the exact vibe of your creative project.',
          barbieAdvice: 'Every masterpiece begins with an intoxicating vision. Make yours unforgettable!'
        },
        {
          id: 'cre-1-3',
          levelNumber: 1,
          moduleNumber: 3,
          title: 'Creative Habit Architecture',
          subtitle: 'Consistency over erratic bursts of inspiration',
          type: 'quiz',
          xp: 75,
          summary: 'Amateurs wait for inspiration; professionals schedule the muse to arrive every day at 9 AM.',
          deepDive: 'Ritualized starts (same desk, same tea, same cue) reduce friction by 80%.',
          actionPrompt: 'Cement your creative habit triggers with this diagnostic check.',
          quiz: {
            question: 'What separates professional creators from romantic hobbyists?',
            options: [
              'Professionals rely on sudden emotional lightning strikes',
              'Professionals build consistent ritualized output habits regardless of mood',
              'Professionals never experience self-doubt',
              'Professionals have more glitter'
            ],
            correctIndex: 1,
            explanation: 'Brilliant! Showing up consistently is how the muse learns where to find you. Poise is showing up even when you don’t feel like it.'
          },
          twoMinuteShortcut: 'Define your creative ritual: "Every day at [time], after [cue], I create for 20 minutes."',
          barbieAdvice: 'Discipline is the glamorous wand that turns daydreams into dazzling reality.'
        }
      ]
    },
    {
      levelNumber: 2,
      title: 'Level 2: Narrative Tension & Polishing',
      theme: 'Elevating Raw Ideas into Masterpieces',
      tagline: 'Structure, pacing, and glamorous stylistic flourishes.',
      modules: [
        {
          id: 'cre-2-1',
          levelNumber: 2,
          moduleNumber: 1,
          title: 'The Conflict-Resolution Arc',
          subtitle: 'Hooking your audience from the opening beat',
          type: 'action_task',
          xp: 85,
          summary: 'Every story, design, or song is about tension looking for release.',
          deepDive: 'Introduce the core stakes within the first 10% of the piece.',
          actionPrompt: 'What is at stake for your protagonist or user? Write the core conflict in 2 punchy sentences.',
          twoMinuteShortcut: 'Write the turning point sentence of your narrative or design concept.',
          barbieAdvice: 'Tension is what makes the catwalk captivating. Build suspense with style!'
        },
        {
          id: 'cre-2-2',
          levelNumber: 2,
          moduleNumber: 2,
          title: 'The Ruthless Red-Pen Polish',
          subtitle: 'Trimming the darling flab with diamond precision',
          type: 'quiz',
          xp: 90,
          summary: 'Kill your darlings if they don’t serve the overall composition.',
          deepDive: 'Stephen King suggests cutting 10% of your first draft during revision.',
          actionPrompt: 'Identify and prune the fluff with this editing checkpoint.',
          quiz: {
            question: 'What is the golden rule of diamond-grade editing?',
            options: [
              'Add three adjectives to every single noun',
              'Remove every sentence or element that does not advance the core emotional or narrative purpose',
              'Never change a single word once written',
              'Make the font as small as possible'
            ],
            correctIndex: 1,
            explanation: 'Spot-on! Elegance is not when there is nothing left to add, but when there is nothing left to take away.'
          },
          twoMinuteShortcut: 'Find 1 paragraph or element in your project and cut 3 filler words or lines right now.',
          barbieAdvice: 'Pruning makes the rose garden bloom with breathtaking intensity.'
        }
      ]
    },
    {
      levelNumber: 3,
      title: 'Level 3: Gallery Debut & Exhibition',
      theme: 'Sharing Your Art with the World',
      tagline: 'Step into the spotlight and share your work fearlessly.',
      modules: [
        {
          id: 'cre-3-1',
          levelNumber: 3,
          moduleNumber: 1,
          title: 'The Grand Exhibition Capstone',
          subtitle: 'Publishing, shipping, and owning your brilliance',
          type: 'capstone',
          xp: 200,
          summary: 'A project is not complete until it encounters an audience. Ship it with pride.',
          deepDive: 'Overcome the fear of critique. True artists stand boldly behind their vision.',
          actionPrompt: 'Present your completed creative piece or plan your public launch with Barbie, Ph.D.!',
          twoMinuteShortcut: 'Write down who you will share your creative piece with first today.',
          barbieAdvice: 'You were born to shine. Let the spotlight fall upon your brilliant creation!'
        }
      ]
    }
  ],

  custom: [
    {
      levelNumber: 1,
      title: 'Level 1: Custom Goal Foundations',
      theme: 'Target Calibration & Habit Stacking',
      tagline: 'Deconstruct your ambitious custom vision into micro-victories.',
      modules: [
        {
          id: 'cus-1-1',
          levelNumber: 1,
          moduleNumber: 1,
          title: 'The Keystone Habit Calibration',
          subtitle: 'Finding the lead domino that triggers cascade success',
          type: 'micro_lesson',
          xp: 50,
          summary: 'Focusing on 10 goals fails. Nailing 1 keystone habit makes everything else easier.',
          deepDive: 'A keystone habit (like morning journaling or daily 20-minute reps) reconfigures your self-identity from "aspiring" to "practicing".',
          actionPrompt: 'What is the single highest-impact daily micro-action for your custom path?',
          quiz: {
            question: 'What defines a "Keystone Habit" in behavioral psychology?',
            options: [
              'A habit that is excessively difficult to start',
              'A routine that triggers widespread positive changes across other behaviors',
              'A habit you only do once a year',
              'A physical brass key you carry around'
            ],
            correctIndex: 1,
            explanation: 'Marvelous darling! Charles Duhigg discovered that keystone habits create a ripple effect, building unshakeable momentum.'
          },
          twoMinuteShortcut: 'Write down your single keystone daily micro-action in 10 words or fewer.',
          barbieAdvice: 'Darling, find the lead domino and watch the rest of the obstacles tumble with grace.'
        },
        {
          id: 'cus-1-2',
          levelNumber: 1,
          moduleNumber: 2,
          title: 'Friction Elimination Audit',
          subtitle: 'Removing micro-obstacles that invite procrastination',
          type: 'action_task',
          xp: 65,
          summary: 'Reduce friction for good habits to 20 seconds, and increase friction for vices.',
          deepDive: 'Set up your workspace the night before so starting requires zero activation energy.',
          actionPrompt: 'Identify 1 friction point slowing your custom goal, and eliminate it right now.',
          twoMinuteShortcut: 'Lay out or open the tools you need for your custom goal so you are ready in 2 seconds.',
          barbieAdvice: 'Clear the runway, sweet scholar, and watch how quickly you take flight.'
        },
        {
          id: 'cus-1-3',
          levelNumber: 1,
          moduleNumber: 3,
          title: 'Accountability Protocol Check',
          subtitle: 'Installing high-expectation feedback loops',
          type: 'quiz',
          xp: 75,
          summary: 'Without immediate accountability, the human mind discounts future consequences.',
          deepDive: 'Social commitment and coach check-ins elevate completion rates from 35% to 95%.',
          actionPrompt: 'Solidify your commitment framework.',
          quiz: {
            question: 'Why does hyperbolic discounting sabotage our long-term goals?',
            options: [
              'Because humans are naturally hyperactive',
              'Because the brain values immediate comfort significantly higher than distant rewards',
              'Because calendars only track 30 days',
              'Because math is difficult'
            ],
            correctIndex: 1,
            explanation: 'Precisely! Hyperbolic discounting tricks you into choosing cheap comfort today. That is why Barbie, Ph.D. is here to keep you accountable!'
          },
          twoMinuteShortcut: 'Send or commit a quick message to your coach confirming your commitment today.',
          barbieAdvice: 'We do not trade long-term glory for momentary comfort. High expectations bring high rewards!'
        }
      ]
    },
    {
      levelNumber: 2,
      title: 'Level 2: Consistent Velocity & Adaptation',
      theme: 'Overcoming Plateaus & Resistance',
      tagline: 'When resistance strikes, deploy psychological grit wrapped in poise.',
      modules: [
        {
          id: 'cus-2-1',
          levelNumber: 2,
          moduleNumber: 1,
          title: 'The 2-Minute Rule Against Resistance',
          subtitle: 'Shrinking the threshold of starting to zero',
          type: 'action_task',
          xp: 85,
          summary: 'When you feel dread or hesitation, tell yourself: "I will only do 2 minutes."',
          deepDive: '90% of the psychological friction is in the transition phase. Once you begin, inertia works in your favor.',
          actionPrompt: 'Pick a task you have avoided this week, and do literally 2 minutes of it right now.',
          twoMinuteShortcut: 'Open the file or project and write just 1 sentence or take 1 step.',
          barbieAdvice: 'Action precedes motivation, darling. Move first, the passion will follow!'
        },
        {
          id: 'cus-2-2',
          levelNumber: 2,
          moduleNumber: 2,
          title: 'Tracking Metrics with Elegance',
          subtitle: 'What gets measured gets perfected',
          type: 'quiz',
          xp: 90,
          summary: 'Track input metrics (hours, reps, pages) rather than obsessing over lagging outcome metrics.',
          deepDive: 'You cannot control the weather or market, but you can control your daily focused reps.',
          actionPrompt: 'Verify your metric tracking strategy.',
          quiz: {
            question: 'What is the main advantage of tracking "Lead Metrics" over "Lag Metrics"?',
            options: [
              'Lead metrics are under your direct daily control and predict future success',
              'Lead metrics take longer to calculate',
              'Lag metrics are more colorful',
              'There is no difference'
            ],
            correctIndex: 0,
            explanation: 'Stellar comprehension! Focus on your daily inputs, and the magnificent outcomes will take care of themselves.'
          },
          twoMinuteShortcut: 'Write down your 1 daily lead metric (e.g. "30 mins of code", "500 words", "2 calls").',
          barbieAdvice: 'Keep your score with pride, darling. Excellence loves clarity!'
        }
      ]
    },
    {
      levelNumber: 3,
      title: 'Level 3: Custom Path Triumph',
      theme: 'Mastery and Sustained Transformation',
      tagline: 'You have done the work. Now celebrate your crowning achievement.',
      modules: [
        {
          id: 'cus-3-1',
          levelNumber: 3,
          moduleNumber: 1,
          title: 'The Dream Academy Graduation',
          subtitle: 'Embodying the Barbie Ph.D. philosophy for life',
          type: 'capstone',
          xp: 200,
          summary: 'Reflect upon your initial baseline and witness how discipline has transformed your reality.',
          deepDive: 'You can be anything, because you showed up and did the work.',
          actionPrompt: 'Submit your graduation manifesto and receive your honors from Barbie, Ph.D.!',
          twoMinuteShortcut: 'Reflect on how far you have come since day 1 and give yourself well-deserved credit.',
          barbieAdvice: 'Look in the mirror, my darling. You are smart, capable, ambitious, and victorious!'
        }
      ]
    }
  ]
};

export const PATH_OPTIONS = [
  {
    id: 'literature' as PathId,
    code: 'A' as const,
    title: 'Literature & Deep Reading',
    subtitle: 'Syntopic analysis, marginalia, and classical rhetoric',
    icon: '📚',
    exampleGoal: 'Read 20 seminal philosophy books and master analytical marginalia'
  },
  {
    id: 'academic' as PathId,
    code: 'B' as const,
    title: 'Academic & School Studies',
    subtitle: 'Exam prep, STEM mastery, memory matrices, and top honors',
    icon: '🎓',
    exampleGoal: 'Ace my finals and maintain a 4.0 GPA with zero cramming'
  },
  {
    id: 'career' as PathId,
    code: 'C' as const,
    title: 'Professional Work & Career Building',
    subtitle: 'Executive presence, high-leverage output, promotions, and strategic Moats',
    icon: '💼',
    exampleGoal: 'Land the Director role and systematize executive deep work'
  },
  {
    id: 'creative' as PathId,
    code: 'D' as const,
    title: 'Creative Projects & Writing',
    subtitle: 'Overcoming the blank page, drafting manifestos, and launching masterpieces',
    icon: '🎨',
    exampleGoal: 'Finish the 50,000-word draft of my novel without self-doubt'
  },
  {
    id: 'custom' as PathId,
    code: 'E' as const,
    title: 'Custom Focus Path',
    subtitle: 'Tailored for your specific habits, skills, or audacious dream',
    icon: '✨',
    exampleGoal: 'Master foreign language fluency in 90 days with daily discipline'
  }
];
