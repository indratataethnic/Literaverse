import React, { useState, useRef, useEffect } from 'react';
import { Volume2, RefreshCw, CheckCircle2, Sparkles, Eraser, Palette, ArrowLeft, Award, Star, Navigation, Compass } from 'lucide-react';
import { StudentProfile } from '../types';

interface AbjadCanvasViewProps {
  profile: StudentProfile;
  onAwardXp: (xp: number, letterMastered: string) => void;
  onBackToMap: () => void;
}

interface LetterInfo {
  char: string;
  word: string;
  icon: string;
}

interface StrokeGuide {
  num: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  controlX?: number;
  controlY?: number;
  controlX2?: number;
  controlY2?: number;
  arrowSymbol: string;
  description: string;
}

const BADGE_COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

function getStrokeGuides(char: string): StrokeGuide[] {
  const c = char;

  switch (c) {
    // CAPITAL LETTERS
    case 'A':
      return [
        { num: 1, startX: 225, startY: 75, endX: 150, endY: 275, arrowSymbol: '↙️', description: 'Garis miring kiri dari puncak ke bawah' },
        { num: 2, startX: 225, startY: 75, endX: 300, endY: 275, arrowSymbol: '↘️', description: 'Garis miring kanan dari puncak ke bawah' },
        { num: 3, startX: 175, startY: 185, endX: 275, endY: 185, arrowSymbol: '➡️', description: 'Garis mendatar di tengah' },
      ];
    case 'B':
      return [
        { num: 1, startX: 160, startY: 75, endX: 160, endY: 275, arrowSymbol: '⬇️', description: 'Garis tegak lurus dari atas ke bawah' },
        { num: 2, startX: 160, startY: 75, endX: 160, endY: 175, controlX: 280, controlY: 125, arrowSymbol: '↩️', description: 'Lengkungan perut atas melengkung ke kanan' },
        { num: 3, startX: 160, startY: 175, endX: 160, endY: 275, controlX: 290, controlY: 225, arrowSymbol: '↩️', description: 'Lengkungan perut bawah melengkung ke kanan' },
      ];
    case 'C':
      return [
        { num: 1, startX: 280, startY: 100, endX: 280, endY: 250, controlX: 130, controlY: 175, arrowSymbol: '🔄', description: 'Melengkung melingkar dari kanan atas ke bawah' },
      ];
    case 'D':
      return [
        { num: 1, startX: 160, startY: 75, endX: 160, endY: 275, arrowSymbol: '⬇️', description: 'Garis lurus tegak turun ke bawah' },
        { num: 2, startX: 160, startY: 75, endX: 160, endY: 275, controlX: 320, controlY: 175, arrowSymbol: '↪️', description: 'Lengkungan perut besar melengkung ke kanan' },
      ];
    case 'E':
      return [
        { num: 1, startX: 170, startY: 75, endX: 170, endY: 275, arrowSymbol: '⬇️', description: 'Garis lurus tegak turun ke bawah' },
        { num: 2, startX: 170, startY: 75, endX: 270, endY: 75, arrowSymbol: '➡️', description: 'Garis horizontal atap atas' },
        { num: 3, startX: 170, startY: 175, endX: 250, endY: 175, arrowSymbol: '➡️', description: 'Garis horizontal tengah' },
        { num: 4, startX: 170, startY: 275, endX: 270, endY: 275, arrowSymbol: '➡️', description: 'Garis horizontal alas bawah' },
      ];
    case 'F':
      return [
        { num: 1, startX: 170, startY: 75, endX: 170, endY: 275, arrowSymbol: '⬇️', description: 'Garis lurus tegak turun ke bawah' },
        { num: 2, startX: 170, startY: 75, endX: 270, endY: 75, arrowSymbol: '➡️', description: 'Garis horizontal atap atas' },
        { num: 3, startX: 170, startY: 175, endX: 250, endY: 175, arrowSymbol: '➡️', description: 'Garis horizontal tengah' },
      ];
    case 'G':
      return [
        { num: 1, startX: 280, startY: 100, endX: 240, endY: 270, controlX: 130, controlY: 175, arrowSymbol: '🔄', description: 'Melengkung melingkar dari kanan atas ke bawah' },
        { num: 2, startX: 240, startY: 270, endX: 280, endY: 180, arrowSymbol: '⬆️', description: 'Tarik garis tegak ke atas' },
        { num: 3, startX: 280, startY: 180, endX: 225, endY: 180, arrowSymbol: '⬅️', description: 'Garis mendatar ke kiri' },
      ];
    case 'H':
      return [
        { num: 1, startX: 160, startY: 75, endX: 160, endY: 275, arrowSymbol: '⬇️', description: 'Garis lurus kiri turun ke bawah' },
        { num: 2, startX: 290, startY: 75, endX: 290, endY: 275, arrowSymbol: '⬇️', description: 'Garis lurus kanan turun ke bawah' },
        { num: 3, startX: 160, startY: 175, endX: 290, endY: 175, arrowSymbol: '➡️', description: 'Garis penghubung horizontal di tengah' },
      ];
    case 'I':
      return [
        { num: 1, startX: 225, startY: 75, endX: 225, endY: 275, arrowSymbol: '⬇️', description: 'Garis lurus tegak turun ke bawah' },
      ];
    case 'J':
      return [
        { num: 1, startX: 250, startY: 75, endX: 250, endY: 230, arrowSymbol: '⬇️', description: 'Garis tegak turun dari atas' },
        { num: 2, startX: 250, startY: 230, endX: 180, endY: 210, controlX: 250, controlY: 280, arrowSymbol: '↩️', description: 'Lengkungkan kail melengkung ke kiri atas' },
      ];
    case 'K':
      return [
        { num: 1, startX: 160, startY: 75, endX: 160, endY: 275, arrowSymbol: '⬇️', description: 'Garis tegak lurus kiri' },
        { num: 2, startX: 280, startY: 75, endX: 160, endY: 175, arrowSymbol: '↙️', description: 'Garis miring dari kanan atas ke tengah' },
        { num: 3, startX: 160, startY: 175, endX: 280, endY: 275, arrowSymbol: '↘️', description: 'Garis miring dari tengah ke kanan bawah' },
      ];
    case 'L':
      return [
        { num: 1, startX: 170, startY: 75, endX: 170, endY: 275, arrowSymbol: '⬇️', description: 'Garis lurus tegak ke bawah' },
        { num: 2, startX: 170, startY: 275, endX: 270, endY: 275, arrowSymbol: '➡️', description: 'Garis horizontal di alas bawah' },
      ];
    case 'M':
      return [
        { num: 1, startX: 150, startY: 275, endX: 150, endY: 75, arrowSymbol: '⬆️', description: 'Tarik garis tegak dari bawah ke atas' },
        { num: 2, startX: 150, startY: 75, endX: 225, endY: 220, arrowSymbol: '↘️', description: 'Garis miring turun ke tengah' },
        { num: 3, startX: 225, startY: 220, endX: 300, endY: 75, arrowSymbol: '↗️', description: 'Garis miring naik ke kanan atas' },
        { num: 4, startX: 300, startY: 75, endX: 300, endY: 275, arrowSymbol: '⬇️', description: 'Garis lurus tegak turun ke bawah' },
      ];
    case 'N':
      return [
        { num: 1, startX: 160, startY: 275, endX: 160, endY: 75, arrowSymbol: '⬆️', description: 'Tarik garis tegak naik dari bawah' },
        { num: 2, startX: 160, startY: 75, endX: 290, endY: 275, arrowSymbol: '↘️', description: 'Garis miring diagonal ke kanan bawah' },
        { num: 3, startX: 290, startY: 275, endX: 290, endY: 75, arrowSymbol: '⬆️', description: 'Tarik garis tegak naik ke atas' },
      ];
    case 'O':
      return [
        { num: 1, startX: 225, startY: 75, endX: 225, endY: 275, controlX: 120, controlY: 175, arrowSymbol: '🔄', description: 'Lengkungan kiri melingkar ke bawah' },
        { num: 2, startX: 225, startY: 275, endX: 225, endY: 75, controlX: 330, controlY: 175, arrowSymbol: '🔄', description: 'Lengkungan kanan melingkar kembali ke atas' },
      ];
    case 'P':
      return [
        { num: 1, startX: 160, startY: 75, endX: 160, endY: 275, arrowSymbol: '⬇️', description: 'Garis tegak lurus turun ke bawah' },
        { num: 2, startX: 160, startY: 75, endX: 160, endY: 175, controlX: 280, controlY: 125, arrowSymbol: '↪️', description: 'Lengkungan kepala melengkung di kanan atas' },
      ];
    case 'Q':
      return [
        { num: 1, startX: 225, startY: 75, endX: 225, endY: 275, controlX: 120, controlY: 175, arrowSymbol: '🔄', description: 'Lengkungan kiri melingkar ke bawah' },
        { num: 2, startX: 225, startY: 275, endX: 225, endY: 75, controlX: 330, controlY: 175, arrowSymbol: '🔄', description: 'Lengkungan kanan melingkar kembali ke atas' },
        { num: 3, startX: 230, startY: 220, endX: 290, endY: 280, arrowSymbol: '↘️', description: 'Garis miring ekor kecil di kanan bawah' },
      ];
    case 'R':
      return [
        { num: 1, startX: 160, startY: 75, endX: 160, endY: 275, arrowSymbol: '⬇️', description: 'Garis tegak lurus ke bawah' },
        { num: 2, startX: 160, startY: 75, endX: 160, endY: 175, controlX: 280, controlY: 125, arrowSymbol: '↪️', description: 'Lengkungan kepala melengkung di kanan atas' },
        { num: 3, startX: 160, startY: 175, endX: 280, endY: 275, arrowSymbol: '↘️', description: 'Garis miring kaki ke kanan bawah' },
      ];
    case 'S':
      return [
        { num: 1, startX: 270, startY: 95, endX: 180, endY: 255, controlX: 140, controlY: 95, controlX2: 310, controlY2: 255, arrowSymbol: '🐍', description: 'Lengkungan ular bergelombang halus dari kanan atas ke bawah' },
      ];
    case 'T':
      return [
        { num: 1, startX: 150, startY: 75, endX: 300, endY: 75, arrowSymbol: '➡️', description: 'Garis mendatar di atap topi' },
        { num: 2, startX: 225, startY: 75, endX: 225, endY: 275, arrowSymbol: '⬇️', description: 'Garis lurus tegak di tengah turun ke bawah' },
      ];
    case 'U':
      return [
        { num: 1, startX: 160, startY: 75, endX: 290, endY: 75, controlX: 225, controlY: 330, arrowSymbol: '↪️', description: 'Melengkung dari kiri atas melintasi bawah lalu naik ke kanan' },
      ];
    case 'V':
      return [
        { num: 1, startX: 150, startY: 75, endX: 225, endY: 275, arrowSymbol: '↘️', description: 'Garis miring turun ke tengah bawah' },
        { num: 2, startX: 225, startY: 275, endX: 300, endY: 75, arrowSymbol: '↗️', description: 'Garis miring naik ke kanan atas' },
      ];
    case 'W':
      return [
        { num: 1, startX: 140, startY: 75, endX: 180, endY: 275, arrowSymbol: '↘️', description: 'Garis miring pertama turun ke bawah' },
        { num: 2, startX: 180, startY: 275, endX: 225, endY: 150, arrowSymbol: '↗️', description: 'Garis miring kedua naik ke tengah' },
        { num: 3, startX: 225, startY: 150, endX: 270, endY: 275, arrowSymbol: '↘️', description: 'Garis miring ketiga turun ke bawah' },
        { num: 4, startX: 270, startY: 275, endX: 310, endY: 75, arrowSymbol: '↗️', description: 'Garis miring keempat naik ke kanan' },
      ];
    case 'X':
      return [
        { num: 1, startX: 160, startY: 75, endX: 290, endY: 275, arrowSymbol: '↘️', description: 'Garis silang miring pertama ke kanan bawah' },
        { num: 2, startX: 290, startY: 75, endX: 160, endY: 275, arrowSymbol: '↙️', description: 'Garis silang miring kedua ke kiri bawah' },
      ];
    case 'Y':
      return [
        { num: 1, startX: 150, startY: 75, endX: 225, endY: 175, arrowSymbol: '↘️', description: 'Garis miring kiri pendek ke tengah' },
        { num: 2, startX: 300, startY: 75, endX: 225, endY: 175, arrowSymbol: '↙️', description: 'Garis miring kanan pendek ke tengah' },
        { num: 3, startX: 225, startY: 175, endX: 225, endY: 275, arrowSymbol: '⬇️', description: 'Garis lurus kaki di tengah turun ke bawah' },
      ];
    case 'Z':
      return [
        { num: 1, startX: 160, startY: 75, endX: 290, endY: 75, arrowSymbol: '➡️', description: 'Garis horizontal atap atas' },
        { num: 2, startX: 290, startY: 75, endX: 160, endY: 275, arrowSymbol: '↙️', description: 'Garis miring diagonal ke kiri bawah' },
        { num: 3, startX: 160, startY: 275, endX: 290, endY: 275, arrowSymbol: '➡️', description: 'Garis horizontal alas bawah' },
      ];

    // LOWERCASE LETTERS
    case 'a':
      return [
        { num: 1, startX: 260, startY: 160, endX: 260, endY: 250, controlX: 140, controlY: 205, arrowSymbol: '🔄', description: 'Lengkungkan perut melingkar di tengah' },
        { num: 2, startX: 265, startY: 140, endX: 265, endY: 270, arrowSymbol: '⬇️', description: 'Tarik garis tegak lurus di kanan' },
      ];
    case 'b':
      return [
        { num: 1, startX: 165, startY: 70, endX: 165, endY: 270, arrowSymbol: '⬇️', description: 'Tarik garis tinggi dari atas ke bawah' },
        { num: 2, startX: 165, startY: 180, endX: 165, endY: 270, controlX: 280, controlY: 225, arrowSymbol: '🔄', description: 'Lengkungkan lingkaran perut kanan bawah' },
      ];
    case 'c':
      return [
        { num: 1, startX: 260, startY: 150, endX: 260, endY: 250, controlX: 160, controlY: 200, arrowSymbol: '🔄', description: 'Lengkungkan setengah lingkaran kecil' },
      ];
    case 'd':
      return [
        { num: 1, startX: 260, startY: 180, endX: 260, endY: 270, controlX: 145, controlY: 225, arrowSymbol: '🔄', description: 'Lengkungkan perut melingkar di sebelah kiri' },
        { num: 2, startX: 260, startY: 70, endX: 260, endY: 270, arrowSymbol: '⬇️', description: 'Tarik garis tinggi tegak lurus di kanan' },
      ];
    case 'e':
      return [
        { num: 1, startX: 170, startY: 200, endX: 260, endY: 200, arrowSymbol: '➡️', description: 'Garis mendatar di tengah' },
        { num: 2, startX: 260, startY: 200, endX: 260, endY: 250, controlX: 150, controlY: 110, arrowSymbol: '🔄', description: 'Melengkung melingkar ke atap lalu ke bawah' },
      ];
    case 'g':
      return [
        { num: 1, startX: 260, startY: 150, endX: 260, endY: 220, controlX: 150, controlY: 185, arrowSymbol: '🔄', description: 'Lengkungkan perut bulat di atas' },
        { num: 2, startX: 260, startY: 150, endX: 180, endY: 310, controlX: 260, controlY: 340, arrowSymbol: '↩️', description: 'Tarik ekor melengkung ke kiri bawah' },
      ];
    case 'h':
      return [
        { num: 1, startX: 165, startY: 70, endX: 165, endY: 270, arrowSymbol: '⬇️', description: 'Tarik garis tegak tinggi dari atas' },
        { num: 2, startX: 165, startY: 180, endX: 260, endY: 270, controlX: 230, controlY: 140, arrowSymbol: '↪️', description: 'Lengkungkan bukit melengkung ke kanan bawah' },
      ];
    case 'm':
      return [
        { num: 1, startX: 150, startY: 160, endX: 150, endY: 270, arrowSymbol: '⬇️', description: 'Garis lurus batang kiri' },
        { num: 2, startX: 150, startY: 190, endX: 210, endY: 270, controlX: 190, controlY: 140, arrowSymbol: '↪️', description: 'Bukit melengkung pertama' },
        { num: 3, startX: 210, startY: 190, endX: 270, endY: 270, controlX: 250, controlY: 140, arrowSymbol: '↪️', description: 'Bukit melengkung kedua' },
      ];
    case 'n':
      return [
        { num: 1, startX: 160, startY: 160, endX: 160, endY: 270, arrowSymbol: '⬇️', description: 'Garis lurus batang kiri' },
        { num: 2, startX: 160, startY: 190, endX: 260, endY: 270, controlX: 225, controlY: 140, arrowSymbol: '↪️', description: 'Bukit melengkung ke kanan' },
      ];
    case 'o':
      return [
        { num: 1, startX: 225, startY: 150, endX: 225, endY: 270, controlX: 150, controlY: 210, arrowSymbol: '🔄', description: 'Lengkungan kiri melingkar ke bawah' },
        { num: 2, startX: 225, startY: 270, endX: 225, endY: 150, controlX: 300, controlY: 210, arrowSymbol: '🔄', description: 'Lengkungan kanan melingkar kembali ke atas' },
      ];
    case 'p':
      return [
        { num: 1, startX: 165, startY: 150, endX: 165, endY: 330, arrowSymbol: '⬇️', description: 'Tarik ekor panjang tegak ke bawah' },
        { num: 2, startX: 165, startY: 150, endX: 165, endY: 240, controlX: 270, controlY: 195, arrowSymbol: '↪️', description: 'Lengkungkan kepala perut kanan' },
      ];
    case 'q':
      return [
        { num: 1, startX: 260, startY: 150, endX: 260, endY: 240, controlX: 155, controlY: 195, arrowSymbol: '🔄', description: 'Lengkungkan kepala perut kiri' },
        { num: 2, startX: 260, startY: 150, endX: 260, endY: 330, arrowSymbol: '⬇️', description: 'Tarik ekor panjang tegak di kanan' },
      ];
    case 'r':
      return [
        { num: 1, startX: 170, startY: 160, endX: 170, endY: 270, arrowSymbol: '⬇️', description: 'Garis batang pendek ke bawah' },
        { num: 2, startX: 170, startY: 190, endX: 250, endY: 170, controlX: 210, controlY: 150, arrowSymbol: '↗️', description: 'Lengkungkan cabang kecil ke kanan' },
      ];
    case 's':
      return [
        { num: 1, startX: 250, startY: 160, endX: 190, endY: 260, controlX: 160, controlY: 160, controlX2: 280, controlY2: 260, arrowSymbol: '🐍', description: 'Lengkungan ular kecil bergelombang' },
      ];
    case 'u':
      return [
        { num: 1, startX: 170, startY: 160, endX: 260, endY: 160, controlX: 215, controlY: 300, arrowSymbol: '↪️', description: 'Melengkung dari kiri atas melintasi bawah lalu naik' },
        { num: 2, startX: 260, startY: 160, endX: 260, endY: 270, arrowSymbol: '⬇️', description: 'Tarik ekor pendek tegak ke bawah' },
      ];

    // NUMBERS
    case '1':
      return [
        { num: 1, startX: 190, startY: 120, endX: 225, endY: 80, arrowSymbol: '↗️', description: 'Tarik garis miring kecil ke puncak' },
        { num: 2, startX: 225, startY: 80, endX: 225, endY: 275, arrowSymbol: '⬇️', description: 'Tarik garis tegak lurus ke bawah' },
      ];
    case '2':
      return [
        { num: 1, startX: 170, startY: 110, endX: 170, endY: 275, controlX: 310, controlY: 80, controlX2: 190, controlY2: 220, arrowSymbol: '↪️', description: 'Lengkungkan kepala atas lalu miring ke alas bawah' },
        { num: 2, startX: 170, startY: 275, endX: 280, endY: 275, arrowSymbol: '➡️', description: 'Tarik garis lurus mendatar di bawah' },
      ];
    case '3':
      return [
        { num: 1, startX: 170, startY: 90, endX: 225, endY: 170, controlX: 290, controlY: 80, arrowSymbol: '↪️', description: 'Lengkungkan lengkung atas melengkung ke tengah' },
        { num: 2, startX: 225, startY: 170, endX: 170, endY: 260, controlX: 300, controlY: 260, arrowSymbol: '↪️', description: 'Lengkungkan lengkung bawah melengkung ke kiri' },
      ];
    case '5':
      return [
        { num: 1, startX: 260, startY: 90, endX: 180, endY: 90, arrowSymbol: '⬅️', description: 'Garis mendatar atap atas' },
        { num: 2, startX: 180, startY: 90, endX: 180, endY: 170, arrowSymbol: '⬇️', description: 'Garis tegak pendek turun' },
        { num: 3, startX: 180, startY: 170, endX: 180, endY: 270, controlX: 300, controlY: 215, arrowSymbol: '↪️', description: 'Lengkungkan perut bawah ke kanan' },
      ];
    case '6':
      return [
        { num: 1, startX: 260, startY: 90, endX: 225, endY: 275, controlX: 140, controlY: 180, arrowSymbol: '🔄', description: 'Melengkung dari kanan atas turun ke bawah' },
        { num: 2, startX: 225, startY: 275, endX: 180, endY: 200, controlX: 310, controlY: 250, arrowSymbol: '🔄', description: 'Lengkungkan lingkaran perut melingkar' },
      ];
    case '8':
      return [
        { num: 1, startX: 225, startY: 75, endX: 225, endY: 175, controlX: 140, controlY: 75, controlX2: 310, controlY2: 175, arrowSymbol: '♾️', description: 'Lingkaran atas bergelombang' },
        { num: 2, startX: 225, startY: 175, endX: 225, endY: 275, controlX: 140, controlY: 175, controlX2: 310, controlY2: 275, arrowSymbol: '♾️', description: 'Lingkaran bawah bergelombang' },
      ];
    case '9':
      return [
        { num: 1, startX: 260, startY: 170, endX: 260, endY: 90, controlX: 140, controlY: 130, arrowSymbol: '🔄', description: 'Lengkungkan kepala bulat di atas' },
        { num: 2, startX: 260, startY: 170, endX: 180, endY: 270, controlX: 270, controlY: 260, arrowSymbol: '↩️', description: 'Tarik ekor melengkung ke kiri bawah' },
      ];
    case '0':
      return [
        { num: 1, startX: 225, startY: 75, endX: 225, endY: 275, controlX: 130, controlY: 175, arrowSymbol: '🔄', description: 'Lengkungkan oval kiri melingkar ke bawah' },
        { num: 2, startX: 225, startY: 275, endX: 225, endY: 75, controlX: 320, controlY: 175, arrowSymbol: '🔄', description: 'Lengkungkan oval kanan melingkar kembali ke atas' },
      ];

    default:
      return [
        { num: 1, startX: 225, startY: 80, endX: 225, endY: 270, arrowSymbol: '⬇️', description: 'Ikuti garis panduan dari atas ke bawah' },
      ];
  }
}

