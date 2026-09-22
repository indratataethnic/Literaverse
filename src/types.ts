export type MasteryLevel = 'Explorer' | 'Adventurer' | 'Thinker' | 'Scholar' | 'Master';

export type WorldType = 'story' | 'information' | 'daily_life' | 'data' | 'communication' | 'writer';

export interface LevelDetails {
  id: MasteryLevel;
  name: string;
  emoji: string;
  gradeLabel: string;
  minXp: number;
  description: string;
  color: string;
  bgGradient: string;
}

export interface WorldDetails {
  id: WorldType;
  name: string;
  subtitle: string;
  iconName: string;
  description: string;
  accentColor: string;
  bannerBg: string;
  competencies: string[];
}

export type QuestionType = 'multiple_choice' | 'multi_select' | 'matching' | 'short_answer';

export interface Question {
  id: string;
  prompt: string;
  type: QuestionType;
  options?: string[];
  correctOptionIndex?: number;
  correctMultiIndices?: number[];
  pairs?: { left: string; right: string }[];
  shortAnswerKeywords?: string[];
  explanation: string;
  skillTested: string;
}

export interface VocabItem {
  word: string;
  meaning: string;
  example: string;
}

export interface ReadingContent {
  id: string;
  world: WorldType;
  level: MasteryLevel;
  title: string;
  subtitle?: string;
  category: string;
  authorOrSource?: string;
  text: string;
  // Special rich components data for Daily Life & Data worlds
  extraData?: {
    type?: 'whatsapp' | 'food_label' | 'ticket' | 'schedule' | 'infographic_chart' | 'announcement';
    chatMessages?: { sender: string; text: string; time: string; isMe?: boolean }[];
    labelDetails?: { title: string; servingSize: string; calories: string; ingredients: string[]; warning?: string };
    ticketDetails?: { passenger: string; train: string; origin: string; destination: string; departure: string; seat: string; gate: string };
    scheduleRows?: { trainName: string; departure: string; arrival: string; status: string }[];
    chartData?: { label: string; value: number; color?: string }[];
  };
  vocabulary: VocabItem[];
  questions: Question[];
  readTimeMinutes: number;
  // Color-coded text structure analysis fields (Ide Pokok, Kalimat Utama, Tokoh Utama, Amanat)
  textAnalysis?: {
    idePokok?: string;
    kalimatUtama?: string;
    tokohUtama?: string;
    amanat?: string;
  };
}

export interface WriterPrompt {
  id: string;
  title: string;
  level: MasteryLevel;
  baseStory: string;
  instruction: string;
  suggestedTasks: { id: 'title' | 'continue' | 'fix' | 'ending' | 'summary'; label: string; placeholder: string }[];
  sampleExample?: string;
}

export interface QuestMission {
  id: number;
  title: string;
  zoneName: string;
  description: string;
  characterName: string;
  characterAvatar: string;
  storyIntro: string;
  targetWorld: WorldType;
  contentId: string;
  rewardBadge: { id: string; name: string; icon: string; description: string };
  xpReward: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  date: string;
  description: string;
}

export interface StudentProfile {
  name: string;
  avatar: string;
  level: MasteryLevel;
  totalXp: number;
  completedMissions: number[];
  completedContents: string[];
  badges: Badge[];
  akmStats: { totalAnswered: number; correctAnswers: number };
  streakDays: number;
}

export interface AIEvaluationResult {
  score: number;
  praise: string;
  improvement: string;
  badgeEarned?: string;
  correctedText?: string;
}
