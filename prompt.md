# CODE QUEST — Pixel-Art Coding Learning Website

Buat sebuah website edukasi interaktif untuk belajar HTML dasar dan CSS dasar dengan konsep gamified learning. Website harus terasa seperti memainkan game platformer 2D retro, bukan membaca dokumentasi atau mengikuti kursus yang membosankan.

Website ditujukan untuk pemula yang belum pernah belajar coding sebelumnya.

Gunakan gambar referensi yang diberikan sebagai inspirasi desain utama.

## 1. Technology Stack

Gunakan teknologi berikut:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React untuk icon jika diperlukan
- LocalStorage untuk menyimpan progress belajar

Website harus berupa frontend application yang dapat di-deploy langsung ke Vercel.

Jangan menggunakan Next.js, Nuxt.js, backend, atau database untuk versi pertama.

Pastikan project dapat dijalankan menggunakan:

npm install
npm run dev

Pastikan project dapat di-build menggunakan:

npm run build

## 2. Design Concept

Nama website: CODE QUEST

Tagline:
"Learn to code, one level at a time."

Konsep visual:
- Pixel-art 8-bit retro game.
- Platformer game atmosphere.
- Pastel pink, lavender, dan blue sky.
- Pixel city skyline.
- Pixel character.
- Platform berbentuk blok.
- RPG dialogue box.
- Progress bar seperti game.
- Hearts, XP, dan level indicator.
- Pixel font untuk heading dan game UI.
- Border tebal dengan gaya pixel-art.

Gunakan visual yang terinspirasi dari game retro seperti platformer klasik.

Color palette:

- Dark Navy: #25245B
- Pixel Blue: #6D9DFF
- Sky Blue: #A7D8FF
- Pastel Pink: #F6A8E8
- Lavender: #C7B6FF
- Light Background: #FFF1FC
- White: #FFFFFF

Gunakan font pixel seperti Press Start 2P atau VT323 untuk heading, tombol, dan UI game.

Gunakan font sans-serif yang nyaman dibaca untuk paragraf materi pembelajaran.

Jangan menggunakan font pixel untuk paragraf panjang.

Website harus memiliki desain yang konsisten, playful, nostalgic, dan tetap mudah digunakan.

## 3. Landing Page

Buat landing page seperti game loading screen.

Hero section:
- Pixel-art city background.
- Karakter pixel di atas platform.
- Judul besar "CODE QUEST".
- Subtitle "Petualangan pertama kamu di dunia coding".
- Progress bar seperti game.
- Tombol utama "MULAI PETUALANGAN".
- Tombol sekunder "LANJUTKAN GAME".

Tambahkan dialog karakter:

"Siap belajar coding dari nol?"

"Setiap baris kode membawa kamu lebih dekat ke level berikutnya!"

Tampilkan dua pilihan dunia:

HTML WORLD
"Bangun struktur website dari dasar."

CSS WORLD
"Hiasi website dengan style dan warna."

Tambahkan informasi:
- Total level.
- Progress belajar.
- Total XP.
- Player level.

Jika pemain belum memiliki progress, tombol "Lanjutkan Game" harus mengarahkan pemain ke level pertama.

## 4. Learning Dashboard

Buat halaman dashboard berupa world map game.

Tampilkan level-level yang terhubung dengan jalur pixel.

Setiap level memiliki status:
- Locked.
- Available.
- Completed.

Gunakan indikator visual seperti:
- Bintang.
- Trophy.
- Checkmark pixel.
- Lock icon.

Level yang sudah selesai dapat dibuka kembali.

Level berikutnya terbuka setelah pemain menyelesaikan level sebelumnya.

### HTML WORLD

LEVEL 1 — Kenalan dengan HTML

LEVEL 2 — Struktur Dokumen HTML

LEVEL 3 — Heading dan Paragraph

LEVEL 4 — Link dan Image

LEVEL 5 — List

LEVEL 6 — Membuat Mini Profile

### CSS WORLD

LEVEL 1 — Kenalan dengan CSS

LEVEL 2 — Warna dan Background

LEVEL 3 — Font dan Text

LEVEL 4 — Border dan Spacing

LEVEL 5 — Class dan Selector

LEVEL 6 — Styling Mini Profile

Pastikan minimal 3 level HTML dan 3 level CSS benar-benar dapat dimainkan.

