import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PasporLiterasiModal } from './components/PasporLiterasiModal';
import { AdventureMap } from './components/AdventureMap';
import { WorldSelector } from './components/WorldSelector';
import { TextReaderView } from './components/TextReaderView';
import { WriterStudioView } from './components/WriterStudioView';
import { AbjadCanvasView } from './components/AbjadCanvasView';
import { BedahTeksView } from './components/BedahTeksView';
import { StudentProfile, ReadingContent, MasteryLevel, Badge } from './types';
import { READING_CONTENTS, LEVEL_DEFINITIONS } from './data/literaverseData';

const STORAGE_KEY = 'literaverse_student_profile_v1';

const INITIAL_PROFILE: StudentProfile = {
  name: 'Budi Penjelajah',
  avatar: '👦',
  level: 'Explorer',
  totalXp: 120,
  completedMissions: [],
  completedContents: [],
  badges: [
    {
      id: 'b_welcome',
      name: 'Penjelajah Literaverse',
      icon: '🌱',
      date: '01 Agu 2026',
      description: 'Selamat datang di petualangan literasi SD Literaverse!',
    }
  ],
  akmStats: { totalAnswered: 0, correctAnswers: 0 },
  streakDays: 3,
};

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load profile:', e);
    }
    return INITIAL_PROFILE;
  });

  const [activeView, setActiveView] = useState<'map' | 'worlds' | 'reader' | 'writer' | 'abjad' | 'bedah'>('map');
  const [selectedContent, setSelectedContent] = useState<ReadingContent | null>(null);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save profile to localStorage whenever it updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile:', e);
    }
  }, [profile]);

  // Recalculate student mastery level based on XP thresholds
  const calculateLevelFromXp = (xp: number): MasteryLevel => {
    if (xp >= 1800) return 'Master';
    if (xp >= 1100) return 'Scholar';
    if (xp >= 600) return 'Thinker';
    if (xp >= 250) return 'Adventurer';
    return 'Explorer';
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    showToast('Profil siswa berhasil diperbarui!');
  };

  const handleSelectMissionContent = (contentId: string, missionId: number) => {
    const found = READING_CONTENTS.find((c) => c.id === contentId) || READING_CONTENTS[0];
    setSelectedContent(found);
    setActiveView('reader');

    // Automatically record mission start
    if (!profile.completedMissions.includes(missionId)) {
      setProfile((prev) => ({
        ...prev,
        completedMissions: [...prev.completedMissions, missionId],
      }));
    }
  };

  const handleSelectContentFromWorld = (content: ReadingContent) => {
    setSelectedContent(content);
    setActiveView('reader');
  };

  const handleCompleteContent = (
    contentId: string,
    questionsAnswered: number,
    correctCount: number,
    xpEarned: number
  ) => {
    setProfile((prev) => {
      const isNewContent = !prev.completedContents.includes(contentId);
      const newCompletedContents = isNewContent
        ? [...prev.completedContents, contentId]
        : prev.completedContents;

      const newXp = prev.totalXp + xpEarned;
      const newLevel = calculateLevelFromXp(newXp);

      const newStats = {
        totalAnswered: prev.akmStats.totalAnswered + questionsAnswered,
        correctAnswers: prev.akmStats.correctAnswers + correctCount,
      };

      // Check level up notification
      if (newLevel !== prev.level) {
        showToast(`🎉 Luar Biasa! Kamu Naik Level ke ${LEVEL_DEFINITIONS[newLevel].emoji} ${newLevel}!`);
      } else {
        showToast(`✨ Selamat! +${xpEarned} XP ditambahkan ke Paspor Literasimu!`);
      }

      return {
        ...prev,
        totalXp: newXp,
        level: newLevel,
        completedContents: newCompletedContents,
        akmStats: newStats,
      };
    });
  };

  const handleAwardWriterBadge = (badgeName: string, xpEarned: number) => {
    setProfile((prev) => {
      const alreadyHas = prev.badges.some((b) => b.name === badgeName);
      const newBadges: Badge[] = alreadyHas
        ? prev.badges
        : [
            ...prev.badges,
            {
              id: `b_writer_${Date.now()}`,
              name: badgeName,
              icon: '✍️',
              date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
              description: 'Diraih melalui karya tulis kreatif di Writer World AI.',
            },
          ];

      const newXp = prev.totalXp + xpEarned;
      const newLevel = calculateLevelFromXp(newXp);

      showToast(`🎖️ Lencana Baru Diraih: ${badgeName}! (+${xpEarned} XP)`);

      return {
        ...prev,
        totalXp: newXp,
        level: newLevel,
        badges: newBadges,
      };
    });
  };

  const handleAwardAbjadXp = (xpEarned: number, letterMastered: string) => {
    setProfile((prev) => {
      const newXp = prev.totalXp + xpEarned;
      const newLevel = calculateLevelFromXp(newXp);
      showToast(`✏️ Luar Biasa! Berhasil menulis ${letterMastered} (+${xpEarned} XP)`);
      return {
        ...prev,
        totalXp: newXp,
        level: newLevel,
      };
    });
  };

  const handleAwardBedahXp = (xpEarned: number, textTitle: string) => {
    setProfile((prev) => {
      const newXp = prev.totalXp + xpEarned;
      const newLevel = calculateLevelFromXp(newXp);
      showToast(`🔍 Luar Biasa! Sukses membedah struktur "${textTitle}" (+${xpEarned} XP)`);
      return {
        ...prev,
        totalXp: newXp,
        level: newLevel,
      };
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Top Navbar Header */}
      <Navbar
        profile={profile}
        onOpenPassport={() => setIsPassportOpen(true)}
        activeView={activeView === 'reader' ? 'worlds' : activeView}
        setActiveView={(v) => {
          setSelectedContent(null);
          setActiveView(v);
        }}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {activeView === 'map' && (
          <AdventureMap
            profile={profile}
            onSelectMissionContent={handleSelectMissionContent}
          />
        )}

        {activeView === 'worlds' && (
          <WorldSelector
            contents={READING_CONTENTS}
            profile={profile}
            onSelectContent={handleSelectContentFromWorld}
            onSelectWriterWorld={() => setActiveView('writer')}
          />
        )}

        {activeView === 'reader' && selectedContent && (
          <TextReaderView
            content={selectedContent}
            onBack={() => setActiveView('worlds')}
            profile={profile}
            onCompleteContent={handleCompleteContent}
            audioEnabled={audioEnabled}
          />
        )}

        {activeView === 'writer' && (
          <WriterStudioView
            profile={profile}
            onAwardWriterBadge={handleAwardWriterBadge}
          />
        )}

        {activeView === 'abjad' && (
          <AbjadCanvasView
            profile={profile}
            onAwardXp={handleAwardAbjadXp}
            onBackToMap={() => setActiveView('map')}
          />
        )}

        {activeView === 'bedah' && (
          <BedahTeksView
            profile={profile}
            onAwardXp={handleAwardBedahXp}
            onBackToMap={() => setActiveView('map')}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-slate-800">Literaverse SD</span>
            <span>•</span>
            <span>Meaning Making & Petualangan AKM Literasi SD (Kelas 1-6)</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <span>6 Dunia Teks</span>
            <span>5 Misi Naratif</span>
            <span>Umpan Balik AI</span>
            <span>Level Explorer - Master</span>
          </div>
        </div>
      </footer>

      {/* Student Passport Modal */}
      <PasporLiterasiModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 font-bold text-xs sm:text-sm flex items-center space-x-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
