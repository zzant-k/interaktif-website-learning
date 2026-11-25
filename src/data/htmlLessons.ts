import type { Lesson } from '../types/lesson';

export const HTML_LESSONS: Lesson[] = [
  {
    id: 1,
    world: 'html',
    title: 'Kenalan dengan HTML',
    shortDescription: 'Buat papan nama pertamamu di Kota Pixel dengan tag <h1>.',
    xpChallenge: 50,
    xpLevel: 100,
    npcName: 'Koko si Builder',
    npcVariant: 'cyan',
    story:
      'Selamat datang di gerbang Kota Pixel! NPC penjaga gerbang membutuhkan papan nama besar agar petualang baru tahu mereka sudah tiba. Bantu mereka membuat heading pertamamu menggunakan HTML.',
    material: [
      'HTML adalah bahasa yang digunakan untuk membuat kerangka atau struktur halaman website.',
      'HTML memakai tag (ditulis di dalam kurung siku seperti <h1>) untuk memberi tahu browser jenis konten apa yang harus ditampilkan.',
      'Sebagian besar tag memiliki pasangan: tag pembuka dan tag penutup yang memakai garis miring (/).',
    ],
    materialPoints: [
      { code: '<h1>', explanation: 'Tag pembuka untuk judul utama (Heading 1).' },
      { code: '[isi teks]', explanation: 'Teks judul yang akan ditampilkan pada halaman.' },
      { code: '</h1>', explanation: 'Tag penutup yang menandai batas akhir judul.' },
    ],
    codeExample: `<h1>[Isi Teks Judul]</h1>`,
    whatHappens:
      'Browser membaca tag pembuka <h1> dan penutup </h1>, lalu menampilkan teks yang ada di dalamnya sebagai judul utama berukuran besar dan tebal.',
    mission:
      'Buat sebuah heading utama menggunakan tag <h1> yang berisi teks "Hello World".',
    starterCode: `<!-- Ketik kode HTML kamu di bawah ini -->\n`,
    hints: [
      'Kamu membutuhkan tag heading utama HTML, yaitu h1.',
      'Bungkus teksnya dengan tag pembuka <h1> dan tag penutup </h1>.',
      'Pastikan tulisan di dalam tag h1 memuat persis teks Hello World.',
    ],
    solutionCode: `<h1>Hello World</h1>`,
    solutionExplanation:
      'Tag <h1> membuka judul utama, lalu teks "Hello World" tampil di browser, dan </h1> menutup elemen tersebut.',
    checks: [
      {
        type: 'html-tag',
        tag: 'h1',
        textIncludes: 'Hello World',
        failureMessage:
          'Belum ditemukan tag <h1> yang berisi teks "Hello World". Pastikan tag pembuka <h1> dan penutup </h1> sudah lengkap.',
      },
    ],
  },
  {
    id: 2,
    world: 'html',
    title: 'Struktur Dokumen HTML',
    shortDescription: 'Rakit kerangka rumah HTML yang lengkap dari DOCTYPE hingga body.',
    xpChallenge: 50,
    xpLevel: 100,
    npcName: 'Mina si Arsitek',
    npcVariant: 'pink',
    story:
      'Papan nama sudah terpasang, tetapi rumah kode di Kota Pixel masih belum punya pondasi resmi. Ayo susun kerangka dokumen HTML lengkap agar browser bisa membacanya dengan rapi!',
    material: [
      'Setiap halaman web HTML yang lengkap memiliki kerangka standar dari atas sampai bawah.',
      'Bagian <head> menyimpan info halaman seperti judul tab (<title>), sedangkan bagian <body> menyimpan semua konten yang terlihat oleh pengunjung.',
    ],
    materialPoints: [
      { code: '<!DOCTYPE html>', explanation: 'Memberi tahu browser bahwa dokumen ini memakai HTML modern.' },
      { code: '<html>...</html>', explanation: 'Wadah utama yang membungkus seluruh kode halaman.' },
      { code: '<head><title>...</title></head>', explanation: 'Menentukan nama halaman pada tab browser.' },
      { code: '<body>...</body>', explanation: 'Area tempat teks, gambar, dan tombol ditampilkan.' },
    ],
    codeExample: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>[Judul Tab Halaman]</title>\n  </head>\n  <body>\n    <h1>[Judul Konten Halaman]</h1>\n  </body>\n</html>`,
    whatHappens:
      'Browser mengenali dokumen HTML5, memasang teks di dalam <title> pada tab browser, dan merender elemen <h1> di dalam <body> ke layar web.',
    mission:
      'Susun dokumen HTML lengkap yang memiliki <!DOCTYPE html>, <html>, <head> berisi <title> (tidak kosong), dan <body> berisi minimal satu teks atau tag <h1>.',
    starterCode: `<!DOCTYPE html>\n<html>\n  <head>\n    <!-- Tambahkan tag title di sini -->\n  </head>\n  <body>\n    <!-- Tambahkan konten heading di sini -->\n  </body>\n</html>`,
    hints: [
      'Di dalam <head>, tambahkan pasangan tag <title>...</title> berisi judul tab.',
      'Di dalam <body>, tambahkan minimal satu elemen seperti <h1>...</h1> dengan teks sambutan.',
      'Cek kembali agar semua tag pembuka memiliki penutupnya masing-masing (</title>, </head>, </body>, </html>).',
    ],
    solutionCode: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Rumah Pixel</title>\n  </head>\n  <body>\n    <h1>Halo Kota Pixel!</h1>\n  </body>\n</html>`,
    solutionExplanation:
      'Struktur ini memisahkan metadata tab browser di <head> dan konten tampilan utama di dalam <body>.',
    checks: [
      {
        type: 'doctype',
        failureMessage: 'Tambahkan deklarasi <!DOCTYPE html> di baris paling atas.',
      },
      {
        type: 'html-tag',
        tag: 'html',
        failureMessage: 'Dokumen harus dibungkus dengan tag <html>...</html>.',
      },
      {
        type: 'html-tag',
        tag: 'head',
        failureMessage: 'Tag <head> belum ditemukan.',
      },
      {
        type: 'html-tag',
        tag: 'title',
        requireNonEmptyText: true,
        failureMessage: 'Di dalam <head>, tambahkan tag <title> dengan judul yang tidak kosong.',
      },
      {
        type: 'html-tag',
        tag: 'body',
        requireNonEmptyText: true,
        failureMessage: 'Tag <body> masih kosong. Tambahkan konten di dalamnya.',
      },
    ],
  },
  {
    id: 3,
    world: 'html',
    title: 'Heading dan Paragraph',
    shortDescription: 'Padukan judul besar, subjudul, dan paragraf cerita yang rapi.',
    xpChallenge: 50,
    xpLevel: 100,
    npcName: 'Koko si Builder',
    npcVariant: 'cyan',
    story:
      'Warga Kota Pixel ingin membaca pengumuman festival kode. Buat poster informasi dengan judul utama, subjudul, dan satu paragraf penjelasan yang mudah dibaca.',
    material: [
      'HTML punya 6 tingkat ukuran heading, dari <h1> (paling besar dan utama) sampai <h6> (paling kecil).',
      'Untuk menulis kalimat atau cerita biasa, gunakan tag paragraf <p> supaya browser otomatis memberi jarak antar paragraf.',
    ],
    materialPoints: [
      { code: '<h1>', explanation: 'Judul utama halaman.' },
      { code: '<h2>', explanation: 'Subjudul untuk membagi bagian informasi.' },
      { code: '<p>', explanation: 'Paragraf teks biasa untuk isi bacaan.' },
    ],
    codeExample: `<h1>[Judul Utama]</h1>\n<h2>[Subjudul Bagian]</h2>\n<p>[Kalimat penjelasan paragraf di sini...]</p>`,
    whatHappens:
      'Browser menampilkan <h1> sebagai judul terbesar, <h2> sebagai subjudul dengan ukuran di bawahnya, lalu <p> sebagai teks paragraf dengan jarak baris yang rapi.',
    mission:
      'Tambahkan satu tag <h1> untuk judul utama, satu tag <h2> untuk subjudul, dan minimal satu tag <p> berisi kalimat cerita.',
    starterCode: `<h1>Festival Kode</h1>\n<!-- Tambahkan h2 dan p di bawah ini -->\n`,
    hints: [
      'Gunakan tag <h2>...</h2> untuk menulis subjudul di bawah <h1>.',
      'Tambahkan paragraf menggunakan tag <p>...</p> dengan kalimat bebas.',
      'Pastikan ketiga tag (<h1>, <h2>, dan <p>) memiliki teks di dalamnya.',
    ],
    solutionCode: `<h1>Festival Kode</h1>\n<h2>Misi Hari Ini</h2>\n<p>Ayo belajar membuat halaman web dari dasar bersama warga Kota Pixel.</p>`,
    solutionExplanation:
      'Kombinasi <h1>, <h2>, dan <p> membuat informasi bertingkat dan lebih cepat dipahami pembaca.',
    checks: [
      {
        type: 'html-tag',
        tag: 'h1',
        requireNonEmptyText: true,
        failureMessage: 'Tag <h1> belum ada atau masih kosong.',
      },
      {
        type: 'html-tag',
        tag: 'h2',
        requireNonEmptyText: true,
        failureMessage: 'Tambahkan tag <h2> berisi teks subjudul.',
      },
      {
        type: 'html-tag',
        tag: 'p',
        requireNonEmptyText: true,
        failureMessage: 'Tambahkan minimal satu tag <p> berisi kalimat paragraf.',
      },
    ],
  },
  {
    id: 4,
    world: 'html',
    title: 'Link dan Image',
    shortDescription: 'Hubungkan halaman dengan tautan <a> dan tampilkan gambar <img>.',
    xpChallenge: 50,
    xpLevel: 100,
    npcName: 'Raka si Kurir',
    npcVariant: 'runner',
    story:
      'Pos pemandu wisata butuh poster gambar maskot Kota Pixel dan tombol tautan menuju peta rahasia. Saatnya belajar memasang gambar dan link di HTML!',
    material: [
      'Tag <a> (anchor) membuat teks bisa diklik menuju alamat tujuan yang ditulis di atribut href="...".',
      'Tag <img> menampilkan gambar memakai atribut src="..." dan teks pengganti alt="...". Tag <img> tidak memerlukan tag penutup.',
      'Untuk latihan ini, kamu bisa memakai src="koko.svg" atau src="kota.svg" untuk memunculkan gambar pixel bawaan langsung di preview.',
    ],
    materialPoints: [
      { code: '<img src="..." alt="..." />', explanation: 'Atribut src untuk lokasi gambar, alt untuk teks deskripsi.' },
      { code: '<a href="...">Teks</a>', explanation: 'Atribut href untuk alamat tujuan saat tautan diklik.' },
    ],
    codeExample: `<img src="[nama-file-gambar]" alt="[deskripsi-gambar]" />\n<p><a href="[url-tujuan]">[Teks Tautan]</a></p>`,
    whatHappens:
      'Gambar ditampilkan sesuai nama file pada atribut src, dan teks di dalam tag <a> berubah menjadi link aktif yang mengarah ke alamat atribut href.',
    mission:
      'Tambahkan satu tag <img> (memiliki atribut src dan alt yang terisi) dan satu tag <a> (memiliki atribut href dan teks tautan yang terisi).',
    starterCode: `<h2>Pemandu Wisata</h2>\n<!-- Tambahkan img dan a di bawah ini -->\n`,
    hints: [
      'Tag <img> membutuhkan atribut src (bisa isi "koko.svg" atau "kota.svg") dan atribut alt berisi keterangan gambar.',
      'Tag <a> membutuhkan atribut href (misalnya "https://example.com") serta teks yang bisa diklik di antara tag pembuka dan penutup.',
      'Pastikan atribut src, alt, dan href tidak dibiarkan kosong.',
    ],
    solutionCode: `<h2>Pemandu Wisata</h2>\n<img src="koko.svg" alt="Maskot Koko" />\n<p><a href="https://example.com">Buka Peta Kota</a></p>`,
    solutionExplanation:
      'Atribut di dalam tag pembuka memberi informasi tambahan bagi browser tentang lokasi gambar dan tujuan tautan.',
    checks: [
      {
        type: 'html-tag',
        tag: 'img',
        requiredAttrs: ['src', 'alt'],
        failureMessage:
          'Tag <img> harus memiliki atribut src dan alt yang terisi.',
      },
      {
        type: 'html-tag',
        tag: 'a',
        requiredAttrs: ['href'],
        requireNonEmptyText: true,
        failureMessage:
          'Tag <a> harus memiliki atribut href yang terisi dan teks tautan di dalamnya.',
      },
    ],
  },
  {
    id: 5,
    world: 'html',
    title: 'List',
    shortDescription: 'Susun daftar perlengkapan petualangan memakai tag <ul> dan <li>.',
    xpChallenge: 50,
    xpLevel: 100,
    npcName: 'Mina si Arsitek',
    npcVariant: 'pink',
    story:
      'Sebelum menjelajah ruang CSS, setiap petualang wajib mengecek isi tas ranselnya. Buat daftar perlengkapan menggunakan HTML list agar rapi dan mudah dicek!',
    material: [
      'HTML menyediakan <ul> (unordered list) untuk daftar berpoin (bullet) dan <ol> (ordered list) untuk daftar bernomor.',
      'Setiap baris isi di dalam daftar wajib dibungkus menggunakan tag <li> (list item).',
    ],
    materialPoints: [
      { code: '<ul>...</ul>', explanation: 'Membungkus keseluruhan daftar berpoin.' },
      { code: '<li>...</li>', explanation: 'Satu baris item di dalam daftar.' },
    ],
    codeExample: `<ul>\n  <li>[Item pertama]</li>\n  <li>[Item kedua]</li>\n  <li>[Item ketiga]</li>\n</ul>`,
    whatHappens:
      'Browser membaca tag pembungkus <ul> dan merender setiap tag <li> di dalamnya sebagai butir daftar berpoin (bullet).',
    mission:
      'Buat sebuah daftar menggunakan tag <ul> yang berisi minimal 3 tag <li> dengan teks barang atau target belajarmu.',
    starterCode: `<h2>Bekal Petualangan</h2>\n<ul>\n  <li>Peta HTML</li>\n  <!-- Tambahkan minimal 2 tag <li> lagi -->\n</ul>`,
    hints: [
      'Setiap item baru harus ditulis di dalam pasangan tag <ul>...</ul>.',
      'Gunakan tag <li>...</li> untuk membungkus tiap baris item.',
      'Pastikan total ada minimal 3 tag <li> yang terisi teks di dalam <ul>.',
    ],
    solutionCode: `<h2>Bekal Petualangan</h2>\n<ul>\n  <li>Peta HTML</li>\n  <li>Kompas Tag</li>\n  <li>Batu XP</li>\n</ul>`,
    solutionExplanation:
      'Tag <ul> menandai kelompok daftar, sedangkan setiap tag <li> mewakili satu poin di dalamnya.',
    checks: [
      {
        type: 'html-tag',
        tag: 'ul',
        failureMessage: 'Gunakan tag pembungkus daftar <ul>...</ul>.',
      },
      {
        type: 'html-tag',
        tag: 'li',
        minCount: 3,
        requireNonEmptyText: true,
        failureMessage: 'Daftar <ul> harus berisi minimal 3 tag <li> yang tidak kosong.',
      },
    ],
  },
  {
    id: 6,
    world: 'html',
    title: 'Membuat Mini Profile',
    shortDescription: 'Gabungkan semua tag HTML menjadi halaman kartu profil pribadimu!',
    xpChallenge: 50,
    xpLevel: 100,
    npcName: 'Koko si Builder',
    npcVariant: 'cyan',
    story:
      'Ini dia tantangan terakhir HTML World! Bangun kartu Mini Profile milikmu sendiri dengan foto maskot, nama, bio singkat, daftar keahlian, dan tautan karya.',
    material: [
      'Semua tag yang sudah kamu pelajari bisa digabungkan dalam satu halaman utuh.',
      'Susun elemen dari atas ke bawah: gambar profil (<img>), nama (<h1>), perkenalan (<p>), daftar hobi/keahlian (<ul> + <li>), dan tautan (<a>).',
    ],
    materialPoints: [
      { code: '<img> + <h1>', explanation: 'Menampilkan avatar dan nama utama profil.' },
      { code: '<p> + <ul>', explanation: 'Menjelaskan bio singkat dan daftar minat.' },
      { code: '<a>', explanation: 'Tautan menuju portofolio atau proyekmu.' },
    ],
    codeExample: `<img src="[nama-file-avatar]" alt="[deskripsi-avatar]" />\n<h1>[Nama Profil]</h1>\n<p>[Bio atau deskripsi singkat...]</p>\n<ul>\n  <li>[Keahlian atau hobi 1]</li>\n  <li>[Keahlian atau hobi 2]</li>\n</ul>\n<a href="[url-portofolio]">[Teks Tautan]</a>`,
    whatHappens:
      'Semua tag HTML terangkai lengkap sesuai sintaks: gambar <img>, nama <h1>, bio <p>, daftar <ul>/<li>, dan tautan <a>.',
    mission:
      'Buat halaman Mini Profile berisi: 1 tag <img> (dengan src dan alt), 1 tag <h1> nama, 1 tag <p> bio, 1 daftar <ul> dengan minimal 2 tag <li>, dan 1 tag <a> (dengan href).',
    starterCode: `<!-- Rakit Mini Profile HTML pertamamu di sini -->\n<img src="koko.svg" alt="Avatar Saya" />\n<h1>Namamu</h1>\n`,
    hints: [
      'Tambahkan paragraf bio dengan tag <p>...</p> setelah nama <h1>.',
      'Buat daftar hobi atau keahlian memakai <ul> dengan minimal dua <li>...</li>.',
      'Akhiri dengan tag tautan <a> yang memiliki atribut href terisi dan teks tautan.',
    ],
    solutionCode: `<img src="koko.svg" alt="Avatar Petualang" />\n<h1>Dany Coder</h1>\n<p>Pemula yang antusias membangun website interaktif.</p>\n<ul>\n  <li>Belajar HTML dasar</li>\n  <li>Belajar CSS warna</li>\n</ul>\n<a href="https://example.com">Kunjungi Profil</a>`,
    solutionExplanation:
      'Dengan memadukan <img>, <h1>, <p>, <ul>/<li>, dan <a>, kamu telah membangun struktur halaman profil yang utuh.',
    checks: [
      {
        type: 'html-tag',
        tag: 'img',
        requiredAttrs: ['src', 'alt'],
        failureMessage: 'Tambahkan tag <img> lengkap dengan atribut src dan alt.',
      },
      {
        type: 'html-tag',
        tag: 'h1',
        requireNonEmptyText: true,
        failureMessage: 'Tambahkan tag <h1> berisi namamu.',
      },
      {
        type: 'html-tag',
        tag: 'p',
        requireNonEmptyText: true,
        failureMessage: 'Tambahkan tag <p> berisi bio singkat.',
      },
      {
        type: 'html-tag',
        tag: 'ul',
        failureMessage: 'Tambahkan tag <ul> untuk membungkus daftar hobi/keahlian.',
      },
      {
        type: 'html-tag',
        tag: 'li',
        minCount: 2,
        requireNonEmptyText: true,
        failureMessage: 'Isi daftar <ul> dengan minimal 2 tag <li>.',
      },
      {
        type: 'html-tag',
        tag: 'a',
        requiredAttrs: ['href'],
        requireNonEmptyText: true,
        failureMessage: 'Tambahkan tag <a> dengan atribut href dan teks tautan.',
      },
    ],
  },
];