Level lainnya dapat disiapkan sebagai data lesson yang mudah dikembangkan.

## 5. Learning Page

Setiap level memiliki halaman pembelajaran dengan struktur yang konsisten.

Tampilkan:
- Nama level.
- Progress level.
- XP reward.
- Story atau mission.
- Materi.
- Contoh kode.
- Penjelasan hasil kode.
- Live coding editor.
- Code preview.
- Hint system.
- Check answer button.

Gunakan bahasa Indonesia untuk seluruh materi dan UI.

Materi harus singkat, sederhana, dan mudah dipahami pemula.

### Story / Mission

Berikan cerita pendek yang relevan dengan materi.

Contoh:

"NPC di kota pixel membutuhkan papan nama. Bantu mereka membuat heading menggunakan HTML!"

### Materi

Jelaskan konsep dengan bahasa sederhana.

Contoh:

HTML adalah bahasa yang digunakan untuk membuat struktur halaman website.

HTML menggunakan tag untuk memberi tahu browser jenis konten yang ditampilkan.

Contoh:

<h1>Hello World!</h1>

Penjelasan:
- <h1> adalah tag pembuka.
- Hello World! adalah isi.
- </h1> adalah tag penutup.

### Code Example

Tampilkan contoh kode dengan syntax highlighting sederhana.

### What Happens?

Jelaskan hasil kode tersebut.

### Your Mission

Berikan tugas kecil yang harus diselesaikan pemain menggunakan live coding editor.

## 6. Live Coding Editor

Live coding merupakan fitur utama website.

Buat editor coding sederhana yang benar-benar berfungsi.

Editor tidak perlu kompleks seperti VS Code.

Gunakan textarea atau lightweight code editor.

Fitur editor:
- Run Code.
- Reset Code.
- Hint.
- Check Answer.
- Show Answer.

Untuk HTML:
- Pemain menulis kode HTML.
- Preview menampilkan hasil HTML secara langsung.

Untuk CSS:
- Pemain menulis CSS.
- CSS diterapkan pada HTML template yang sudah disediakan.
- Preview menampilkan hasil styling secara langsung.

Gunakan iframe dengan sandbox untuk menampilkan preview.

Jangan menjalankan kode pengguna melalui backend atau server execution.

Preview harus diperbarui ketika pemain menekan tombol Run Code.

Tambahkan tampilan editor seperti terminal atau coding window retro dengan:
- Header editor.
- Nomor baris sederhana jika memungkinkan.
- Background gelap.
- Font monospace.
- Tombol pixel-style.

Pastikan editor nyaman digunakan di desktop dan mobile.

## 7. Hint System

Setiap challenge memiliki sistem hint bertahap.

Tombol:
"💡 HINT"

Setiap klik menampilkan hint berikutnya.

Contoh challenge:

"Tambahkan heading dengan tulisan Welcome to My Website."

Hint 1:
"Kamu membutuhkan tag heading HTML."

Hint 2:
"Gunakan tag <h1>."

Hint 3:
"Tag heading memiliki tag pembuka dan penutup."

Hint harus membantu pemain memahami solusi tanpa langsung memberikan seluruh jawaban pada hint pertama.

Tambahkan tombol:

"SHOW ANSWER"

Tombol tersebut menampilkan contoh solusi dan penjelasan singkat.

Hint system harus berfungsi untuk setiap challenge.

## 8. Challenge Validation

Setiap challenge memiliki validasi sederhana berdasarkan requirement materi.

Contoh challenge HTML:

"Tambahkan heading dengan teks Hello World."

Validasi:
- Kode mengandung tag h1.
- Isi heading mengandung teks Hello World.

Contoh challenge CSS:

"Ubah warna heading menjadi pink."

Validasi:
- CSS memiliki selector yang sesuai.
- Property color memiliki nilai warna yang ditentukan challenge.

Gunakan validasi sederhana berbasis string, regex, atau parsing ringan.

Tidak perlu membuat compiler atau sistem penilaian kompleks.

Berikan feedback:

Jika benar:

"MISSION COMPLETE!"

"Good job! Kamu mendapatkan 50 XP."

Jika salah:

"Belum berhasil!"

"Coba periksa kembali kode kamu."

Feedback harus ramah dan tidak membuat pemain merasa gagal.

## 9. XP and Level System

Tambahkan sistem gamification sederhana.