const CAPITAL_LETTERS: LetterInfo[] = [
  { char: 'A', word: 'Apel', icon: '🍎' },
  { char: 'B', word: 'Bola', icon: '⚽' },
  { char: 'C', word: 'Cangkir', icon: '☕' },
  { char: 'D', word: 'Domba', icon: '🐑' },
  { char: 'E', word: 'Elang', icon: '🦅' },
  { char: 'F', word: 'Foto', icon: '📷' },
  { char: 'G', word: 'Gajah', icon: '🐘' },
  { char: 'H', word: 'Harimau', icon: '🐯' },
  { char: 'I', word: 'Ikan', icon: '🐟' },
  { char: 'J', word: 'Jeruk', icon: '🍊' },
  { char: 'K', word: 'Kucing', icon: '🐱' },
  { char: 'L', word: 'Lilin', icon: '🕯️' },
  { char: 'M', word: 'Matahari', icon: '☀️' },
  { char: 'N', word: 'Nasi', icon: '🍚' },
  { char: 'O', word: 'Obat', icon: '💊' },
  { char: 'P', word: 'Pisang', icon: '🍌' },
  { char: 'Q', word: 'Quran', icon: '📖' },
  { char: 'R', word: 'Rusa', icon: '🦌' },
  { char: 'S', word: 'Sepatu', icon: '👟' },
  { char: 'T', word: 'Topi', icon: '🧢' },
  { char: 'U', word: 'Ular', icon: '🐍' },
  { char: 'V', word: 'Vase', icon: '🏺' },
  { char: 'W', word: 'Wortel', icon: '🥕' },
  { char: 'X', word: 'Xilofon', icon: '🎼' },
  { char: 'Y', word: 'Yo-yo', icon: '🪀' },
  { char: 'Z', word: 'Zebra', icon: '🦓' },
];

