import React from 'react';
import { BookOpen, Award, Flame, Sparkles, Volume2, VolumeX, User } from 'lucide-react';
import { StudentProfile, MasteryLevel } from '../types';
import { LEVEL_DEFINITIONS } from '../data/literaverseData';

interface NavbarProps {
  profile: StudentProfile;
  onOpenPassport: () => void;
  activeView: 'map' | 'worlds' | 'writer' | 'abjad' | 'bedah';
  setActiveView: (view: 'map' | 'worlds' | 'writer' | 'abjad' | 'bedah') => void;
  audioEnabled: boolean;
  setAudioEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenPassport,
  activeView,
  setActiveView,
  audioEnabled,
  setAudioEnabled,
}) => {
  const currentLevelInfo = LEVEL_DEFINITIONS[profile.level];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveView('map')}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-200 transform hover:scale-105 transition-all">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 bg-clip-text text-transparent">
                  Literaverse
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 hidden sm:inline-block">
                  Literasi SD
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Petualangan Membangun Makna & AKM</p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveView('map')}
              className={`flex items-center space-x-1.5 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'map'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span>🗺️</span>
              <span>Peta Misi</span>
            </button>

            <button
              onClick={() => setActiveView('worlds')}
              className={`flex items-center space-x-1.5 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'worlds'
                  ? 'bg-white text-emerald-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span>📚</span>
              <span>6 Dunia Teks</span>
            </button>

            <button
              onClick={() => setActiveView('writer')}
              className={`flex items-center space-x-1.5 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'writer'
                  ? 'bg-white text-rose-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span>✍️</span>
              <span>Writer Studio</span>
            </button>

            <button
              onClick={() => setActiveView('bedah')}
              className={`flex items-center space-x-1.5 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'bedah'
                  ? 'bg-white text-indigo-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span>🔍</span>
              <span>Bedah Teks</span>
            </button>

            <button
              onClick={() => setActiveView('abjad')}
              className={`flex items-center space-x-1.5 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeView === 'abjad'
                  ? 'bg-white text-indigo-800 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span>🔤</span>
              <span>Menulis Abjad</span>
            </button>
          </nav>

          {/* Right Actions: Level Indicator & Passport Modal */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Audio Toggle */}
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              title={audioEnabled ? 'Audio Pembaca Aktif' : 'Audio Pembaca Mati'}
              className={`p-2.5 rounded-xl border transition-all ${
                audioEnabled
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {audioEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Student Passport Trigger Button */}
            <button
              onClick={onOpenPassport}
              className="flex items-center space-x-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white pl-2.5 pr-3.5 py-1.5 rounded-2xl hover:shadow-lg transition-all transform hover:-translate-y-0.5 border border-slate-700"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold shadow-xs">
                {profile.avatar}
              </div>
              
              <div className="text-left hidden sm:block">
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-bold text-white truncate max-w-[90px]">
                    {profile.name}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-300">
                    {currentLevelInfo.emoji}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-300">
                  <span className="text-amber-300 font-bold flex items-center">
                    <Sparkles className="w-3 h-3 mr-0.5 inline" /> {profile.totalXp} XP
                  </span>
                  <span>•</span>
                  <span className="text-orange-400 font-medium flex items-center">
                    <Flame className="w-3 h-3 mr-0.5 inline" /> {profile.streakDays}d
                  </span>
                </div>
              </div>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
