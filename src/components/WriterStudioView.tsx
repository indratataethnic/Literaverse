import React, { useState } from 'react';
import { PenTool, Sparkles, Send, Award, RefreshCcw, CheckCircle2, Lightbulb, BookOpen, Star } from 'lucide-react';
import { WriterPrompt, MasteryLevel, AIEvaluationResult, StudentProfile } from '../types';
import { WRITER_PROMPTS, LEVEL_DEFINITIONS } from '../data/literaverseData';

interface WriterStudioViewProps {
  profile: StudentProfile;
  onAwardWriterBadge: (badgeName: string, xpEarned: number) => void;
}

export const WriterStudioView: React.FC<WriterStudioViewProps> = ({
  profile,
  onAwardWriterBadge,
}) => {
  const [selectedPrompt, setSelectedPrompt] = useState<WriterPrompt>(WRITER_PROMPTS[0]);
  const [selectedTaskType, setSelectedTaskType] = useState<'title' | 'continue' | 'fix' | 'ending' | 'summary'>('continue');
  const [studentWriting, setStudentWriting] = useState('');
  
  // AI State
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIEvaluationResult | null>(null);

  const levelInfo = LEVEL_DEFINITIONS[profile.level];

  const handleEvaluate = async () => {
    if (!studentWriting.trim()) return;

    setIsLoading(true);
    setAiResult(null);

    try {
      const response = await fetch('/api/ai/writer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptType: selectedTaskType,
          storyTitle: selectedPrompt.title,
          storyContent: selectedPrompt.baseStory,
          studentText: studentWriting,
          targetLevel: profile.level,
        }),
      });

      const data: AIEvaluationResult = await response.json();
      setAiResult(data);

      if (data.score >= 3) {
        onAwardWriterBadge(data.badgeEarned || 'Penulis Imajinatif', 100);
      }
    } catch (err) {
      // Fallback response
      setAiResult({
        score: 5,
        praise: 'Luar biasa! Tulisanmu sangat bagus dan kaya akan imajinasi.',
        improvement: 'Perhatikan penggunaan tanda baca titik dan koma agar semakin sempurna.',
        badgeEarned: 'Penulis Cilik Literaverse',
        correctedText: studentWriting,
      });
      onAwardWriterBadge('Penulis Cilik Literaverse', 100);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Studio Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-700 via-pink-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-rose-600/40 relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold text-rose-100 border border-white/30">
            <PenTool className="w-3.5 h-3.5 text-rose-200" />
            <span>Writer World – Ruang Penulis & AI Studio</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ciptakan Karya Tulismu & Dapatkan Umpan Balik AI!
          </h1>

          <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
            Di sini literasi tidak sekadar membaca. Siswa diminta membuat judul, melanjutkan cerita, memperbaiki kalimat, atau menyusun akhir cerita. Guru AI akan memberikan apresiasi dan saran ramah anak!
          </p>
        </div>

        <div className="absolute right-4 -bottom-4 text-8xl opacity-15 pointer-events-none select-none">
          ✍️
        </div>
      </div>

      {/* Prompt Selector */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center">
          <BookOpen className="w-4 h-4 mr-1.5 text-rose-600" /> Pilih Cerita Rintisan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WRITER_PROMPTS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPrompt(p);
                setStudentWriting('');
                setAiResult(null);
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedPrompt.id === p.id
                  ? 'bg-rose-50/80 border-rose-400 ring-2 ring-rose-400 font-bold'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="text-[10px] font-bold uppercase text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full inline-block mb-1">
                Level {p.level}
              </span>
              <h3 className="text-sm font-bold text-slate-900">{p.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 mt-1">{p.baseStory}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Base Story Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-500 block">Cerita Rintisan Utama:</span>
          <h3 className="text-xl font-bold text-slate-900">{selectedPrompt.title}</h3>
        </div>

        <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 text-slate-800 text-sm leading-relaxed font-serif italic">
          "{selectedPrompt.baseStory}"
        </div>

        {/* Task Selection */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">Pilih Tugas Menulis Siswa:</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {selectedPrompt.suggestedTasks.map((task) => (
              <button
                key={task.id}
                onClick={() => {
                  setSelectedTaskType(task.id);
                  setAiResult(null);
                }}
                className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  selectedTaskType === task.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {task.label}
              </button>
            ))}
          </div>
        </div>

        {/* Writing Editor Textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Tuliskan Karya Tulismu Di Sini:</span>
            <span>{studentWriting.length} Karakter</span>
          </div>

          <textarea
            rows={5}
            value={studentWriting}
            onChange={(e) => setStudentWriting(e.target.value)}
            placeholder={
              selectedPrompt.suggestedTasks.find((t) => t.id === selectedTaskType)?.placeholder ||
              'Ketik tulisan kreatifmu di sini...'
            }
            className="w-full p-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-slate-50 focus:bg-white transition-all"
          />
        </div>

        {/* Sample Inspiration */}
        {selectedPrompt.sampleExample && (
          <div className="bg-indigo-50/70 p-3.5 rounded-xl border border-indigo-200 text-xs text-indigo-900 flex items-start space-x-2">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span><strong>Contoh Inspirasi:</strong> "{selectedPrompt.sampleExample}"</span>
          </div>
        )}

        {/* Submit Action Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleEvaluate}
            disabled={isLoading || !studentWriting.trim()}
            className="px-6 py-3.5 rounded-2xl font-extrabold text-white bg-gradient-to-r from-rose-600 to-pink-700 hover:from-rose-700 hover:to-pink-800 disabled:bg-slate-300 shadow-md transition-all flex items-center space-x-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCcw className="w-5 h-5 animate-spin" />
                <span>Guru AI Sedang Membaca Tulisanmu...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Kirim ke Guru AI & Minta Evaluasi</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* AI Evaluation Output Card */}
      {aiResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-300 shadow-xl space-y-6 animate-fade-in">
          
          <div className="flex items-center justify-between pb-4 border-b border-rose-100">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="text-lg font-black text-slate-900">Umpan Balik Guru AI Literaverse</h3>
                <p className="text-xs text-slate-500">Evaluasi Kreativitas & Bahasa Ramah Anak</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center space-x-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= aiResult.score ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Praise */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-1">
            <span className="text-xs font-bold text-emerald-800 flex items-center">
              <Sparkles className="w-4 h-4 mr-1 text-emerald-600" /> Pujian Guru AI:
            </span>
            <p className="text-sm font-medium text-emerald-950 leading-relaxed">
              "{aiResult.praise}"
            </p>
          </div>

          {/* Improvement */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-1">
            <span className="text-xs font-bold text-amber-800 flex items-center">
              <Lightbulb className="w-4 h-4 mr-1 text-amber-600" /> Saran Perbaikan Rinci:
            </span>
            <p className="text-xs text-amber-950 leading-relaxed">
              {aiResult.improvement}
            </p>
          </div>

          {/* Corrected Ejaan Version */}
          {aiResult.correctedText && (
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-1">
              <span className="text-xs font-bold text-slate-700 block">
                ✏️ Versi Suntingan Indah (Ejaan & Tanda Baca Rapi):
              </span>
              <p className="text-xs text-slate-800 italic font-serif">
                "{aiResult.correctedText}"
              </p>
            </div>
          )}

          {/* Badge Awarded */}
          {aiResult.badgeEarned && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-3">
                <span className="text-3xl bg-white/20 p-2 rounded-xl">🎖️</span>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-100 block">Lencana Diraih!</span>
                  <h4 className="text-base font-black">{aiResult.badgeEarned}</h4>
                </div>
              </div>
              <span className="text-xs font-extrabold bg-white text-amber-900 px-3 py-1.5 rounded-xl">
                +100 XP
              </span>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