Reward:
- Menyelesaikan challenge: +50 XP.
- Menyelesaikan level: +100 XP.
- Menyelesaikan world: +500 XP.

Tampilkan:
- XP bar.
- Player level.
- Achievement badge.
- Progress completion.

Achievement:
- First Code.
- HTML Beginner.
- CSS Explorer.
- Pixel Web Builder.

Simpan progress menggunakan localStorage.

Progress yang disimpan:
- Level yang sudah selesai.
- XP.
- Player level.
- Achievement.
- Challenge completion.
- Level terakhir yang dimainkan.

Pastikan XP tidak bertambah berulang kali ketika pemain menyelesaikan challenge yang sama.

## 10. UI Components

Buat reusable components:

- PixelButton
- PixelCard
- PixelDialog
- PixelProgressBar
- PixelBadge
- LevelCard
- CodeEditor
- CodePreview
- HintBox
- MissionCompleteModal
- PixelCharacter

Gunakan component architecture yang modular dan mudah dikembangkan.

## 11. Routing

Gunakan React Router.

Contoh route:

/
Landing page.

/world
Learning world selection.

/world/html
HTML world map.

/world/css
CSS world map.

/learn/html/:levelId
HTML learning page.

/learn/css/:levelId
CSS learning page.

/profile
Player profile dan achievement.

Pastikan navigasi berjalan dengan baik.

## 12. Folder Structure

Gunakan struktur project yang rapi:

src/
  components/
    PixelButton.tsx
    PixelCard.tsx
    PixelDialog.tsx
    PixelProgressBar.tsx
    PixelBadge.tsx
    LevelCard.tsx
    CodeEditor.tsx
    CodePreview.tsx
    HintBox.tsx
    MissionCompleteModal.tsx
    PixelCharacter.tsx

  pages/
    HomePage.tsx
    WorldPage.tsx
    WorldMapPage.tsx
    LearningPage.tsx
    ProfilePage.tsx

  data/
    htmlLessons.ts
    cssLessons.ts

  hooks/
    useProgress.ts

  utils/
    codeValidator.ts
    progressManager.ts

  types/
    lesson.ts
    progress.ts

  App.tsx
  main.tsx

Sesuaikan struktur jika diperlukan, tetapi tetap pertahankan modularitas.

## 13. Responsive Design

Website harus responsive untuk:
- Desktop.
- Tablet.
- Mobile.

Desktop:
- Materi dan editor dapat ditampilkan berdampingan.
- Preview berada di samping editor atau di bawahnya.

Mobile:
- Materi ditampilkan terlebih dahulu.
- Editor berada di bawah materi.
- Preview berada di bawah editor.
- Tombol mudah diklik.
- Hindari horizontal scrolling.

Pastikan ukuran teks tetap nyaman dibaca.

## 14. Vercel Deployment

Pastikan website dapat di-deploy langsung ke Vercel.

Gunakan konfigurasi Vite standar.

Build command:

npm run build

Output directory:

dist

Jika menggunakan React Router dengan history mode, tambahkan file vercel.json dengan rewrite agar direct navigation ke route SPA tetap berfungsi.

Pastikan tidak ada error saat build.

## 15. Important Requirements

- Jangan membuat website seperti dashboard SaaS.
- Jangan membuat website hanya berupa landing page statis.
- Fokus pada pengalaman belajar HTML dan CSS dasar.
- Live coding editor harus benar-benar berfungsi.
- Preview kode harus berfungsi.
- Hint system harus berfungsi.
- Challenge validation harus berfungsi.
- XP dan level progression harus berfungsi.
- Progress harus tersimpan di localStorage.
- Gunakan materi pembelajaran dalam bahasa Indonesia.
- Jangan menggunakan placeholder untuk fitur utama.
- Jangan membuat editor terlalu kompleks.
- Hindari animasi berlebihan yang mengganggu pembelajaran.
- Prioritaskan UX dan readability.
- Pastikan website dapat dijalankan dan di-deploy ke Vercel.

## Final Goal

Hasil akhir harus berupa website edukasi CODE QUEST yang terlihat seperti game pixel-art retro.

Pemain harus merasa sedang menjelajahi dunia game sambil belajar membuat website menggunakan HTML dan CSS.

Bangun website yang benar-benar berfungsi, bukan hanya UI mockup.

Prioritaskan kualitas visual, pengalaman belajar, live coding sederhana, dan sistem progression yang menyenangkan.