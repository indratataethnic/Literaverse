import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Literaverse" });
});

// Endpoint for Writer World AI Evaluation
app.post("/api/ai/writer", async (req, res) => {
  try {
    const { promptType, storyTitle, storyContent, studentText, targetLevel } = req.body;

    if (!studentText || studentText.trim().length === 0) {
      return res.status(400).json({ error: "Teks tulisan siswa tidak boleh kosong." });
    }

    const systemInstruction = `Kamu adalah 'Guru Penjelajah Literaverse', pendamping literasi SD yang ramah, hangat, dan sangat mengapresiasi karya anak.
Tugasmu adalah menganalisis tulisan siswa sekolah dasar (tingkat level: ${targetLevel || 'Explorer/Adventurer'}) berdasarkan tugas yang diberikan: '${promptType}'.
Berikan penilaian positif, konstruktif, dan memotivasi dengan bahasa Indonesia yang ceria dan sesuai anak SD.

Aturan Penilaian:
1. Pahami cerita utama: "${storyTitle}" - ${storyContent}
2. Tugas siswa: ${promptType} (misal: membuat judul, melanjutkan cerita, memperbaiki kalimat, membuat akhiran, atau membuat ringkasan).
3. Evaluasi tulisan siswa: "${studentText}"
4. Berikan output dalam format JSON sesuai schema:
   - score: angka 1 sampai 5 (1 = perlu mencoba lagi, 5 = luar biasa)
   - praise: kata-kata pujian ramah anak tentang poin bagus tulisan siswa
   - improvement: 1-2 saran sederhana yang mudah dipahami anak untuk membuat tulisannya semakin bagus
   - badgeEarned: nama lencana apresiasi (contoh: "Pena Emas Cilik", "Penulis Imajinatif", "Penyusun Kata Handal", "Penyimpul Hebat")
   - correctedText: versi suntingan indah dari tulisan siswa (jika perlu perbaikan ejaan/tanda baca)`;

    const promptMessage = `Evaluasi tulisan siswa berikut:
Judul Tugas: ${storyTitle}
Tipe Tugas: ${promptType}
Tulisan Siswa: "${studentText}"`;

    if (!process.env.GEMINI_API_KEY) {
      // Fallback response if GEMINI_API_KEY is not set yet in env
      return res.json({
        score: 5,
        praise: "Hebat sekali! Tulisanmu sangat menarik dan menunjukkan imajinasi yang luas!",
        improvement: "Cobalah gunakan tanda baca seperti titik dan koma dengan tepat agar pembaca makin nyaman membaca caritamu.",
        badgeEarned: "Penulis Imajinatif Cilik",
        correctedText: studentText
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptMessage,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "Skor bintang 1-5" },
            praise: { type: Type.STRING, description: "Pujian ramah anak" },
            improvement: { type: Type.STRING, description: "Saran perbaikan ramah anak" },
            badgeEarned: { type: Type.STRING, description: "Lencana apresiasi" },
            correctedText: { type: Type.STRING, description: "Versi perbaikan ejaan" }
          },
          required: ["score", "praise", "improvement", "badgeEarned", "correctedText"]
        }
      }
    });

    const jsonText = response.text ? response.text.trim() : "{}";
    const result = JSON.parse(jsonText);
    res.json(result);

  } catch (error: any) {
    console.error("Error in /api/ai/writer:", error);
    res.status(500).json({
      error: "Gagal memproses evaluasi AI",
      score: 4,
      praise: "Wah, usahamu sangat bagus! Ceritamu menunjukkan pemahaman yang baik.",
      improvement: "Teruslah berlatih membaca dan menulis setiap hari!",
      badgeEarned: "Bintang Literasi",
      correctedText: req.body.studentText
    });
  }
});

// Endpoint for AI Hint / Clue Assistant
app.post("/api/ai/hint", async (req, res) => {
  try {
    const { passageTitle, passageText, questionText, studentAnswer } = req.body;

    const systemInstruction = `Kamu adalah 'Ciko si Burung Hantu Literasi', maskot pembimbing belajar literasi SD.
Berikan petunjuk/clue sederhana ramah anak (tanpa membocorkan jawaban langsung!) agar siswa bisa menemukan jawabannya sendiri dari bacaan.
Gunakan bahasa Indonesia yang singkat, ramah, dan memotivasi (maksimal 2-3 kalimat).`;

    const promptMessage = `Bacaan: "${passageTitle}"
Isi Teks: ${passageText}
Pertanyaan AKM: "${questionText}"
Bantu berikan petunjuk belajar untuk siswa.`;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        hint: "Coba baca kembali paragraf pertama dengan saksama. Perhatikan kata kunci yang ditanyakan!"
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptMessage,
      config: {
        systemInstruction,
      }
    });

    res.json({ hint: response.text || "Bacalah kembali paragraf terkait dengan teliti ya!" });
  } catch (err) {
    res.json({ hint: "Perhatikan kata kunci dalam teks bacaan dan padukan dengan apa yang ditanyakan!" });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Literaverse Server running on http://localhost:${PORT}`);
  });
}

startServer();
