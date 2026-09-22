import React, { useState } from 'react';
import { Compass, Sparkles, CheckCircle, Lock, Play, ArrowRight, Award, MessageCircle } from 'lucide-react';
import { QuestMission, StudentProfile } from '../types';
import { QUEST_MISSIONS } from '../data/literaverseData';

interface AdventureMapProps {
  profile: StudentProfile;
  onSelectMissionContent: (contentId: string, missionId: number) => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  profile,
  onSelectMissionContent,
}) => {
  const [selectedMission, setSelectedMission] = useState<QuestMission | null>(QUEST_MISSIONS[0]);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Banner Intro */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-emerald-700/50">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/30 backdrop-blur-md border border-emerald-400/40 px-3 py-1 rounded-full text-xs font-bold text-emerald-200">
            <Compass className="w-4 h-4 text-emerald-300 animate-spin-slow" />
            <span>Peta Petualangan Literasi SD</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Selamat Datang di <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">Literaverse!</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Ikuti perjalanan naratif dari Misi 1 hingga Misi 5! Setiap zona menghadirkan tantangan membaca bermakna (AKM) yang dibalut cerita seru.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-200">
            <span className="flex items-center"><Sparkles className="w-4 h-4 mr-1 text-amber-300" /> Selesaikan Misi untuk meraih Lencana Spesial</span>
            <span className="flex items-center"><Award className="w-4 h-4 mr-1 text-cyan-300" /> Kumpulkan XP & Buka Level Baru</span>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute right-4 bottom-2 opacity-20 sm:opacity-30 pointer-events-none text-8xl select-none">
          🗺️
        </div>
      </div>

      {/* Interactive Mission Nodes Flow */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center">
            <span>🗺️ jalur Misi Penjelajah ({profile.completedMissions.length}/5 Selesai)</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">Klik zona misi untuk membaca prolog cerita</span>
        </div>

        {/* Mission Nodes Horizontal / Vertical Track */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {QUEST_MISSIONS.map((mission, idx) => {
            const isCompleted = profile.completedMissions.includes(mission.id);
            const isUnlocked = idx === 0 || profile.completedMissions.includes(QUEST_MISSIONS[idx - 1].id);
            const isSelected = selectedMission?.id === mission.id;

            return (
              <div
                key={mission.id}
                onClick={() => isUnlocked && setSelectedMission(mission)}
                className={`relative rounded-2xl p-4 transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-emerald-500 border-emerald-400 bg-emerald-50/70 shadow-md transform -translate-y-1'
                    : isCompleted
                    ? 'bg-teal-50/50 border-teal-200 hover:bg-teal-50'
                    : isUnlocked
                    ? 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-xs'
                    : 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Top Badge Step */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isUnlocked
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-300 text-slate-600'
                  }`}>
                    Misi {mission.id}
                  </span>

                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  ) : !isUnlocked ? (
                    <Lock className="w-4 h-4 text-slate-400" />
                  ) : (
                    <span className="text-xl">{mission.characterAvatar}</span>
                  )}
                </div>

                {/* Mission Title */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                    {mission.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">{mission.zoneName}</p>
                </div>

                {/* Footer XP */}
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-600 flex items-center">
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500" /> +{mission.xpReward} XP
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold">
                    {mission.rewardBadge.icon} Lencana
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Mission Story Briefing Box */}
      {selectedMission && (
        <div className="bg-gradient-to-br from-white to-emerald-50/40 rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-md animate-fade-in space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-emerald-100">
            <div className="flex items-center space-x-3">
              <div className="text-4xl p-3 bg-white rounded-2xl shadow-xs border border-emerald-200">
                {selectedMission.characterAvatar}
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                  {selectedMission.zoneName}
                </span>
                <h3 className="text-xl font-black text-slate-900">{selectedMission.title}</h3>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  Pendamping Misi: {selectedMission.characterName}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <div className="bg-white px-3 py-2 rounded-xl border border-emerald-200 text-center">
                <span className="text-[10px] text-slate-500 block">Hadiah Lencana</span>
                <span className="text-xs font-bold text-emerald-800 flex items-center justify-center">
                  {selectedMission.rewardBadge.icon} {selectedMission.rewardBadge.name}
                </span>
              </div>
              <div className="bg-white px-3 py-2 rounded-xl border border-emerald-200 text-center">
                <span className="text-[10px] text-slate-500 block">Reward XP</span>
                <span className="text-xs font-bold text-amber-600 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1" /> +{selectedMission.xpReward} XP
                </span>
              </div>
            </div>
          </div>

          {/* Character Dialogue Box */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-200/80 shadow-2xs relative">
            <div className="flex items-start space-x-3">
              <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-emerald-800 block mb-1">
                  {selectedMission.characterName} berkata:
                </span>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{selectedMission.storyIntro}"
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-slate-600 max-w-lg">
              {selectedMission.description}
            </p>

            <button
              onClick={() => onSelectMissionContent(selectedMission.contentId, selectedMission.id)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-extrabold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-md shadow-emerald-200 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Mulai Misi {selectedMission.id}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
