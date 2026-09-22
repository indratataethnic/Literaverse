import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  XCircle,
  Sparkles,
  BookOpen,
  ChevronRight,
  Lightbulb,
  Eye,
  Check,
  Compass,
  ArrowRight,
  Zap,
  Target,
  Award
} from 'lucide-react';
import { StudentProfile } from '../types';
import { BEDAH_TEKS_DATABASE, BedahTeksItem } from '../data/bedahTeksData';

interface BedahTeksViewProps {
  profile: StudentProfile;
  onAwardXp: (xpEarned: number, textTitle: string) => void;
  onBackToMap: () => void;
}

type StepType = 'kalimat_utama' | 'ide_pokok' | 'tokoh' | 'amanat';

export const BedahTeksView: React.FC<BedahTeksViewProps> = ({
  profile,
  onAwardXp,
  onBackToMap,
}) => {
  const [selectedText, setSelectedText] = useState<BedahTeksItem>(BEDAH_TEKS_DATABASE[0]);
  const [activeStep, setActiveStep] = useState<StepType>('kalimat_utama');

  // Selected answers for active text
  const [selectedKalimatIndex, setSelectedKalimatIndex] = useState<number | null>(null);
  const [selectedIdeIndex, setSelectedIdeIndex] = useState<number | null>(null);
  const [selectedTokohIndex, setSelectedTokohIndex] = useState<number | null>(null);
  const [selectedAmanatIndex, setSelectedAmanatIndex] = useState<number | null>(null);

  // Status flags
  const [isKalimatCorrect, setIsKalimatCorrect] = useState<boolean | null>(null);
  const [isIdeCorrect, setIsIdeCorrect] = useState<boolean | null>(null);
  const [isTokohCorrect, setIsTokohCorrect] = useState<boolean | null>(null);
  const [isAmanatCorrect, setIsAmanatCorrect] = useState<boolean | null>(null);

  // Petunjuk Pintar Bertahap (Level 0 = Tutup, Level 1 = Kata Kunci & Lokasi, Level 2 = Eliminasi Opsi Salah, Level 3 = Sorotan Prof. Litera)
  const [hintLevel, setHintLevel] = useState<number>(0);

  // Color highlight toggle
  const [showColorHighlight, setShowColorHighlight] = useState<boolean>(false);

  // Completion tracker per text id
  const [completedTextIds, setCompletedTextIds] = useState<string[]>([]);

  // Sound speak function
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectText = (item: BedahTeksItem) => {
    setSelectedText(item);
    setActiveStep('kalimat_utama');
    setSelectedKalimatIndex(null);
    setSelectedIdeIndex(null);
    setSelectedTokohIndex(null);
    setSelectedAmanatIndex(null);
    setIsKalimatCorrect(null);
    setIsIdeCorrect(null);
    setIsTokohCorrect(null);
    setIsAmanatCorrect(null);
    setHintLevel(0);
    setShowColorHighlight(false);
  };

  const handleStepChange = (step: StepType) => {
    setActiveStep(step);
    setHintLevel(0); // reset hint on step change
  };

  // Check submission handlers with dedicated check buttons
  const handleConfirmCheckKalimat = () => {
    if (selectedKalimatIndex === null) return;
    const correct = selectedKalimatIndex === selectedText.kalimatUtamaIndex;
    setIsKalimatCorrect(correct);
    if (correct) {
      speakText('Hebat! Jawabanmu benar. Ini adalah kalimat utamanya!');
    } else {
      speakText('Hampir benar! Buka Petunjuk Pintar dari Prof. Litera untuk bantuan.');
    }
  };

  const handleConfirmCheckIde = () => {
    if (selectedIdeIndex === null) return;
    const correct = selectedIdeIndex === selectedText.correctIdePokokIndex;
    setIsIdeCorrect(correct);
    if (correct) {
      speakText('Tepat sekali! Kamu menemukan ide pokok teks ini!');
    } else {
      speakText('Ayo coba lagi atau manfaatkan Petunjuk Pintar!');
    }
  };

  const handleConfirmCheckTokoh = () => {
    if (selectedTokohIndex === null) return;
    const correct = selectedTokohIndex === selectedText.correctTokohIndex;
    setIsTokohCorrect(correct);
    if (correct) {
      speakText('Bagus! Kamu berhasil mengidentifikasi tokoh utama!');
    } else {
      speakText('Periksa kembali siapa pelaku utama dalam cerita ini.');
    }
  };

  const handleConfirmCheckAmanat = () => {
    if (selectedAmanatIndex === null) return;
    const correct = selectedAmanatIndex === selectedText.correctAmanatIndex;
    setIsAmanatCorrect(correct);

    if (correct) {
      speakText('Luar biasa! Amanat cerita telah kamu pahami dengan sempurna!');
      
      if (!completedTextIds.includes(selectedText.id)) {
        setCompletedTextIds((prev) => [...prev, selectedText.id]);
        onAwardXp(25, selectedText.title);
      }
    } else {
      speakText('Ayo pikirkan pesan kebaikan dalam cerita ini.');
    }
  };

  // Active step smart hint object
  const currentSmartHint = selectedText.smartHints
    ? selectedText.smartHints[activeStep]
    : {
        level1: selectedText[`${activeStep}Hint` as keyof BedahTeksItem] as string || 'Perhatikan kata kunci pada teks.',
        level2: 'Gunakan metode eliminasi untuk menyisakan pilihan paling tepat.',
        level3: 'Pilih opsi pertama yang paling menggambarkan struktur cerita.',
        eliminateIndices: [1, 2]
      };

  // Helper to check if an option index should be eliminated in Level 2+ hint
  const isOptionEliminated = (index: number) => {
    if (hintLevel < 2) return false;
    return currentSmartHint.eliminateIndices?.includes(index) || false;
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center border border-white/20">
                <Search className="w-3.5 h-3.5 mr-1" /> Bedah Teks & Analisis AKM
              </span>
              <span className="bg-amber-400 text-amber-950 text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs">
                +25 XP per Cerita
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Pusat Bedah Teks: Kalimat Utama, Ide Pokok & Amanat 🔍
            </h1>
            
            <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
              Pelajari struktur cerita dengan mudah! Tentukan mana <span className="bg-amber-400/30 text-amber-100 px-1.5 py-0.5 rounded font-bold">Kalimat Utama</span>, cari <span className="bg-sky-400/30 text-sky-100 px-1.5 py-0.5 rounded font-bold">Ide Pokok</span>, kenali <span className="bg-emerald-400/30 text-emerald-100 px-1.5 py-0.5 rounded font-bold">Tokoh Utama</span>, dan temukan <span className="bg-pink-400/30 text-pink-100 px-1.5 py-0.5 rounded font-bold">Amanat Moral</span> cerita.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-stretch md:self-auto justify-end">
            <button
              onClick={onBackToMap}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer backdrop-blur-md"
            >
              <span>🗺️ Kembali ke Peta</span>
            </button>
          </div>
        </div>
      </div>

      {/* Story Selector Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center">
            <BookOpen className="w-4 h-4 text-indigo-600 mr-2" />
            <span>Pilih Teks Bacaan Bedah ({BEDAH_TEKS_DATABASE.length} Teks)</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Tuntas: <strong className="text-emerald-600 font-bold">{completedTextIds.length}</strong> / {BEDAH_TEKS_DATABASE.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {BEDAH_TEKS_DATABASE.map((item) => {
            const isSelected = item.id === selectedText.id;
            const isDone = completedTextIds.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleSelectText(item)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-indigo-50/90 border-indigo-500 shadow-md ring-2 ring-indigo-400/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                      item.category === 'Fabel'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : item.category === 'Cerita Pendek'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {item.gradeLevel}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.category}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-indigo-600 flex items-center">
                    Bedah Teks <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>

                  {isDone && (
                    <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center">
                      <Check className="w-3 h-3 mr-0.5" /> Tuntas
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Analysis Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Original Reading Text & Color Highlight Toggle */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 sticky top-24">
            
            {/* Header Title */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="text-3xl">{selectedText.icon}</span>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base leading-tight">
                    {selectedText.title}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedText.category} • {selectedText.gradeLevel}</p>
                </div>
              </div>

              {/* Speech sound button */}
              <button
                onClick={() => speakText(selectedText.paragraphText)}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                title="Dengarkan Suara Pembaca"
              >
                🔊
              </button>
            </div>

            {/* Reading Text Box with Kalimat Utama Color Highlighting */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 leading-relaxed text-sm text-slate-800 space-y-2">
              <p className="font-serif text-base sm:text-lg leading-loose text-slate-900 tracking-wide">
                {selectedText.sentences.map((st, idx) => {
                  const isKalimatUtama = idx === selectedText.kalimatUtamaIndex;
                  const isSelectedByStudent = selectedKalimatIndex === idx;

                  let highlightBg = '';
                  let elementBadge = null;

                  // Hanya Kalimat Utama saja yang disorot warna
                  if (isKalimatUtama && (showColorHighlight || hintLevel === 3 || (activeStep === 'kalimat_utama' && isKalimatCorrect === true))) {
                    highlightBg = 'bg-amber-200 text-amber-950 font-bold border-b-2 border-amber-500 px-1 rounded shadow-xs';
                    elementBadge = <span className="bg-amber-500 text-amber-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ml-1">📌 Kalimat Utama</span>;
                  } else if (activeStep === 'kalimat_utama' && isSelectedByStudent) {
                    if (isKalimatCorrect === true) {
                      highlightBg = 'bg-emerald-200 text-emerald-950 font-bold border-b-2 border-emerald-500 px-1 rounded';
                    } else if (isKalimatCorrect === false) {
                      highlightBg = 'bg-rose-200 text-rose-950 font-bold border-b-2 border-rose-500 px-1 rounded';
                    } else {
                      highlightBg = 'bg-amber-100/90 text-amber-950 font-semibold border-b-2 border-amber-400 px-1 rounded';
                    }
                  }

                  return (
                    <span
                      key={st.id}
                      className={`transition-all duration-200 cursor-pointer hover:bg-indigo-100/50 mr-1.5 inline-wrap ${highlightBg}`}
                      onClick={() => {
                        if (activeStep === 'kalimat_utama') {
                          setSelectedKalimatIndex(idx);
                          setIsKalimatCorrect(null);
                        }
                      }}
                      title={`Kalimat ke-${idx + 1}`}
                    >
                      <sup className="text-[10px] font-mono font-bold text-slate-400 mr-0.5">[{idx + 1}]</sup>
                      {st.text}
                      {elementBadge}
                    </span>
                  );
                })}
              </p>
            </div>

            {/* Color Highlight Toggle Button */}
            <div className="pt-1">
              <button
                onClick={() => setShowColorHighlight(!showColorHighlight)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all border cursor-pointer flex items-center justify-center space-x-2 ${
                  showColorHighlight
                    ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>{showColorHighlight ? 'Sembunyikan Sorotan Kalimat Utama' : '👁️ Sorot Warna Kalimat Utama'}</span>
              </button>
            </div>

            {/* Structure Color Legend */}
            <div className="bg-slate-100 p-3 rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <span className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px] block">
                Kunci Warna Penanda Teks:
              </span>
              <div className="flex items-center space-x-2 text-[11px] font-bold">
                <div className="flex items-center space-x-1.5 bg-amber-100 text-amber-900 px-3 py-1.5 rounded-lg border border-amber-300 w-full">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                  <span>📌 Kalimat Utama (Kalimat Inti Pembuka/Penutup)</span>
                </div>
              </div>
            </div>

            {/* Mascot Owl Progressive Smart Hint Card (Petunjuk Pintar) */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 p-4 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl animate-bounce">🦉</span>
                  <div>
                    <h5 className="font-extrabold text-xs text-indigo-900 flex items-center">
                      <span>Prof. Litera</span>
                      <span className="ml-1 bg-indigo-200 text-indigo-900 text-[9px] font-black px-1.5 py-0.2 rounded-full">
                        Petunjuk Pintar
                      </span>
                    </h5>
                    <p className="text-[10px] text-indigo-700">Pembimbing Analisis Teks AKM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  {hintLevel === 0 ? (
                    <button
                      onClick={() => setHintLevel(1)}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all cursor-pointer flex items-center space-x-1 shadow-xs"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>💡 Buka Petunjuk</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setHintLevel(0)}
                      className="px-2.5 py-1 bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold hover:bg-slate-300 transition-all cursor-pointer"
                    >
                      Tutup
                    </button>
                  )}
                </div>
              </div>

              {/* Tiered Level Control Buttons */}
              {hintLevel > 0 && (
                <div className="space-y-3 pt-1 border-t border-indigo-100 animate-fade-in">
                  
                  {/* Level Selector Tabs */}
                  <div className="grid grid-cols-3 gap-1 bg-white/80 p-1 rounded-xl border border-indigo-100 text-[11px] font-bold">
                    <button
                      onClick={() => setHintLevel(1)}
                      className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1 ${
                        hintLevel === 1
                          ? 'bg-amber-400 text-amber-950 font-black shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>📍 Level 1</span>
                    </button>

                    <button
                      onClick={() => setHintLevel(2)}
                      className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1 ${
                        hintLevel === 2
                          ? 'bg-purple-600 text-white font-black shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>⚡ Level 2</span>
                    </button>

                    <button
                      onClick={() => setHintLevel(3)}
                      className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1 ${
                        hintLevel === 3
                          ? 'bg-emerald-600 text-white font-black shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>🔍 Level 3</span>
                    </button>
                  </div>

                  {/* Level Display Content */}
                  <div className="bg-white p-3.5 rounded-xl border border-indigo-100 text-xs text-indigo-950 font-medium leading-relaxed animate-fade-in shadow-xs space-y-2">
                    {hintLevel === 1 && (
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 block w-fit mb-1">
                          📍 Petunjuk Level 1: Kata Kunci & Lokasi
                        </span>
                        <p>{currentSmartHint.level1}</p>
                      </div>
                    )}

                    {hintLevel === 2 && (
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 block w-fit mb-1">
                          ⚡ Petunjuk Level 2: Eliminasi 2 Pilihan Salah
                        </span>
                        <p>{currentSmartHint.level2}</p>
                        <p className="text-[11px] text-purple-700 font-bold mt-1">
                          ✨ Opsi pilihan salah telah dieliminasi di kolom sebelah kanan!
                        </p>
                      </div>
                    )}

                    {hintLevel === 3 && (
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 block w-fit mb-1">
                          🔍 Petunjuk Level 3: Sorotan Langsung Prof. Litera
                        </span>
                        <p>{currentSmartHint.level3}</p>
                        <p className="text-[11px] text-emerald-800 font-bold mt-1">
                          💡 Kalimat target di paragraf sebelah kiri telah disorot otomatis dengan warna struktur!
                        </p>
                      </div>
                    )}

                    {/* Next Level Button inside hint box */}
                    {hintLevel < 3 && (
                      <button
                        onClick={() => setHintLevel(hintLevel + 1)}
                        className="mt-2 w-full py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer flex items-center justify-center space-x-1"
                      >
                        <span>Minta Petunjuk Lebih Jelas (Naik ke Level {hintLevel + 1})</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right Side: Interactive 4-Step Analysis Workspace */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Step Navigation Tabs */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between overflow-x-auto gap-1">
            <button
              onClick={() => handleStepChange('kalimat_utama')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                activeStep === 'kalimat_utama'
                  ? 'bg-amber-400 text-amber-950 shadow-xs ring-2 ring-amber-300'
                  : isKalimatCorrect
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>📌 1. Kalimat Utama</span>
              {isKalimatCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-1" />}
            </button>

            <button
              onClick={() => handleStepChange('ide_pokok')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                activeStep === 'ide_pokok'
                  ? 'bg-sky-500 text-white shadow-xs ring-2 ring-sky-300'
                  : isIdeCorrect
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>💡 2. Ide Pokok</span>
              {isIdeCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-1" />}
            </button>

            <button
              onClick={() => handleStepChange('tokoh')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                activeStep === 'tokoh'
                  ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-300'
                  : isTokohCorrect
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>👥 3. Tokoh Utama</span>
              {isTokohCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-1" />}
            </button>

            <button
              onClick={() => handleStepChange('amanat')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                activeStep === 'amanat'
                  ? 'bg-pink-600 text-white shadow-xs ring-2 ring-pink-300'
                  : isAmanatCorrect
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>🌟 4. Amanat</span>
              {isAmanatCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-1" />}
            </button>
          </div>

          {/* STEP 1: KALIMAT UTAMA */}
          {activeStep === 'kalimat_utama' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                    Langkah 1 dari 4 • Warna Struktur: Amber 📌
                  </span>
                  <h3 className="text-lg font-black text-slate-800 mt-1">
                    📌 Tentukan Kalimat Utama Paragraf Ini
                  </h3>
                </div>

                <button
                  onClick={() => setHintLevel(hintLevel > 0 ? 0 : 1)}
                  className="text-xs text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1 rounded-xl font-extrabold flex items-center cursor-pointer transition-all"
                >
                  <Lightbulb className="w-3.5 h-3.5 mr-1 text-amber-600" />
                  <span>Petunjuk Pintar</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Pilih kalimat yang menjadi <strong>kalimat utama</strong> (kalimat inti pengembang seluruh isi paragraf). Kamu bisa mengklik langsung kalimat di teks sebelah kiri!
              </p>

              <div className="space-y-3">
                {selectedText.sentences.map((sentence, idx) => {
                  const isSelected = selectedKalimatIndex === idx;
                  const isCorrect = idx === selectedText.kalimatUtamaIndex;
                  const isEliminated = isOptionEliminated(idx);

                  let borderStyle = 'border-slate-200 bg-slate-50 hover:border-amber-400 hover:bg-amber-50/50';
                  if (isEliminated) {
                    borderStyle = 'border-slate-200 bg-slate-100 opacity-40 line-through';
                  } else if (isSelected) {
                    if (isKalimatCorrect === true) {
                      borderStyle = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-semibold ring-2 ring-emerald-400/30';
                    } else if (isKalimatCorrect === false) {
                      borderStyle = 'border-rose-500 bg-rose-50/90 text-rose-950 font-semibold ring-2 ring-rose-400/30';
                    } else {
                      borderStyle = 'border-amber-500 bg-amber-50/90 text-amber-950 font-semibold ring-2 ring-amber-400/30';
                    }
                  }

                  return (
                    <button
                      key={sentence.id}
                      disabled={isEliminated}
                      onClick={() => {
                        setSelectedKalimatIndex(idx);
                        setIsKalimatCorrect(null);
                      }}
                      className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start space-x-3 relative ${borderStyle}`}
                    >
                      <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-amber-300">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-800">
                          "{sentence.text}"
                        </p>
                        {isEliminated && (
                          <span className="text-[10px] font-extrabold text-rose-600 uppercase mt-1 block">
                            🚫 Dieliminasi oleh Petunjuk Level 2
                          </span>
                        )}
                      </div>

                      {isSelected && isKalimatCorrect === true && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {isSelected && isKalimatCorrect === false && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dedicated Check Button for Kalimat Utama */}
              <button
                disabled={selectedKalimatIndex === null}
                onClick={handleConfirmCheckKalimat}
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] disabled:bg-slate-200 disabled:text-slate-400 text-amber-950 font-black rounded-2xl shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed text-xs sm:text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>🔍 Cek Kalimat Utama</span>
              </button>

              {/* Feedback box */}
              {isKalimatCorrect === true && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 animate-fade-in">
                  <div className="flex items-center space-x-2 text-emerald-800 font-extrabold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Luar Biasa! Jawabanmu Benar!</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {selectedText.kalimatUtamaExplanation}
                  </p>
                  <button
                    onClick={() => handleStepChange('ide_pokok')}
                    className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-extrabold hover:bg-emerald-700 transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Lanjut ke Langkah 2: Ide Pokok</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              )}

              {isKalimatCorrect === false && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-1 animate-fade-in">
                  <div className="flex items-center space-x-2 text-rose-800 font-extrabold text-sm">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Belum Tepat, Coba Lagi!</span>
                  </div>
                  <p className="text-xs text-rose-900 leading-relaxed">
                    Ingat, kalimat utama biasanya berdiri sendiri di awal (deduktif) dan memuat inti yang dijelaskan oleh kalimat-kalimat lain. Buka Petunjuk Level 2 atau 3 untuk bantuan!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: IDE POKOK */}
          {activeStep === 'ide_pokok' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full border border-sky-300">
                    Langkah 2 dari 4 • Warna Struktur: Biru 💡
                  </span>
                  <h3 className="text-lg font-black text-slate-800 mt-1">
                    💡 Tentukan Ide Pokok / Gagasan Utama
                  </h3>
                </div>

                <button
                  onClick={() => setHintLevel(hintLevel > 0 ? 0 : 1)}
                  className="text-xs text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3 py-1 rounded-xl font-extrabold flex items-center cursor-pointer transition-all"
                >
                  <Lightbulb className="w-3.5 h-3.5 mr-1 text-sky-600" />
                  <span>Petunjuk Pintar</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Ide pokok adalah <strong>ringkasan inti masalah</strong> yang disarikan langsung dari Kalimat Utama. Mana ide pokok yang paling tepat untuk teks ini?
              </p>

              <div className="space-y-3">
                {selectedText.idePokokOptions.map((option, idx) => {
                  const isSelected = selectedIdeIndex === idx;
                  const isCorrect = idx === selectedText.correctIdePokokIndex;
                  const isEliminated = isOptionEliminated(idx);

                  let borderStyle = 'border-slate-200 bg-slate-50 hover:border-sky-400 hover:bg-sky-50/50';
                  if (isEliminated) {
                    borderStyle = 'border-slate-200 bg-slate-100 opacity-40 line-through';
                  } else if (isSelected) {
                    if (isIdeCorrect === true) {
                      borderStyle = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-semibold ring-2 ring-emerald-400/30';
                    } else if (isIdeCorrect === false) {
                      borderStyle = 'border-rose-500 bg-rose-50/90 text-rose-950 font-semibold ring-2 ring-rose-400/30';
                    } else {
                      borderStyle = 'border-sky-500 bg-sky-50/90 text-sky-950 font-semibold ring-2 ring-sky-400/30';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isEliminated}
                      onClick={() => {
                        setSelectedIdeIndex(idx);
                        setIsIdeCorrect(null);
                      }}
                      className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start space-x-3 relative ${borderStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-sky-300">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-800">
                          {option}
                        </p>
                        {isEliminated && (
                          <span className="text-[10px] font-extrabold text-rose-600 uppercase mt-1 block">
                            🚫 Dieliminasi oleh Petunjuk Level 2
                          </span>
                        )}
                      </div>

                      {isSelected && isIdeCorrect === true && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {isSelected && isIdeCorrect === false && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dedicated Check Button for Ide Pokok */}
              <button
                disabled={selectedIdeIndex === null}
                onClick={handleConfirmCheckIde}
                className="w-full py-3 px-4 bg-sky-500 hover:bg-sky-600 active:scale-[0.99] disabled:bg-slate-200 disabled:text-slate-400 text-white font-black rounded-2xl shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed text-xs sm:text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>🔍 Cek Ide Pokok</span>
              </button>

              {/* Feedback box */}
              {isIdeCorrect === true && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 animate-fade-in">
                  <div className="flex items-center space-x-2 text-emerald-800 font-extrabold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Hebat Sekali! Ide Pokok Tepat!</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {selectedText.idePokokExplanation}
                  </p>
                  <button
                    onClick={() => handleStepChange('tokoh')}
                    className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-extrabold hover:bg-emerald-700 transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Lanjut ke Langkah 3: Tokoh Utama</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              )}

              {isIdeCorrect === false && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-1 animate-fade-in">
                  <div className="flex items-center space-x-2 text-rose-800 font-extrabold text-sm">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Pilihan Kurang Tepat</span>
                  </div>
                  <p className="text-xs text-rose-900 leading-relaxed">
                    Cari pilihan ringkas yang paling dekat menggambarkan inti Kalimat Utama yang telah kamu pilih tadi! Buka Petunjuk Level 2 untuk mengeliminasi pilihan salah.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: TOKOH & PENOKOHAN */}
          {activeStep === 'tokoh' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    Langkah 3 dari 4 • Warna Struktur: Hijau 👥
                  </span>
                  <h3 className="text-lg font-black text-slate-800 mt-1">
                    👥 Identifikasi Tokoh Utama & Sifatnya
                  </h3>
                </div>

                <button
                  onClick={() => setHintLevel(hintLevel > 0 ? 0 : 1)}
                  className="text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-xl font-extrabold flex items-center cursor-pointer transition-all"
                >
                  <Lightbulb className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  <span>Petunjuk Pintar</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Siapa tokoh utama (pemeran utama) atau subjek objek cerita yang memegang peran paling penting dalam cerita ini?
              </p>

              <div className="space-y-3">
                {selectedText.tokohOptions.map((option, idx) => {
                  const isSelected = selectedTokohIndex === idx;
                  const isCorrect = idx === selectedText.correctTokohIndex;
                  const isEliminated = isOptionEliminated(idx);

                  let borderStyle = 'border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/50';
                  if (isEliminated) {
                    borderStyle = 'border-slate-200 bg-slate-100 opacity-40 line-through';
                  } else if (isSelected) {
                    if (isTokohCorrect === true) {
                      borderStyle = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-semibold ring-2 ring-emerald-400/30';
                    } else if (isTokohCorrect === false) {
                      borderStyle = 'border-rose-500 bg-rose-50/90 text-rose-950 font-semibold ring-2 ring-rose-400/30';
                    } else {
                      borderStyle = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-semibold ring-2 ring-emerald-400/30';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isEliminated}
                      onClick={() => {
                        setSelectedTokohIndex(idx);
                        setIsTokohCorrect(null);
                      }}
                      className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start space-x-3 relative ${borderStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-emerald-300">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-800">
                          {option}
                        </p>
                        {isEliminated && (
                          <span className="text-[10px] font-extrabold text-rose-600 uppercase mt-1 block">
                            🚫 Dieliminasi oleh Petunjuk Level 2
                          </span>
                        )}
                      </div>

                      {isSelected && isTokohCorrect === true && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {isSelected && isTokohCorrect === false && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dedicated Check Button for Tokoh Utama */}
              <button
                disabled={selectedTokohIndex === null}
                onClick={handleConfirmCheckTokoh}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] disabled:bg-slate-200 disabled:text-slate-400 text-white font-black rounded-2xl shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed text-xs sm:text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>🔍 Cek Tokoh Utama</span>
              </button>

              {/* Feedback box */}
              {isTokohCorrect === true && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 animate-fade-in">
                  <div className="flex items-center space-x-2 text-emerald-800 font-extrabold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Identifikasi Tokoh Berhasil!</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    <strong>Rincian Tokoh & Sifat:</strong> {selectedText.tokohDetails}
                  </p>
                  <button
                    onClick={() => handleStepChange('amanat')}
                    className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-extrabold hover:bg-emerald-700 transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Lanjut ke Langkah 4: Amanat Moral</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              )}

              {isTokohCorrect === false && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-1 animate-fade-in">
                  <div className="flex items-center space-x-2 text-rose-800 font-extrabold text-sm">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Tokoh Kurang Tepat</span>
                  </div>
                  <p className="text-xs text-rose-900 leading-relaxed">
                    Periksa kembali siapa pelaku yang paling sering disebut atau paling aktif dalam teks!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: AMANAT CERITA */}
          {activeStep === 'amanat' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-pink-800 bg-pink-100 px-2.5 py-0.5 rounded-full border border-pink-300">
                    Langkah 4 dari 4 • Warna Struktur: Merah Muda 🌟
                  </span>
                  <h3 className="text-lg font-black text-slate-800 mt-1">
                    🌟 Temukan Amanat & Pesan Moral
                  </h3>
                </div>

                <button
                  onClick={() => setHintLevel(hintLevel > 0 ? 0 : 1)}
                  className="text-xs text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 px-3 py-1 rounded-xl font-extrabold flex items-center cursor-pointer transition-all"
                >
                  <Lightbulb className="w-3.5 h-3.5 mr-1 text-pink-600" />
                  <span>Petunjuk Pintar</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Amanat adalah <strong>pesan kebaikan atau nilai moral</strong> yang ingin disampaikan oleh penulis kepada pembaca. Mana pesan moral yang tepat?
              </p>

              <div className="space-y-3">
                {selectedText.amanatOptions.map((option, idx) => {
                  const isSelected = selectedAmanatIndex === idx;
                  const isCorrect = idx === selectedText.correctAmanatIndex;
                  const isEliminated = isOptionEliminated(idx);

                  let borderStyle = 'border-slate-200 bg-slate-50 hover:border-pink-400 hover:bg-pink-50/50';
                  if (isEliminated) {
                    borderStyle = 'border-slate-200 bg-slate-100 opacity-40 line-through';
                  } else if (isSelected) {
                    if (isAmanatCorrect === true) {
                      borderStyle = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-semibold ring-2 ring-emerald-400/30';
                    } else if (isAmanatCorrect === false) {
                      borderStyle = 'border-rose-500 bg-rose-50/90 text-rose-950 font-semibold ring-2 ring-rose-400/30';
                    } else {
                      borderStyle = 'border-pink-500 bg-pink-50/90 text-pink-950 font-semibold ring-2 ring-pink-400/30';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isEliminated}
                      onClick={() => {
                        setSelectedAmanatIndex(idx);
                        setIsAmanatCorrect(null);
                      }}
                      className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start space-x-3 relative ${borderStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-800 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-pink-300">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-800">
                          {option}
                        </p>
                        {isEliminated && (
                          <span className="text-[10px] font-extrabold text-rose-600 uppercase mt-1 block">
                            🚫 Dieliminasi oleh Petunjuk Level 2
                          </span>
                        )}
                      </div>

                      {isSelected && isAmanatCorrect === true && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {isSelected && isAmanatCorrect === false && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dedicated Check Button for Amanat */}
              <button
                disabled={selectedAmanatIndex === null}
                onClick={handleConfirmCheckAmanat}
                className="w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 active:scale-[0.99] disabled:bg-slate-200 disabled:text-slate-400 text-white font-black rounded-2xl shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed text-xs sm:text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>🔍 Cek Amanat Cerita</span>
              </button>

              {/* Final Celebration Card when step 4 is complete */}
              {isAmanatCorrect === true && (
                <div className="p-5 bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 text-white rounded-3xl space-y-3 animate-fade-in shadow-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">🎉</span>
                    <div>
                      <h4 className="font-black text-lg">Selamat! Bedah Teks Selesai (+25 XP)</h4>
                      <p className="text-xs text-emerald-100">
                        Kamu telah berhasil membedah keempat unsur struktur bacaan "{selectedText.title}"!
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setShowColorHighlight(true)}
                      className="px-4 py-2 bg-white text-emerald-900 rounded-xl text-xs font-black shadow-xs hover:bg-emerald-50 transition-all flex items-center space-x-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      <span>Lihat Warna Bedah Teks</span>
                    </button>

                    <button
                      onClick={() => {
                        const nextIndex = (BEDAH_TEKS_DATABASE.findIndex(b => b.id === selectedText.id) + 1) % BEDAH_TEKS_DATABASE.length;
                        handleSelectText(BEDAH_TEKS_DATABASE[nextIndex]);
                      }}
                      className="px-4 py-2 bg-emerald-800/80 text-white border border-emerald-400/40 rounded-xl text-xs font-extrabold hover:bg-emerald-800 transition-all cursor-pointer flex items-center space-x-1"
                    >
                      <span>Bedah Teks Berikutnya</span>
                      <ChevronRight className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                </div>
              )}

              {isAmanatCorrect === false && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-1 animate-fade-in">
                  <div className="flex items-center space-x-2 text-rose-800 font-extrabold text-sm">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Amanat Kurang Tepat</span>
                  </div>
                  <p className="text-xs text-rose-900 leading-relaxed">
                    Pikirkan pelajaran positif yang berguna bagi kehidupan sehari-hari dari peristiwa dalam cerita ini.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Master Summary Card for Current Text */}
          <div className="bg-slate-900 text-white p-5 rounded-3xl space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center">
                <Compass className="w-4 h-4 mr-1.5" />
                <span>Rangkuman Unsur Bedah Teks Ini</span>
              </h4>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                AKM Literasi SD
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 bg-slate-800/90 rounded-2xl border border-amber-500/30">
                <span className="text-[10px] font-black text-amber-400 uppercase flex items-center mb-1">
                  📌 Kalimat Utama:
                </span>
                <p className="text-slate-200 line-clamp-2 italic">
                  "{selectedText.sentences[selectedText.kalimatUtamaIndex].text}"
                </p>
              </div>

              <div className="p-3 bg-slate-800/90 rounded-2xl border border-sky-500/30">
                <span className="text-[10px] font-black text-sky-400 uppercase flex items-center mb-1">
                  💡 Ide Pokok:
                </span>
                <p className="text-slate-200 line-clamp-2 font-medium">
                  {selectedText.idePokokOptions[selectedText.correctIdePokokIndex]}
                </p>
              </div>

              <div className="p-3 bg-slate-800/90 rounded-2xl border border-emerald-500/30">
                <span className="text-[10px] font-black text-emerald-400 uppercase flex items-center mb-1">
                  👥 Tokoh Utama:
                </span>
                <p className="text-slate-200 line-clamp-2">
                  {selectedText.tokohDetails}
                </p>
              </div>

              <div className="p-3 bg-slate-800/90 rounded-2xl border border-pink-500/30">
                <span className="text-[10px] font-black text-pink-400 uppercase flex items-center mb-1">
                  🌟 Amanat Moral:
                </span>
                <p className="text-slate-200 line-clamp-2">
                  {selectedText.amanatOptions[selectedText.correctAmanatIndex]}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
