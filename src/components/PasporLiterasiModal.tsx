import React, { useState } from 'react';
import { X, Award, Sparkles, BookOpen, Flame, Target, CheckCircle2, ShieldAlert, Edit2 } from 'lucide-react';
import { StudentProfile, MasteryLevel } from '../types';
import { LEVEL_DEFINITIONS } from '../data/literaverseData';

interface PasporLiterasiModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
}

const AVATAR_OPTIONS = ['👦', '👧', '🦁', '🦉', '🦊', '🚀', '🌟', '🎨'];

export const PasporLiterasiModal: React.FC<PasporLiterasiModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar);
  const [selectedLevel, setSelectedLevel] = useState<MasteryLevel>(profile.level);

  if (!isOpen) return null;

  const currentLevelInfo = LEVEL_DEFINITIONS[profile.level];
  const accuracy = profile.akmStats.totalAnswered > 0
    ? Math.round((profile.akmStats.correctAnswers / profile.akmStats.totalAnswered) * 100)
    : 0;

  const handleSave = () => {
    onUpdateProfile({
      name: nameInput,
      avatar: selectedAvatar,
      level: selectedLevel,
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-700 text-white flex items-center justify-between rounded-t-3xl relative">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl border border-white/30">
              {profile.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Paspor Literasi Siswa</h2>
              <p className="text-xs text-emerald-100">Profil Capaian Kemampuan & Koleksi Lencana</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 flex-1">

          {/* Profile Card / Edit Mode */}
          {!isEditing ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="text-4xl p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  {profile.avatar}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-slate-900">{profile.name}</h3>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-xs text-emerald-700 font-semibold hover:underline flex items-center cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit Profil
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {currentLevelInfo.emoji} {currentLevelInfo.name}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">({currentLevelInfo.gradeLabel})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
                <div className="text-center bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 block">Total XP</span>
                  <span className="text-base font-extrabold text-amber-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 mr-1 text-amber-500" /> {profile.totalXp}
                  </span>
                </div>
                <div className="text-center bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 block">Streak</span>
                  <span className="text-base font-extrabold text-orange-600 flex items-center justify-center">
                    <Flame className="w-4 h-4 mr-1 text-orange-500" /> {profile.streakDays}d
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-4 animate-fade-in">
              <h4 className="font-bold text-emerald-900 text-sm">Pengaturan Profil & Level Siswa</h4>
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Siswa</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Avatar</label>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av}
                      onClick={() => setSelectedAvatar(av)}
                      className={`text-2xl p-2 rounded-xl border transition-all cursor-pointer ${
                        selectedAvatar === av ? 'bg-emerald-200 border-emerald-500 scale-110' : 'bg-white border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Level Kemampuan (AKM)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(Object.keys(LEVEL_DEFINITIONS) as MasteryLevel[]).map((lvlKey) => {
                    const info = LEVEL_DEFINITIONS[lvlKey];
                    return (
                      <button
                        key={lvlKey}
                        onClick={() => setSelectedLevel(lvlKey)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedLevel === lvlKey
                            ? 'bg-emerald-600 text-white border-emerald-700 font-bold shadow-xs'
                            : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">{info.emoji} {info.name}</span>
                          <span className="text-[10px] opacity-80">{info.gradeLabel}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-300 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          )}

          {/* AKM & Reading Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center">
              <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <span className="text-xl font-black text-slate-900 block">{profile.completedContents.length}</span>
              <span className="text-xs text-slate-600 font-medium">Teks Dibaca</span>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
              <span className="text-xl font-black text-slate-900 block">{profile.completedMissions.length}/5</span>
              <span className="text-xs text-slate-600 font-medium">Misi Selesai</span>
            </div>

            <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl text-center">
              <Target className="w-6 h-6 text-amber-600 mx-auto mb-1" />
              <span className="text-xl font-black text-slate-900 block">{accuracy}%</span>
              <span className="text-xs text-slate-600 font-medium">Akurasi AKM</span>
            </div>

            <div className="bg-purple-50 border border-purple-100 p-4 rounded-2xl text-center">
              <Award className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <span className="text-xl font-black text-slate-900 block">{profile.badges.length}</span>
              <span className="text-xs text-slate-600 font-medium">Lencana Diraih</span>
            </div>
          </div>

          {/* Badge Collection Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center">
                <Award className="w-4 h-4 text-emerald-600 mr-1.5" /> Koleksi Lencana Literasi ({profile.badges.length})
              </h4>
            </div>

            {profile.badges.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                <p className="text-xs text-slate-500">Belum ada lencana. Selesaikan Misi dan Teks untuk meraih lencana pertamamu!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {profile.badges.map((b) => (
                  <div key={b.id} className="bg-white border border-slate-200 p-3 rounded-2xl shadow-2xs hover:shadow-xs transition-all flex items-center space-x-3">
                    <span className="text-3xl bg-amber-50 p-2 rounded-xl border border-amber-100">{b.icon}</span>
                    <div className="overflow-hidden">
                      <h5 className="text-xs font-bold text-slate-900 truncate">{b.name}</h5>
                      <p className="text-[10px] text-slate-500 line-clamp-1">{b.description}</p>
                      <span className="text-[9px] text-emerald-600 font-medium mt-0.5 block">{b.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between rounded-b-3xl text-xs text-slate-500">
          <span>Tingkat Kemampuan: {currentLevelInfo.description}</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
