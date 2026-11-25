import type { Lesson } from '../types/lesson';

export const CSS_LESSONS: Lesson[] = [
  {
    id: 1,
    world: 'css',
    title: 'Kenalan dengan CSS',
    shortDescription: 'Ubah warna judul HTML polos menjadi pink dengan selector CSS.',
    xpChallenge: 50,
    xpLevel: 100,
    npcName: 'Mina si Pelukis',
    npcVariant: 'pink',
    story:
      'Selamat datang di CSS World! Halaman papan nama HTML di alun-alun masih terlihat hitam putih. Bantu Mina memberi warna pink ceria pada judul utama!',
    material: [
      'CSS (Cascading Style Sheets) adalah bahasa yang digunakan untuk mengatur warna, ukuran, jarak, dan tampilan halaman HTML.',
      'Aturan CSS terdiri dari Selector (elemen yang dipilih), Property (apa yang mau diubah), dan Value (nilai perubahannya).',
    ],
    materialPoints: [
      { code: 'h1', explanation: 'Selector yang menargetkan elemen <h1>.' },
      { code: 'color', explanation: 'Property untuk mengatur warna teks.' },
      { code: '[warna];', explanation: 'Value warna yang dipilih, diakhiri tanda titik koma (;).' },
    ],
    codeExample: `h1 {\n  color: [pilihan-warna];\n}`,
    whatHappens:
      'Aturan CSS menargetkan elemen <h1> lalu mengubah warna teksnya sesuai nilai warna yang ditulis di dalam kurung kurawal.',
    mission:
      'Ubah warna teks elemen <h1> menjadi pink (boleh pakai kata kunci "pink", "hotpink", atau kode hex "#f6a8e8").',
    starterCode: `/* Tulis aturan CSS kamu di sini */\nh1 {\n  \n}\n`,
    baseHtml: `<main style="padding: 20px; font-family: sans-serif; background: #25245B; color: #FFFFFF; min-height: 160px;">\n  <h1>Papan Nama Kota Pixel</h1>\n  <p>Tampilan ini akan makin berwarna setelah kamu menambahkan CSS!</p>\n</main>`,
    hints: [
      'Targetkan elemen judul utama memakai selector h1 { ... }.',
      'Di dalam kurung kurawal { }, gunakan property color untuk mengatur warna huruf.',
      'Isi nilai warnanya dengan kata kunci pink (atau hotpink / #f6a8e8) dan akhiri titik koma (;).',
    ],
    solutionCode: `h1 {\n  color: pink;\n}`,
    solutionExplanation:
      'Selector h1 memilih elemen heading, lalu property color: pink; memberi warna pink pada teks judul tersebut.',
    checks: [
      {
        type: 'css-rule',
        selector: 'h1',
        property: 'color',
        acceptedValues: ['pink', 'hotpink', 'deeppink', 'lightpink', '#f6a8e8', '#ffc0cb', '#ff69b4'],
        failureMessage:
          'Pastikan selector h1 memiliki property color bernilai pink (atau hotpink / #f6a8e8) dengan tanda titik koma.',
      },
    ],
  },
  {
    id: 2,
    world: 'css',
    title: 'Warna dan Background',
    shortDescription: 'Atur warna latar belakang halaman dan kontras warna teksnya.',
    xpChallenge: 50,
    xpLevel: 100,
    npcName: 'Koko si Builder',
    npcVariant: 'cyan',
    story:
      'Langit di atas studio lukis pixel masih kosong tanpa latar warna. Beri warna latar belakang pada halaman dan atur warna teks paragraf supaya tetap kontras dan enak dibaca!',
    material: [
      'Property background-color mengubah warna latar belakang suatu elemen seperti <body> atau kartu.',
      'Saat mengganti background-color menjadi warna terang atau gelap, pastikan property color teksnya kontras agar mudah terbaca.',
    ],
    materialPoints: [
      { code: 'background-color: [warna];', explanation: 'Memberi warna latar belakang pada halaman.' },
      { code: 'color: [warna];', explanation: 'Mengatur warna teks agar tetap tajam dibaca.' },
    ],
    codeExample: `body {\n  background-color: [kode-warna-latar];\n}\n\np {\n  color: [kode-warna-teks];\n}`,
    whatHappens:
      'Latar belakang body diwarnai sesuai background-color, sementara teks paragraf <p> diberi color yang kontras sehingga mudah terbaca.',
    mission:
      'Berikan property background-color pada selector body, dan atur property color pada selector p.',
    starterCode: `body {\n  \n}\n\np {\n  \n}\n`,
    baseHtml: `<div style="padding: 20px; font-family: sans-serif;">\n  <h1>Studio Langit Pixel</h1>\n  <p>Latar belakang dan warna teks yang serasi membuat halaman nyaman dilihat.</p>\n</div>`,
    hints: [
      'Di dalam blok body { ... }, tambahkan property background-color dengan nilai warna pilihanmu (misal #A7D8FF atau lightblue).',
      'Di dalam blok p { ... }, tambahkan property color agar teks paragraf kontras (misal #25245B atau navy).',
      'Jangan lupa tanda titik dua (:) setelah nama property dan titik koma (;) di akhir nilai.',
    ],
    solutionCode: `body {\n  background-color: #A7D8FF;\n}\n\np {\n  color: #25245B;\n}`,
    solutionExplanation:
      'background-color mewarnai seluruh latar halaman body, sedangkan color menjaga tulisan paragraf tetap terbaca jelas.',
    checks: [
      {
        type: 'css-rule',
        selector: 'body',
        property: 'background-color',
        valuePattern: '.+',
        failureMessage: 'Atur property background-color di dalam selector body { ... }.',
      },
      {
        type: 'css-rule',
        selector: 'p',
        property: 'color',
        valuePattern: '.+',
        failureMessage: 'Atur property color di dalam selector p { ... }.',
      },
    ],
  },
  {
    id: 3,
    world: 'css',
    title: 'Font dan Text',
    shortDescription: 'Atur ukuran teks dan perataan tengah menggunakan CSS tipografi.',
    xpChallenge: 50,
    xpLevel: 100,
    npcName: 'Mina si Pelukis',
    npcVariant: 'pink',
    story:
      'Spanduk pengumuman di menara kota tulisannya terlalu kecil dan menempel di pinggir kiri. Besarkan ukurannya dan tengahkan judulnya agar terlihat gagah!',
    material: [
      'Property font-size mengatur besar kecilnya huruf, misalnya 32px.',
      'Property text-align mengatur posisi rata teks (left, center, atau right).',
      'Property line-height membantu memberi jarak antar baris pada paragraf supaya tidak berdempetan.',
    ],
    materialPoints: [
      { code: 'font-size: [ukuran]px;', explanation: 'Mengatur ukuran huruf dalam satuan piksel (px).' },
      { code: 'text-align: center;', explanation: 'Menempatkan teks tepat rata di tengah kontainer.' },
    ],
    codeExample: `h1 {\n  font-size: [ukuran]px;\n  text-align: center;\n}`,
    whatHappens:
      'Elemen <h1> diatur ukuran hurufnya memakai font-size dan ditempatkan rata tengah dengan text-align: center.',
    mission:
      'Style elemen h1 dengan font-size (memakai satuan px atau rem) dan text-align: center;.',
    starterCode: `h1 {\n  color: #25245B;\n  /* Tambahkan font-size dan text-align di sini */\n}\n`,
    baseHtml: `<div style="padding: 20px; font-family: sans-serif; background: #FFF1FC; min-height: 150px;">\n  <h1>SPANDUK KOTA PIXEL</h1>\n  <p style="color: #25245B;">Tipografi yang rapi membuat pembaca betah berlama-lama di website kamu.</p>\n</div>`,
    hints: [
      'Tambahkan property font-size dengan angka dan satuan px atau rem di dalam h1 { ... }.',
      'Untuk membuat judul rata tengah, gunakan nilai center pada property text-align.',
      'Pastikan penulisan property memakai tanda hubung (-) yang benar: font-size dan text-align.',
    ],
    solutionCode: `h1 {\n  color: #25245B;\n  font-size: 32px;\n  text-align: center;\n}`,
    solutionExplanation:
      'font-size mempertegas ukuran judul, sedangkan text-align: center menaruh teks tepat di tengah kontainer.',
    checks: [
      {
        type: 'css-rule',
        selector: 'h1',
        property: 'font-size',
        valuePattern: '\\d+(px|rem|em)',
        failureMessage: 'Tambahkan font-size dengan satuan px atau rem pada h1.',
      },
      {
        type: 'css-rule',
        selector: 'h1',
        property: 'text-align',
        acceptedValues: ['center'],
        failureMessage: 'Tambahkan text-align: center; pada selector h1.',
      },
    ],
  },
  {
    id: 4,
    world: 'css',
    title: 'Border dan Spacing',
    shortDescription: 'Beri garis tepi pixel dan ruang napas padding pada kotak dialog.',
    xpChallenge: 50,
    xpLevel: 100,
    npcName: 'Raka si Kurir',
    npcVariant: 'runner',
    story:
      'Kotak dialog warga kota terlihat sempit dan belum punya bingkai tegas seperti game retro. Tambahkan border dan padding supaya kotaknya lega dan menarik!',
    material: [
      'Property padding memberi ruang kosong di dalam kotak, antara batas kotak dengan teks di dalamnya.',
      'Property border memberi garis bingkai di sekeliling elemen, misalnya tebal, gaya garis (solid), dan warna.',
      'Property margin memberi jarak di luar kotak terhadap elemen lain.',
    ],
    materialPoints: [
      { code: 'border: [tebal] solid [warna];', explanation: 'Garis bingkai solid di sekeliling elemen.' },
      { code: 'padding: [jarak]px;', explanation: 'Memberi ruang napas di bagian dalam kotak.' },
    ],
    codeExample: `.dialog-box {\n  border: [ketebalan]px solid [kode-warna];\n  padding: [ukuran-jarak]px;\n}`,
    whatHappens:
      'Kotak .dialog-box mendapatkan garis bingkai solid dari property border dan ruang dalam dari property padding.',
    mission:
      'Style class .dialog-box agar memiliki property border (misalnya 3px solid #25245B) dan padding (misalnya 16px).',
    starterCode: `.dialog-box {\n  background-color: #FFFFFF;\n  color: #25245B;\n  /* Tambahkan border dan padding di sini */\n}\n`,
    baseHtml: `<div style="padding: 20px; background: #A7D8FF; min-height: 150px; font-family: sans-serif;">\n  <div class="dialog-box">\n    <strong>NPC Koko:</strong> Tolong beri bingkai dan ruang napas pada kotak dialog ini!\n  </div>\n</div>`,
    hints: [
      'Gunakan selector .dialog-box yang sudah disiapkan di editor.',
      'Tambahkan property border dengan format ukuran, jenis garis, dan warna (contoh format: 3px solid #25245B).',
      'Tambahkan property padding dengan satuan px agar tulisan di dalam kotak terasa lega.',
    ],
    solutionCode: `.dialog-box {\n  background-color: #FFFFFF;\n  color: #25245B;\n  border: 3px solid #25245B;\n  padding: 16px;\n}`,
    solutionExplanation:
      'padding memberi ruang nyaman di dalam elemen, sedangkan border menciptakan bingkai khas kotak dialog game.',
    checks: [
      {
        type: 'css-rule',
        selector: '.dialog-box',
        property: 'border',
        valuePattern: '.+',
        failureMessage: 'Tambahkan property border pada .dialog-box.',
      },
      {
        type: 'css-rule',
        selector: '.dialog-box',
        property: 'padding',
        valuePattern: '\\d+(px|rem|em)',
        failureMessage: 'Tambahkan property padding dengan satuan px/rem pada .dialog-box.',
      },
    ],
  },
  {
    id: 5,
    world: 'css',
    title: 'Class dan Selector',
    shortDescription: 'Hias elemen HTML secara spesifik memakai class selector (.).',
    xpChallenge: 50,
    xpLevel: 100,
    npcName: 'Mina si Pelukis',
    npcVariant: 'pink',
    story:
      'Di halaman toko item ada dua tombol berbeda, tetapi keduanya memakai tag yang sama. Gunakan class selector supaya kita bisa mewarnai tombol utama dan badge status secara berbeda!',
    material: [
      'Jika kamu menulis selector tag seperti p { ... }, semua elemen <p> akan ikut berubah.',
      'Dengan class selector yang diawali titik (.), kamu bisa memberi gaya hanya pada elemen yang memiliki nama class yang sesuai.',
    ],
    materialPoints: [
      { code: '.badge-promo', explanation: 'Menargetkan elemen dengan atribut class="badge-promo".' },
      { code: '.tombol-beli', explanation: 'Menargetkan elemen dengan atribut class="tombol-beli".' },
    ],
    codeExample: `.badge-promo {\n  background-color: [kode-warna];\n}\n\n.tombol-beli {\n  background-color: [kode-warna];\n  color: [kode-warna];\n}`,
    whatHappens:
      'Class .badge-promo dan .tombol-beli masing-masing memiliki aturan warna tersendiri secara independen.',
    mission:
      'Beri background-color pada class .badge-promo dan beri background-color serta color pada class .tombol-beli.',
    starterCode: `.badge-promo {\n  color: #25245B;\n  padding: 4px 10px;\n  display: inline-block;\n  /* Tambahkan background-color */\n}\n\n.tombol-beli {\n  padding: 10px 16px;\n  border: 3px solid #25245B;\n  /* Tambahkan background-color dan color */\n}\n`,
    baseHtml: `<div style="padding: 20px; background: #FFF1FC; min-height: 160px; font-family: sans-serif; color: #25245B;">\n  <span class="badge-promo">ITEM BARU</span>\n  <h2 style="margin: 10px 0 8px;">Pedang Kode Pixel</h2>\n  <button class="tombol-beli" type="button">Ambil Item</button>\n</div>`,
    hints: [
      'Pada blok .badge-promo { ... }, isi property background-color dengan warna terang seperti #F6A8E8.',
      'Pada blok .tombol-beli { ... }, isi dua property: background-color dan color.',
      'Pastikan tanda titik (.) sebelum nama class tidak terhapus.',
    ],
    solutionCode: `.badge-promo {\n  color: #25245B;\n  padding: 4px 10px;\n  display: inline-block;\n  background-color: #F6A8E8;\n}\n\n.tombol-beli {\n  padding: 10px 16px;\n  border: 3px solid #25245B;\n  background-color: #A7D8FF;\n  color: #25245B;\n}`,
    solutionExplanation:
      'Class selector memungkinkan setiap komponen di halaman yang sama memiliki gaya berbeda secara rapi dan terarah.',
    checks: [
      {
        type: 'css-rule',
        selector: '.badge-promo',
        property: 'background-color',
        valuePattern: '.+',
        failureMessage: 'Atur background-color untuk selector .badge-promo.',
      },
      {
        type: 'css-rule',
        selector: '.tombol-beli',
        property: 'background-color',
        valuePattern: '.+',
        failureMessage: 'Atur background-color untuk selector .tombol-beli.',
      },
      {
        type: 'css-rule',
        selector: '.tombol-beli',
        property: 'color',
        valuePattern: '.+',
        failureMessage: 'Atur color teks untuk selector .tombol-beli.',
      },
    ],
  },
  {
    id: 6,
    world: 'css',
    title: 'Styling Mini Profile',
    shortDescription: 'Ujian akhir CSS World: sulap kartu profil polos menjadi karya game retro!',
    xpChallenge: 50,
    xpLevel: 100,
    npcName: 'Koko si Builder',
    npcVariant: 'cyan',
    story:
      'Misi puncak CSS World! Kartu profil dari HTML World masih polos. Gunakan seluruh ilmu CSS kamu untuk memberi warna latar, border pixel, padding, dan gaya tag skill!',
    material: [
      'Pada proyek nyata, kita menggabungkan warna, tipografi, border, padding, dan class selector dalam satu stylesheet.',
      'Susun gaya mulai dari wadah utama kartu, lalu judul nama, hingga label keahlian.',
    ],
    materialPoints: [
      { code: '.profile-card', explanation: 'Menata background-color, border, dan padding pembungkus.' },
      { code: '.profile-name', explanation: 'Mengatur property color untuk teks judul nama.' },
      { code: '.skill-chip', explanation: 'Memberi background-color khas lencana keahlian.' },
    ],
    codeExample: `.profile-card {\n  background-color: [kode-warna];\n  border: [ketebalan]px solid [kode-warna];\n  padding: [ukuran-jarak]px;\n}\n\n.profile-name {\n  color: [kode-warna];\n}\n\n.skill-chip {\n  background-color: [kode-warna];\n}`,
    whatHappens:
      'Ketiga class ditargetkan secara lengkap: .profile-card diberi latar, border, dan padding; .profile-name diberi warna teks; dan .skill-chip diberi latar warna.',
    mission:
      'Lengkapi 3 class berikut: .profile-card (punya background-color, border, dan padding), .profile-name (punya color), dan .skill-chip (punya background-color).',
    starterCode: `.profile-card {\n  /* Tambahkan background-color, border, dan padding */\n}\n\n.profile-name {\n  margin: 0 0 8px;\n  /* Tambahkan color */\n}\n\n.skill-chip {\n  display: inline-block;\n  padding: 4px 10px;\n  margin-right: 6px;\n  color: #25245B;\n  /* Tambahkan background-color */\n}\n`,
    baseHtml: `<div style="padding: 18px; background: #A7D8FF; min-height: 180px; font-family: sans-serif; color: #25245B;">\n  <div class="profile-card">\n    <h2 class="profile-name">Petualang Web</h2>\n    <p style="margin: 0 0 12px;">Siap membangun website kreatif dengan HTML dan CSS!</p>\n    <div>\n      <span class="skill-chip">HTML5</span>\n      <span class="skill-chip">CSS3</span>\n    </div>\n  </div>\n</div>`,
    hints: [
      'Pada .profile-card, isi 3 property: background-color, border, dan padding.',
      'Pada .profile-name, tambahkan property color agar judul kontras terhadap latar kartu.',
      'Pada .skill-chip, tambahkan property background-color agar label keahlian tampil menonjol.',
    ],
    solutionCode: `.profile-card {\n  background-color: #FFFFFF;\n  border: 3px solid #25245B;\n  padding: 18px;\n}\n\n.profile-name {\n  margin: 0 0 8px;\n  color: #25245B;\n}\n\n.skill-chip {\n  display: inline-block;\n  padding: 4px 10px;\n  margin-right: 6px;\n  color: #25245B;\n  background-color: #F6A8E8;\n}`,
    solutionExplanation:
      'Gabungan kartu ber-border, judul kontras, dan chip berwarna menjadikan halaman Mini Profile tampil hidup dan terorganisir.',
    checks: [
      {
        type: 'css-rule',
        selector: '.profile-card',
        property: 'background-color',
        valuePattern: '.+',
        failureMessage: 'Tambahkan background-color pada .profile-card.',
      },
      {
        type: 'css-rule',
        selector: '.profile-card',
        property: 'border',
        valuePattern: '.+',
        failureMessage: 'Tambahkan border pada .profile-card.',
      },
      {
        type: 'css-rule',
        selector: '.profile-card',
        property: 'padding',
        valuePattern: '\\d+(px|rem|em)',
        failureMessage: 'Tambahkan padding dengan satuan px/rem pada .profile-card.',
      },
      {
        type: 'css-rule',
        selector: '.profile-name',
        property: 'color',
        valuePattern: '.+',
        failureMessage: 'Tambahkan property color pada .profile-name.',
      },
      {
        type: 'css-rule',
        selector: '.skill-chip',
        property: 'background-color',
        valuePattern: '.+',
        failureMessage: 'Tambahkan background-color pada .skill-chip.',
      },
    ],
  },
];