const LOWERCASE_LETTERS: LetterInfo[] = CAPITAL_LETTERS.map((item) => ({
  char: item.char.toLowerCase(),
  word: item.word,
  icon: item.icon,
}));

const NUMBERS: LetterInfo[] = [
  { char: '0', word: 'Nol', icon: '0️⃣' },
  { char: '1', word: 'Satu Bintang', icon: '⭐' },
  { char: '2', word: 'Dua Bebek', icon: '🦆' },
  { char: '3', word: 'Tiga Mobil', icon: '🚗' },
  { char: '4', word: 'Empat Bunga', icon: '🌸' },
  { char: '5', word: 'Lima Jari', icon: '🖐️' },
  { char: '6', word: 'Enam Balon', icon: '🎈' },
  { char: '7', word: 'Tujuh Pelangi', icon: '🌈' },
  { char: '8', word: 'Delapan Jamur', icon: '🍄' },
  { char: '9', word: 'Sembilan Ikan', icon: '🐠' },
];

const BRUSH_COLORS = [
  { label: 'Hijau', color: '#10b981' },
  { label: 'Biru', color: '#3b82f6' },
  { label: 'Merah', color: '#ef4444' },
  { label: 'Kuning', color: '#f59e0b' },
  { label: 'Ungu', color: '#8b5cf6' },
  { label: 'Hitam', color: '#1e293b' },
];

