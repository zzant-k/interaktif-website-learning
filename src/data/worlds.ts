import type { WorldInfo } from '../types/lesson';
import type { AchievementDefinition } from '../types/progress';

// Set to false when CSS World is ready to be opened to students
export const CSS_WORLD_LOCKED = true;

export const WORLDS: Record<'html' | 'css', WorldInfo> = {
  html: {
    id: 'html',
    name: 'HTML WORLD',
    subtitle: 'Bangun struktur website dari dasar.',
    description:
      'Mulai dari nol dengan mengenal tag, heading, paragraf, gambar, tautan, daftar, hingga membuat halaman Mini Profile pertamamu.',
    accentLabel: 'Fondasi Struktur Web',
  },
  css: {
    id: 'css',
    name: 'CSS WORLD',
    subtitle: 'Hiasi website dengan style dan warna.',
    description:
      'Ubah halaman HTML polos menjadi tampilan penuh warna dengan CSS: warna latar, tipografi, jarak, border, dan class selector.',
    accentLabel: 'Desain dan Gaya Visual',
  },
};

export const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'first_code',
    title: 'First Code',
    description: 'Berhasil menyelesaikan misi coding pertamamu di CODE QUEST.',
    requirementLabel: 'Selesaikan 1 level di HTML atau CSS World',
  },
  {
    id: 'html_beginner',
    title: 'HTML Beginner',
    description: 'Menguasai dasar tag, teks, dan struktur halaman web HTML.',
    requirementLabel: 'Selesaikan minimal 3 level di HTML World',
  },
  {
    id: 'css_explorer',
    title: 'CSS Explorer',
    description: 'Mampu menghias elemen HTML dengan warna, font, dan tata letak CSS.',
    requirementLabel: 'Selesaikan minimal 3 level di CSS World',
  },
  {
    id: 'pixel_web_builder',
    title: 'Pixel Web Builder',
    description: 'Menuntaskan seluruh petualangan HTML World dan CSS World.',
    requirementLabel: 'Selesaikan semua 12 level (HTML & CSS World)',
  },
];

export const XP_REWARDS = {
  CHALLENGE: 50,
  LEVEL: 100,
  WORLD_CLEAR: 500,
  XP_PER_PLAYER_LEVEL: 200,
} as const;

