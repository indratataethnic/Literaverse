import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, VolumeX, Highlighter, BookOpen, Sparkles, CheckCircle2, HelpCircle, AlertCircle, RefreshCw, MessageSquare, Lightbulb, Share2 } from 'lucide-react';
import { ReadingContent, VocabItem, Question, StudentProfile } from '../types';
import { LEVEL_DEFINITIONS } from '../data/literaverseData';

interface TextReaderViewProps {
  content: ReadingContent;
  onBack: () => void;
  profile: StudentProfile;
  onCompleteContent: (contentId: string, questionsAnswered: number, correctCount: number, xpEarned: number) => void;
  audioEnabled: boolean;
}

export const TextReaderView: React.FC<TextReaderViewProps> = ({
  content,
  onBack,
  profile,
  onCompleteContent,
  audioEnabled,
}) => {
  const [selectedVocab, setSelectedVocab] = useState<VocabItem | null>(null);
  const [highlightColor, setHighlightColor] = useState<'none' | 'yellow' | 'green' | 'blue' | 'purple'>('none');
  const [highlightedSentences, setHighlightedSentences] = useState<Record<number, string>>({});
  const [showAnalysis, setShowAnalysis] = useState<boolean>(true);
  
  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // Challenge answers state
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [isFinishedAll, setIsFinishedAll] = useState(false);

  // AI Hint state
  const [aiHint, setAiHint] = useState<string | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState(false);

  const levelInfo = LEVEL_DEFINITIONS[content.level];

  // Speech synthesis setup
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const textToRead = `${content.title}. ${content.text}`;
      const newUtterance = new SpeechSynthesisUtterance(textToRead);
      newUtterance.lang = 'id-ID'; // Indonesian voice
      newUtterance.rate = 0.9; // Friendly slower rate for elementary children

      newUtterance.onend = () => setIsPlayingAudio(false);
      newUtterance.onerror = () => setIsPlayingAudio(false);

      setUtterance(newUtterance);

      return () => {
        synth.cancel();
      };
    }
  }, [content]);

  const toggleAudio = () => {
    if (!('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;

    if (isPlayingAudio) {
      synth.cancel();
      setIsPlayingAudio(false);
    } else if (utterance) {
      synth.cancel();
      synth.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleSentenceClick = (index: number) => {
    if (highlightColor === 'none') return;
    setHighlightedSentences((prev) => {
      const current = prev[index];
      if (current === highlightColor) {
        const next = { ...prev };
        delete next[index];
        return next;
      }
      return { ...prev, [index]: highlightColor };
    });
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submittedQuestions[questionId]) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleToggleMultiSelect = (questionId: string, optionIndex: number) => {
    if (submittedQuestions[questionId]) return;
    setAnswers((prev) => {
      const current: number[] = prev[questionId] || [];
      if (current.includes(optionIndex)) {
        return { ...prev, [questionId]: current.filter((i) => i !== optionIndex) };
      }
      return { ...prev, [questionId]: [...current, optionIndex] };
    });
  };

  const handleSubmitQuestion = (q: Question) => {
    setSubmittedQuestions((prev) => ({ ...prev, [q.id]: true }));

    // Check if all questions are submitted
    const newSubmitted = { ...submittedQuestions, [q.id]: true };
    if (Object.keys(newSubmitted).length === content.questions.length) {
      // Calculate results
      let correctCount = 0;
      content.questions.forEach((question) => {
        const ans = answers[question.id];
        if (question.type === 'multiple_choice' && ans === question.correctOptionIndex) {
          correctCount++;
        } else if (question.type === 'multi_select' && Array.isArray(ans)) {
          const expected = question.correctMultiIndices || [];
          if (ans.length === expected.length && ans.every((val) => expected.includes(val))) {
            correctCount++;
          }
        }
      });

      const total = content.questions.length;
      const xpEarned = correctCount * 30 + 50; // XP reward formula

      setIsFinishedAll(true);
      onCompleteContent(content.id, total, correctCount, xpEarned);
    }
  };

  const handleAskAIHint = async (q: Question) => {
    setIsLoadingHint(true);
    setAiHint(null);
    try {
      const res = await fetch('/api/ai/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passageTitle: content.title,
          passageText: content.text,
          questionText: q.prompt,
        }),
      });
      const data = await res.json();
      setAiHint(data.hint || 'Bacalah kembali kalimat pendukung dalam teks.');
    } catch (e) {
      setAiHint('Perhatikan kata kunci pada pertanyaan dan cari di dalam teks!');
    } finally {
      setIsLoadingHint(false);
    }
  };

  // Split text into readable paragraphs/sentences
  const paragraphs = content.text.split('\n\n');

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-sm font-bold text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Zona</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-extrabold uppercase bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
            {content.category}
          </span>
          <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200">
            {levelInfo.emoji} {content.level}
          </span>
        </div>
      </div>

      {/* Main Reading Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        
        {/* Title & Author */}
        <div className="space-y-2 pb-4 border-b border-slate-100">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {content.title}
          </h1>
          {content.subtitle && (
            <p className="text-sm font-medium text-emerald-800">{content.subtitle}</p>
          )}
          {content.authorOrSource && (
            <p className="text-xs text-slate-400 font-medium">Sumber: {content.authorOrSource}</p>
          )}
        </div>

        {/* Color-Coded Structural Analysis Panel (Ide Pokok, Kalimat Utama, Tokoh, Amanat) */}
        <div className="bg-slate-50 border-2 border-indigo-200 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">🎨 Pembeda Warna</span>
              <div>
                <h3 className="text-sm font-black text-slate-900">Bedah Unsur & Struktur Teks</h3>
                <p className="text-[11px] text-slate-500">
                  Perhatikan pembeda warna untuk Ide Pokok, Kalimat Utama, Tokoh Utama, dan Amanat.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="text-xs font-bold text-indigo-700 bg-white hover:bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200 shadow-2xs transition-all cursor-pointer"
            >
              {showAnalysis ? 'Sembunyikan Unsur ▲' : 'Tampilkan Unsur ▼'}
            </button>
          </div>

          {showAnalysis && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 animate-fade-in">
              {/* 1. Kalimat Utama */}
              <div className="bg-amber-50 border border-amber-300 p-3.5 rounded-2xl space-y-1">
                <span className="inline-flex items-center space-x-1 bg-amber-300 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border border-amber-400">
                  <span>🟨 Kalimat Utama</span>
                </span>
                <p className="text-xs text-amber-950 font-medium leading-relaxed">
                  "{content.textAnalysis?.kalimatUtama || content.text.split('.')[0] + '.'}"
                </p>
              </div>

              {/* 2. Ide Pokok */}
              <div className="bg-sky-50 border border-sky-300 p-3.5 rounded-2xl space-y-1">
                <span className="inline-flex items-center space-x-1 bg-sky-300 text-sky-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border border-sky-400">
                  <span>🟦 Ide Pokok / Gagasan Utama</span>
                </span>
                <p className="text-xs text-sky-950 font-medium leading-relaxed">
                  "{content.textAnalysis?.idePokok || `Gagasan utama tentang ${content.title}`}"
                </p>
              </div>

              {/* 3. Tokoh Utama */}
              <div className="bg-emerald-50 border border-emerald-300 p-3.5 rounded-2xl space-y-1">
                <span className="inline-flex items-center space-x-1 bg-emerald-300 text-emerald-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border border-emerald-400">
                  <span>🟩 Tokoh Utama / Subjek</span>
                </span>
                <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                  "{content.textAnalysis?.tokohUtama || 'Tokoh atau subjek pembahasan utama'}"
                </p>
              </div>

              {/* 4. Amanat */}
              <div className="bg-purple-50 border border-purple-300 p-3.5 rounded-2xl space-y-1">
                <span className="inline-flex items-center space-x-1 bg-purple-300 text-purple-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border border-purple-400">
                  <span>💜 Amanat & Pesan Moral</span>
                </span>
                <p className="text-xs text-purple-950 font-medium leading-relaxed">
                  "{content.textAnalysis?.amanat || 'Pesan kebaikan dan hikmah penting dari teks'}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Toolbar: Audio TTS & Highlighter */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
          
          {/* Audio Button */}
          <button
            onClick={toggleAudio}
            className={`px-4 py-2 rounded-xl border flex items-center space-x-2 transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            <span>{isPlayingAudio ? 'Hentikan Suara' : '🔊 Bacakan Teks (Audio)'}</span>
          </button>

          {/* Highlighter Tools */}
          <div className="flex items-center space-x-2">
            <span className="text-slate-500 font-medium hidden sm:inline">Stabilo:</span>
            <button
              onClick={() => setHighlightColor('none')}
              className={`px-2.5 py-1 rounded-lg border cursor-pointer ${
                highlightColor === 'none' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              Mati
            </button>
            <button
              onClick={() => setHighlightColor('yellow')}
              className={`px-2.5 py-1 rounded-lg border cursor-pointer ${
                highlightColor === 'yellow' ? 'bg-amber-300 border-amber-500 font-bold text-slate-900' : 'bg-amber-100 text-amber-900 border-amber-200'
              }`}
            >
              🟨 Kuning
            </button>
            <button
              onClick={() => setHighlightColor('green')}
              className={`px-2.5 py-1 rounded-lg border cursor-pointer ${
                highlightColor === 'green' ? 'bg-emerald-300 border-emerald-500 font-bold text-slate-900' : 'bg-emerald-100 text-emerald-900 border-emerald-200'
              }`}
            >
              🟩 Hijau
            </button>
          </div>
        </div>

        {/* Custom Visual Renderer for Daily Life & Data Worlds */}
        {content.extraData?.type === 'whatsapp' && (
          <div className="bg-slate-100 p-4 rounded-3xl border border-slate-200 max-w-md mx-auto space-y-3">
            <div className="bg-emerald-700 text-white p-3 rounded-2xl text-xs font-bold flex items-center justify-between">
              <span>💬 Grup Whatsapp Sekolah Litera</span>
              <span>Online</span>
            </div>

            <div className="space-y-2">
              {content.extraData.chatMessages?.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[80%] ${
                    msg.isMe ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
                >
                  <span className="text-[10px] font-bold text-slate-500 px-1">{msg.sender}</span>
                  <div
                    className={`p-3 rounded-2xl text-xs shadow-2xs ${
                      msg.isMe
                        ? 'bg-emerald-600 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200'
                    }`}
                  >
                    <p className="leading-snug">{msg.text}</p>
                    <span className="text-[9px] opacity-75 mt-1 block text-right">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {content.extraData?.type === 'food_label' && content.extraData.labelDetails && (
          <div className="bg-amber-50/80 p-5 rounded-3xl border-2 border-amber-300 max-w-md mx-auto space-y-3 font-mono text-xs">
            <div className="text-center pb-2 border-b-2 border-amber-400">
              <h3 className="font-extrabold text-sm uppercase text-slate-900">{content.extraData.labelDetails.title}</h3>
              <p className="text-[10px] text-slate-600">INFORMASI NILAI GIZI / NUTRITION FACTS</p>
            </div>

            <div className="flex justify-between border-b border-amber-300 py-1">
              <span>Ukuran Per Sajian:</span>
              <span className="font-bold">{content.extraData.labelDetails.servingSize}</span>
            </div>

            <div className="flex justify-between border-b border-amber-300 py-1 text-sm font-black">
              <span>Energi Total:</span>
              <span>{content.extraData.labelDetails.calories}</span>
            </div>

            {content.extraData.labelDetails.warning && (
              <div className="bg-rose-100 text-rose-900 p-2.5 rounded-xl border border-rose-300 font-sans text-[11px] font-bold">
                ⚠️ {content.extraData.labelDetails.warning}
              </div>
            )}
          </div>
        )}

        {content.extraData?.type === 'infographic_chart' && content.extraData.chartData && (
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider text-center">
              📊 Visualisasi Data Grafik Batang
            </h3>

            <div className="space-y-3">
              {content.extraData.chartData.map((item, idx) => {
                const maxVal = Math.max(...(content.extraData?.chartData?.map((d) => d.value) || [100]));
                const pct = Math.round((item.value / maxVal) * 100);

                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-800">
                      <span>{item.label}</span>
                      <span className="text-emerald-700">{item.value} buku</span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: item.color || '#10b981' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Text Paragraphs */}
        <div className="prose max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 font-serif">
          {paragraphs.map((p, pIdx) => (
            <p key={pIdx} className="leading-loose">
              {p.split(' ').map((word, wIdx) => {
                const cleanWord = word.replace(/[^\w]/g, '').toLowerCase();
                const matchedVocab = content.vocabulary.find(
                  (v) => v.word.toLowerCase() === cleanWord
                );

                const globalIdx = pIdx * 100 + wIdx;
                const highlight = highlightedSentences[globalIdx];

                return (
                  <span
                    key={wIdx}
                    onClick={() => handleSentenceClick(globalIdx)}
                    className={`inline-block mr-1 transition-colors ${
                      highlight === 'yellow'
                        ? 'bg-amber-200 font-medium px-0.5 rounded-xs'
                        : highlight === 'green'
                        ? 'bg-emerald-200 font-medium px-0.5 rounded-xs'
                        : ''
                    }`}
                  >
                    {matchedVocab ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVocab(matchedVocab);
                        }}
                        className="text-emerald-800 font-bold underline decoration-emerald-400 decoration-2 hover:bg-emerald-100 px-1 py-0.5 rounded-md cursor-pointer inline-flex items-center"
                      >
                        {word}
                      </button>
                    ) : (
                      word
                    )}
                  </span>
                );
              })}
            </p>
          ))}
        </div>

        {/* Vocabulary Info Popup Banner */}
        {selectedVocab && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 shadow-sm animate-fade-in relative">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                  📖 Kamus Cilik Literaverse
                </span>
                <h4 className="text-base font-bold text-amber-950 mt-0.5">
                  Kata: <span className="underline decoration-amber-500">{selectedVocab.word}</span>
                </h4>
              </div>
              <button
                onClick={() => setSelectedVocab(null)}
                className="text-xs text-amber-800 font-bold hover:underline cursor-pointer"
              >
                Tutup [X]
              </button>
            </div>

            <p className="text-xs text-slate-800 font-medium mt-2">
              <strong>Arti Kata:</strong> {selectedVocab.meaning}
            </p>
            <p className="text-xs text-slate-600 italic mt-1 bg-white/70 p-2 rounded-xl border border-amber-200">
              "Contoh: {selectedVocab.example}"
            </p>
          </div>
        )}

      </div>

      {/* AKM Challenge Interactive Questions */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
              Tantangan Meaning Making AKM
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              Pertanyaan Pemahaman Teks ({content.questions.length} Soal)
            </h2>
          </div>
          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 inline mr-1" /> +30 XP / Soal
          </span>
        </div>

        <div className="space-y-8">
          {content.questions.map((q, qIdx) => {
            const isSubmitted = submittedQuestions[q.id];
            const currentAns = answers[q.id];

            let isCorrect = false;
            if (q.type === 'multiple_choice') {
              isCorrect = currentAns === q.correctOptionIndex;
            } else if (q.type === 'multi_select' && Array.isArray(currentAns)) {
              const expected = q.correctMultiIndices || [];
              isCorrect = currentAns.length === expected.length && currentAns.every((val) => expected.includes(val));
            }

            return (
              <div
                key={q.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isSubmitted
                    ? isCorrect
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : 'bg-rose-50/70 border-rose-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                      {qIdx + 1}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
                      Kompetensi: {q.skillTested}
                    </span>
                  </div>

                  {!isSubmitted && (
                    <button
                      onClick={() => handleAskAIHint(q)}
                      disabled={isLoadingHint}
                      className="text-xs text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-xl font-bold border border-indigo-200 flex items-center space-x-1 cursor-pointer transition-all"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      <span>{isLoadingHint ? 'Meminta Hint...' : '💡 Minta Petunjuk AI'}</span>
                    </button>
                  )}
                </div>

                <p className="text-sm sm:text-base font-bold text-slate-900 mb-4">
                  {q.prompt}
                </p>

                {/* Multiple Choice Options */}
                {q.type === 'multiple_choice' && q.options && (
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = currentAns === optIdx;
                      const isOptionCorrect = optIdx === q.correctOptionIndex;

                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                            isSubmitted
                              ? isOptionCorrect
                                ? 'bg-emerald-600 text-white font-bold border-emerald-700'
                                : isSelected
                                ? 'bg-rose-500 text-white border-rose-600'
                                : 'bg-white text-slate-500 border-slate-200'
                              : isSelected
                              ? 'bg-slate-900 text-white font-bold border-slate-900 shadow-xs'
                              : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className="flex items-center space-x-2">
                            <span className="font-mono font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt}</span>
                          </span>

                          {isSubmitted && isOptionCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Multi Select Checkboxes */}
                {q.type === 'multi_select' && q.options && (
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const selectedArray: number[] = currentAns || [];
                      const isChecked = selectedArray.includes(optIdx);

                      return (
                        <label
                          key={optIdx}
                          className={`flex items-center space-x-3 p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                            isChecked ? 'bg-emerald-50 border-emerald-400 font-bold' : 'bg-white border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            disabled={isSubmitted}
                            checked={isChecked}
                            onChange={() => handleToggleMultiSelect(q.id, optIdx)}
                            className="w-4 h-4 text-emerald-600 rounded-xs"
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* Submit Action per Question */}
                {!isSubmitted ? (
                  <div className="mt-4 flex justify-end">
                    <button
                      disabled={currentAns === undefined || (Array.isArray(currentAns) && currentAns.length === 0)}
                      onClick={() => handleSubmitQuestion(q)}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 transition-all shadow-xs cursor-pointer"
                    >
                      Jawab Soal Ini
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-slate-900 block">
                      {isCorrect ? '✅ Jawaban Kamu Tepat Sekali!' : '❌ Jawaban Kurang Tepat'}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>Penjelasan:</strong> {q.explanation}
                    </p>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* AI Hint Floating Box */}
        {aiHint && (
          <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl space-y-1 animate-fade-in">
            <span className="text-xs font-bold text-indigo-900 flex items-center">
              🦉 Ciko si Burung Hantu Pembimbing:
            </span>
            <p className="text-xs text-indigo-900 italic">"{aiHint}"</p>
          </div>
        )}

        {/* Completion Card */}
        {isFinishedAll && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 text-center space-y-3 animate-fade-in shadow-xl">
            <Sparkles className="w-10 h-10 text-amber-300 mx-auto animate-bounce" />
            <h3 className="text-2xl font-black">Selamat! Misi Bacaan Selesai!</h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto">
              Kamu telah membaca teks ini dengan cermat dan menyelesaikan seluruh soal pemahaman makna. Skor dan XP sudah ditambahkan ke Paspor Literasimu!
            </p>
            <button
              onClick={onBack}
              className="mt-2 px-6 py-3 rounded-2xl font-extrabold bg-white text-emerald-800 hover:bg-emerald-50 shadow-md transition-all cursor-pointer"
            >
              Kembali ke Peta / Dunia Teks
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
