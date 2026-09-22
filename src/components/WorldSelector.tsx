import React, { useState } from 'react';
import { BookOpen, Newspaper, ShoppingBag, BarChart3, MessageSquare, PenTool, Sparkles, CheckCircle2, Clock, ShieldCheck, ArrowRight, Filter } from 'lucide-react';
import { WorldType, MasteryLevel, ReadingContent, StudentProfile } from '../types';
import { WORLD_DEFINITIONS, LEVEL_DEFINITIONS } from '../data/literaverseData';

interface WorldSelectorProps {
  contents: ReadingContent[];
  profile: StudentProfile;
  onSelectContent: (content: ReadingContent) => void;
  onSelectWriterWorld: () => void;
}

export const WorldSelector: React.FC<WorldSelectorProps> = ({
  contents,
  profile,
  onSelectContent,
  onSelectWriterWorld,
}) => {
  const [activeWorldTab, setActiveWorldTab] = useState<WorldType>('story');
  const [filterLevel, setFilterLevel] = useState<MasteryLevel | 'ALL'>('ALL');

  const activeWorldInfo = WORLD_DEFINITIONS.find((w) => w.id === activeWorldTab) || WORLD_DEFINITIONS[0];

  const filteredContents = contents.filter((c) => {
    const matchesWorld = c.world === activeWorldTab;
    const matchesLevel = filterLevel === 'ALL' || c.level === filterLevel;
    return matchesWorld && matchesLevel;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Newspaper': return <Newspaper className="w-5 h-5" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5" />;
      case 'PenTool': return <PenTool className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Worlds Header Grid */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              6 Zona Dunia Teks Literaverse
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Pilih zona dunia teks untuk mengeksplorasi bacaan otentik dan melatih kemampuan meaning making
            </p>
          </div>
        </div>

        {/* World Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {WORLD_DEFINITIONS.map((world) => {
            const isActive = activeWorldTab === world.id;
            const isDailyLife = world.id === 'daily_life';

            return (
              <button
                key={world.id}
                onClick={() => {
                  setActiveWorldTab(world.id);
                  if (world.id === 'writer') {
                    onSelectWriterWorld();
                  }
                }}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 relative cursor-pointer flex flex-col justify-between h-28 ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-102 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {isDailyLife && (
                  <span className="absolute -top-2 -right-1 bg-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-2xs border border-white">
                    ⭐ Ciri Khas
                  </span>
                )}

                <div className={`p-2 rounded-xl w-fit ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  {getIcon(world.iconName)}
                </div>

                <div>
                  <h3 className="text-xs font-bold leading-snug">{world.name}</h3>
                  <p className={`text-[10px] mt-0.5 line-clamp-1 ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                    {world.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected World Banner */}
      <div className={`rounded-3xl p-6 ${activeWorldInfo.bannerBg} shadow-md space-y-4`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              {activeWorldInfo.subtitle}
            </span>
            <h3 className="text-2xl font-black mt-2">{activeWorldInfo.name}</h3>
            <p className="text-xs sm:text-sm text-white/90 max-w-2xl mt-1 leading-relaxed">
              {activeWorldInfo.description}
            </p>
          </div>

          {activeWorldTab === 'writer' ? (
            <button
              onClick={onSelectWriterWorld}
              className="px-6 py-3 rounded-2xl font-extrabold bg-white text-rose-800 hover:bg-rose-50 shadow-md transition-all flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
            >
              <PenTool className="w-5 h-5 text-rose-600" />
              <span>Buka Writer Studio AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex flex-wrap gap-1.5 max-w-sm">
              {activeWorldInfo.competencies.map((comp, idx) => (
                <span key={idx} className="text-[10px] font-semibold bg-white/15 px-2.5 py-1 rounded-lg border border-white/20">
                  ✓ {comp}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Level Filter Bar */}
      {activeWorldTab !== 'writer' && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1.5 text-slate-500" /> Filter Tingkat Kemampuan Siswa:
            </span>
            <span className="text-[11px] text-slate-500">
              Level Kamu saat ini: <strong className="text-emerald-700">{profile.level}</strong>
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterLevel('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterLevel === 'ALL'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua Level ({contents.filter(c => c.world === activeWorldTab).length})
            </button>

            {(Object.keys(LEVEL_DEFINITIONS) as MasteryLevel[]).map((lvl) => {
              const info = LEVEL_DEFINITIONS[lvl];
              const isSelected = filterLevel === lvl;
              const count = contents.filter((c) => c.world === activeWorldTab && c.level === lvl).length;

              return (
                <button
                  key={lvl}
                  onClick={() => setFilterLevel(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{info.emoji}</span>
                  <span>{info.name}</span>
                  <span className="opacity-70 text-[10px]">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Content Cards Grid */}
      {activeWorldTab !== 'writer' && (
        <div>
          {filteredContents.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300 p-6">
              <p className="text-sm font-semibold text-slate-600">
                Belum ada konten untuk filter level ini di {activeWorldInfo.name}.
              </p>
              <button
                onClick={() => setFilterLevel('ALL')}
                className="mt-3 px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl hover:bg-emerald-200 cursor-pointer"
              >
                Tampilkan Semua Level
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredContents.map((content) => {
                const isCompleted = profile.completedContents.includes(content.id);
                const levelInfo = LEVEL_DEFINITIONS[content.level];

                return (
                  <div
                    key={content.id}
                    onClick={() => onSelectContent(content)}
                    className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                  >
                    <div className="space-y-3">
                      
                      {/* Top tags */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                          {content.category}
                        </span>

                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {levelInfo.emoji} {content.level}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                          {content.title}
                        </h4>
                        {content.subtitle && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1 font-medium">
                            {content.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Text Snippet Preview */}
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                        "{content.text}"
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" /> {content.readTimeMinutes} menit baca
                      </span>

                      {isCompleted ? (
                        <span className="font-bold text-emerald-700 flex items-center bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Sudah Dibaca
                        </span>
                      ) : (
                        <span className="font-extrabold text-emerald-700 group-hover:translate-x-1 transition-transform flex items-center">
                          Baca & Tantangan <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </span>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