export const AbjadCanvasView: React.FC<AbjadCanvasViewProps> = ({
  profile,
  onAwardXp,
  onBackToMap,
}) => {
  const [tabMode, setTabMode] = useState<'capital' | 'lowercase' | 'numbers'>('capital');
  const [selectedItem, setSelectedItem] = useState<LetterInfo>(CAPITAL_LETTERS[0]);
  const [brushColor, setBrushColor] = useState<string>('#10b981');
  const [lineWidth, setLineWidth] = useState<number>(14);
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [masteredList, setMasteredList] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);
  const [showArrows, setShowArrows] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);

  const currentList =
    tabMode === 'capital' ? CAPITAL_LETTERS : tabMode === 'lowercase' ? LOWERCASE_LETTERS : NUMBERS;

  // Speak letter pronunciation
  const speakLetter = (item: LetterInfo) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `Huruf ${item.char}. ${item.word}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Switch letter
  const handleSelectLetter = (item: LetterInfo) => {
    setSelectedItem(item);
    setIsSuccess(false);
    setHasDrawn(false);
    clearCanvas();
    speakLetter(item);
  };

  // Draw background guide template text with directional arrows
  const drawGuideTemplate = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Grid lines for kid writing alignment
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    
    // Horizontal center & guide lines
    ctx.beginPath();
    ctx.moveTo(0, height * 0.25);
    ctx.lineTo(width, height * 0.25);
    ctx.moveTo(0, height * 0.5);
    ctx.lineTo(width, height * 0.5);
    ctx.moveTo(0, height * 0.75);
    ctx.lineTo(width, height * 0.75);
    ctx.stroke();

    // Solid base line
    ctx.setLineDash([]);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(20, height * 0.82);
    ctx.lineTo(width - 20, height * 0.82);
    ctx.stroke();

    // Dashed guide text for tracing
    ctx.font = 'bold 220px "Fredoka", "Comic Sans MS", sans-serif, system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Outer stroke outline guide
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 6;
    ctx.setLineDash([12, 10]);
    ctx.strokeText(selectedItem.char, width / 2, height / 2);

    // Inner fill light shadow guide
    ctx.fillStyle = '#f1f5f9';
    ctx.setLineDash([]);
    ctx.fillText(selectedItem.char, width / 2, height / 2);

    // Render stroke order direction arrows & start badges if enabled
    if (showArrows) {
      const strokeGuides = getStrokeGuides(selectedItem.char);
      strokeGuides.forEach((sg) => {
        const color = BADGE_COLORS[(sg.num - 1) % BADGE_COLORS.length];

        // 1. Dashed direction line (curved if control points are provided)
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3.5;
        ctx.setLineDash([6, 6]);
        ctx.moveTo(sg.startX, sg.startY);

        let angle = 0;
        if (sg.controlX !== undefined && sg.controlY !== undefined) {
          if (sg.controlX2 !== undefined && sg.controlY2 !== undefined) {
            ctx.bezierCurveTo(sg.controlX, sg.controlY, sg.controlX2, sg.controlY2, sg.endX, sg.endY);
            angle = Math.atan2(sg.endY - sg.controlY2, sg.endX - sg.controlX2);
          } else {
            ctx.quadraticCurveTo(sg.controlX, sg.controlY, sg.endX, sg.endY);
            angle = Math.atan2(sg.endY - sg.controlY, sg.endX - sg.controlX);
          }
        } else {
          ctx.lineTo(sg.endX, sg.endY);
          angle = Math.atan2(sg.endY - sg.startY, sg.endX - sg.startX);
        }
        ctx.stroke();

        // 2. Arrowhead triangle at destination
        const headlen = 13;

        ctx.setLineDash([]);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(sg.endX, sg.endY);
        ctx.lineTo(
          sg.endX - headlen * Math.cos(angle - Math.PI / 6),
          sg.endY - headlen * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          sg.endX - headlen * Math.cos(angle + Math.PI / 6),
          sg.endY - headlen * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();

        // 3. Numbered Start Badge Circle
        const radius = 13;
        // White border ring
        ctx.beginPath();
        ctx.arc(sg.startX, sg.startY, radius + 3, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Solid badge circle
        ctx.beginPath();
        ctx.arc(sg.startX, sg.startY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();

        // Number text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px "Fredoka", sans-serif, system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sg.num.toString(), sg.startX, sg.startY + 1);

        ctx.restore();
      });
    }

    ctx.restore();
  };

  // Clear canvas and redraw template
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawGuideTemplate(ctx, canvas.width, canvas.height);
    setHasDrawn(false);
    setIsSuccess(false);
  };

  // Setup Canvas on Mount / Resize / Letter change / Arrow toggle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high DPI canvas resolution
    canvas.width = 450;
    canvas.height = 360;

    drawGuideTemplate(ctx, canvas.width, canvas.height);
  }, [selectedItem, showArrows]);

  // Drawing event handlers
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    isDrawingRef.current = true;
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isErasing ? '#ffffff' : brushColor;
    ctx.lineWidth = isErasing ? lineWidth * 2.5 : lineWidth;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.closePath();
    }
  };

  // Finish writing evaluation
  const handleCompleteWriting = () => {
    if (!hasDrawn) return;

    setIsSuccess(true);
    if (!masteredList.includes(selectedItem.char)) {
      setMasteredList((prev) => [...prev, selectedItem.char]);
      onAwardXp(25, selectedItem.char);
    }

    // Audio celebration
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `Hebat sekali! Tulisan huruf ${selectedItem.char} kamu sangat bagus!`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <button
            onClick={onBackToMap}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-100 hover:text-white bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Peta</span>
          </button>
          
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            ✏️ Studio Menulis Abjad & Angka Interaktif
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed max-w-xl">
            Latih motorik halus dan kemampuan menulis huruf A-Z serta angka! Tebalkan garis, dengarkan suara pelafalan, dan dapatkan Bintang Prestasi!
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 text-center shrink-0 w-full sm:w-auto">
          <span className="text-[10px] font-extrabold uppercase tracking-wider block text-amber-200">
            Huruf Dikuasai
          </span>
          <span className="text-2xl font-black text-white">{masteredList.length}</span>
          <span className="text-[10px] text-indigo-100 block">
            {masteredList.length > 0 ? '🏆 Penulis Cilik' : 'Mulai berlatih!'}
          </span>
        </div>
      </div>

      {/* Tab Selector: Capital / Lowercase / Numbers */}
      <div className="flex flex-col items-center space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pilih Mode Latihan</span>
        <div className="bg-slate-200/90 p-1.5 rounded-2xl border border-slate-300 flex flex-wrap justify-center gap-1.5 shadow-inner">
          <button
            onClick={() => {
              setTabMode('capital');
              setSelectedItem(CAPITAL_LETTERS[0]);
              clearCanvas();
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center space-x-1.5 ${
              tabMode === 'capital' ? 'bg-indigo-600 text-white shadow-md scale-105' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
            }`}
          >
            <span>🔤</span>
            <span>Huruf Besar (A - Z)</span>
          </button>
          
          <button
            onClick={() => {
              setTabMode('lowercase');
              setSelectedItem(LOWERCASE_LETTERS[0]);
              clearCanvas();
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center space-x-1.5 ${
              tabMode === 'lowercase' ? 'bg-purple-600 text-white shadow-md scale-105' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
            }`}
          >
            <span>🔡</span>
            <span>Huruf Kecil (a - z)</span>
          </button>

          <button
            onClick={() => {
              setTabMode('numbers');
              setSelectedItem(NUMBERS[0]);
              clearCanvas();
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center space-x-1.5 ${
              tabMode === 'numbers' ? 'bg-amber-600 text-white shadow-md scale-105' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
            }`}
          >
            <span>🔢</span>
            <span>Angka (0 - 9)</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Letter List Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
          {currentList.map((item) => {
            const isSelected = selectedItem.char === item.char;
            const isDone = masteredList.includes(item.char);

            return (
              <button
                key={item.char}
                onClick={() => handleSelectLetter(item)}
                className={`w-12 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 font-extrabold text-base transition-all cursor-pointer relative border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-105'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{item.char}</span>
                <span className="text-[10px] opacity-80">{item.icon}</span>
                {isDone && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-slate-900 rounded-full text-[9px] flex items-center justify-center font-black shadow-xs">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Canvas Drawing Board */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-black shadow-xs">
                {selectedItem.char}
              </div>
              <div>
                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                  <h3 className="text-xl font-black text-slate-900">
                    Menebalkan Huruf {selectedItem.char}
                  </h3>
                  
                  {/* Mode Badge */}
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                    tabMode === 'capital' 
                      ? 'bg-indigo-100 text-indigo-800 border-indigo-200' 
                      : tabMode === 'lowercase'
                      ? 'bg-purple-100 text-purple-800 border-purple-200'
                      : 'bg-amber-100 text-amber-800 border-amber-200'
                  }`}>
                    {tabMode === 'capital' ? 'Huruf Besar' : tabMode === 'lowercase' ? 'Huruf Kecil' : 'Angka'}
                  </span>

                  {/* Quick Toggle Uppercase <-> Lowercase */}
                  {tabMode !== 'numbers' && (
                    <button
                      onClick={() => {
                        const targetChar = tabMode === 'capital' ? selectedItem.char.toLowerCase() : selectedItem.char.toUpperCase();
                        const nextTab = tabMode === 'capital' ? 'lowercase' : 'capital';
                        const nextList = nextTab === 'lowercase' ? LOWERCASE_LETTERS : CAPITAL_LETTERS;
                        const match = nextList.find((item) => item.char === targetChar) || nextList[0];
                        setTabMode(nextTab);
                        setSelectedItem(match);
                        clearCanvas();
                        speakLetter(match);
                      }}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-xl border border-indigo-200 transition-all cursor-pointer flex items-center space-x-1"
                      title="Tukar antara Huruf Besar & Kecil"
                    >
                      <span>🔄</span>
                      <span>Ubah ke {tabMode === 'capital' ? 'Kecil (' + selectedItem.char.toLowerCase() + ')' : 'Besar (' + selectedItem.char.toUpperCase() + ')'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => speakLetter(selectedItem)}
                    className="p-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl border border-indigo-200 transition-all cursor-pointer"
                    title="Dengar Suara Pelafalan"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {selectedItem.icon} Contoh Kata: <strong>{selectedItem.word}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={clearCanvas}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 flex items-center space-x-1 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Bersihkan Canvas</span>
            </button>
          </div>

          {/* Interactive Tracing Canvas Area */}
          <div className="relative flex justify-center bg-slate-100 p-4 rounded-3xl border-2 border-dashed border-indigo-200">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="bg-white rounded-2xl shadow-inner cursor-crosshair touch-none border border-slate-200 max-w-full"
              style={{ width: '100%', height: 'auto', aspectRatio: '450 / 360' }}
            />

            {/* Success Overlay Celebration */}
            {isSuccess && (
              <div className="absolute inset-0 bg-emerald-900/80 backdrop-blur-xs rounded-3xl flex flex-col items-center justify-center p-6 text-white text-center space-y-3 animate-fade-in">
                <Sparkles className="w-12 h-12 text-amber-300 animate-bounce" />
                <h4 className="text-2xl font-black">Hebat Sekali! 🎉</h4>
                <p className="text-xs sm:text-sm text-emerald-100 max-w-xs">
                  Kamu telah berhasil menulis huruf <strong>{selectedItem.char}</strong> ({selectedItem.word})!
                </p>
                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={clearCanvas}
                    className="px-4 py-2 bg-white text-emerald-900 rounded-xl text-xs font-extrabold hover:bg-emerald-50 transition-all cursor-pointer"
                  >
                    Tulis Lagi
                  </button>
                  <button
                    onClick={() => {
                      const idx = currentList.findIndex((i) => i.char === selectedItem.char);
                      if (idx < currentList.length - 1) {
                        handleSelectLetter(currentList[idx + 1]);
                      }
                    }}
                    className="px-4 py-2 bg-amber-400 text-slate-900 rounded-xl text-xs font-extrabold hover:bg-amber-300 transition-all cursor-pointer"
                  >
                    Lanjut Huruf Berikutnya →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Canvas Controls Toolbar */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            
            {/* Color Palette */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-600 mr-1 flex items-center">
                <Palette className="w-3.5 h-3.5 mr-1 text-slate-500" /> Warna:
              </span>
              {BRUSH_COLORS.map((c) => (
                <button
                  key={c.color}
                  onClick={() => {
                    setBrushColor(c.color);
                    setIsErasing(false);
                  }}
                  className={`w-7 h-7 rounded-full transition-transform cursor-pointer border-2 ${
                    !isErasing && brushColor === c.color ? 'scale-125 border-slate-900 shadow-md' : 'border-white'
                  }`}
                  style={{ backgroundColor: c.color }}
                  title={c.label}
                />
              ))}
              
              {/* Eraser */}
              <button
                onClick={() => setIsErasing(!isErasing)}
                className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                  isErasing
                    ? 'bg-rose-500 text-white border-rose-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>

            {/* Brush Width Slider */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-600">Ketebalan:</span>
              <input
                type="range"
                min={8}
                max={26}
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                className="w-20 sm:w-24 accent-indigo-600 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-slate-700">{lineWidth}px</span>
            </div>

            {/* Direction Arrow Guide Toggle */}
            <button
              onClick={() => setShowArrows(!showArrows)}
              className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                showArrows
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
              title="Tampilkan / Sembunyikan Panah Arah Menulis"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{showArrows ? 'Panah Arah: ON' : 'Panah Arah: OFF'}</span>
            </button>

          </div>

          {/* Action Check Writing Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleCompleteWriting}
              disabled={!hasDrawn}
              className="px-6 py-3.5 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 disabled:bg-slate-300 shadow-md transition-all flex items-center space-x-2 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Selesai Menulis & Dapatkan Bintang! (+25 XP)</span>
            </button>
          </div>

        </div>

        {/* Right Side: Phonetic Card & Mascot Guide */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Visual Word Association Card */}
          <div className="bg-gradient-to-b from-amber-50 to-orange-50 p-6 rounded-3xl border-2 border-amber-200 text-center space-y-4 shadow-sm">
            <div className="text-7xl animate-bounce my-2">{selectedItem.icon}</div>
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase text-amber-800 tracking-wider">
                Pengenalan Kata
              </span>
              <h3 className="text-2xl font-black text-amber-950">
                {selectedItem.char} untuk <span className="underline decoration-amber-400">{selectedItem.word}</span>
              </h3>
            </div>

            <button
              onClick={() => speakLetter(selectedItem)}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengarkan Ucapan Kata</span>
            </button>
          </div>

          {/* Stroke Order Step Guide Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-xs font-extrabold uppercase text-slate-800 tracking-wider flex items-center">
                <Compass className="w-4 h-4 text-indigo-600 mr-1.5" />
                <span>Urutan & Arah Menulis</span>
              </h4>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                {getStrokeGuides(selectedItem.char).length} Langkah
              </span>
            </div>

            <div className="space-y-2 pt-1">
              {getStrokeGuides(selectedItem.char).map((sg) => {
                const color = BADGE_COLORS[(sg.num - 1) % BADGE_COLORS.length];
                return (
                  <div
                    key={sg.num}
                    className="p-2.5 bg-slate-50 hover:bg-indigo-50/50 rounded-2xl border border-slate-200/80 flex items-center space-x-3 transition-all"
                  >
                    <div
                      className="w-7 h-7 rounded-full text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs"
                      style={{ backgroundColor: color }}
                    >
                      {sg.num}
                    </div>
                    <div className="text-xs text-slate-800 font-medium leading-tight flex-1">
                      <span>{sg.description}</span>
                    </div>
                    <span className="text-base shrink-0">{sg.arrowSymbol}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mascot Owl Advice */}
          <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-3xl space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🦉</span>
              <div>
                <h4 className="text-sm font-extrabold text-indigo-950">Ciko si Burung Hantu</h4>
                <p className="text-[11px] text-indigo-700">Petunjuk Menulis</p>
              </div>
            </div>

            <p className="text-xs text-indigo-900 leading-relaxed font-medium">
              "Tebalkan garis putus-putus pada papan tulis menggunakan jarimu atau mouse. Mulailah dari titik teratas huruf!"
            </p>
          </div>

          {/* Progress Summary Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center">
              <Award className="w-4 h-4 mr-1 text-amber-500" /> Koleksi Abjad Dikuasai
            </h4>

            {masteredList.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Belum ada huruf yang diselesaikan. Mulai tulis sekarang!</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {masteredList.map((char) => (
                  <span
                    key={char}
                    className="w-8 h-8 bg-emerald-100 text-emerald-900 font-extrabold text-xs rounded-xl flex items-center justify-center border border-emerald-300"
                  >
                    {char}
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
