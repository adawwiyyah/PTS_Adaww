# UpunStore - Dashboard Produk & Katalog UMKM Digital

Aplikasi web dashboard katalog dan statistik produk UMKM digital interaktif berbasis **Vanilla HTML5, CSS3, dan JavaScript (ES6+)**. Projek ini memanfaatkan REST API dari DummyJSON untuk menyajikan data produk secara real-time.

---

## 📌 1. Identitas Pengembang

- **Nama**: Nabilah 'Adawiyyah
- **NIM**: 26TJ453127
- **Program Studi**: Teknik Komputer
- **Mata Kuliah**: Pemrograman Web (PTS)
- **Institusi**: Universitas Borneo Tarakan

---

## 💻 2. Nama Aplikasi & Deskripsi Singkat

- **Nama Aplikasi**: UpunStore
- **Deskripsi**: UpunStore adalah platform dashboard katalog digital untuk UMKM yang menyajikan informasi produk, analisis statistik ringkas (total produk, rata-rata harga, produk termahal, dan kategori), serta fasilitas pemesanan & pengajuan preferensi produk secara interaktif berbasis Web API.

---

## 🔢 3. Perhitungan Variasi Soal Berdasarkan NIM

Tiga digit terakhir NIM: **127** ($X = 1$, $Y = 2$, $Z = 7$ / Penyesuaian Digit Varian PTS):

- **Digit X = 4**: Dataset **Products** (Dashboard Produk / UMKM)
- **Digit Y = 1**: **Filter Data + Statistik Sederhana** (Analisis array & dropdown filter)
- **Digit Z = 8**: Validasi Form Tambahan (**Minimal 1 kategori/preferensi dipilih pada checkbox**)
- **Perhitungan Challenge (C)**:
  $$S = X + Y + Z = 4 + 1 + 8 = 13$$
  $$C = S \pmod 4 = 13 \pmod 4 = 1$$
  - **Challenge C = 1**: Tombol **Retry** ketika Fetch gagal + **Timestamp** (waktu terakhir data berhasil dimuat).

---

## 🌐 4. Dataset & 8. Endpoint REST API

- **Dataset Utama**: DummyJSON Products
- **Endpoint REST API**: `https://dummyjson.com/products`

---

## ✨ 5. Fitur Utama & Challenge

1. **Pemuatan Data Dynamic (Fetch API)**: Mengambil data dari REST API DummyJSON menggunakan `async/await` secara asynchronous dengan penanganan state _Loading_, _Success_, dan _Error_.
2. **Filter Kategori & Statistik Sederhana (Digit Y)**:
   - Filter dropdown kategori dinamis.
   - 4 Kartu Statistik: Total Produk, Rata-rata Harga (menggunakan `.reduce()`), Produk Termahal, dan Jumlah Kategori Unik (menggunakan `Set`).
3. **Form & Validasi Client-Side (Digit Z = 8)**: Validasi nama pemohon, pilihan produk, dan syarat wajib minimal mencentang 1 _checkbox_ preferensi kategori.
4. **Individual Challenge (C = 1)**:
   - Status penanda waktu (_timestamp_) pemuatan data secara _real-time_.
   - Tombol **Retry** ("🔄 Coba Lagi") yang muncul otomatis jika koneksi API terputus atau gagal.
5. **Palet Warna Warm**: Tampilan antarmuka menggunakan tema hangat (_Crimson Red_, _Warm Orange_, _Soft Gold_, _Cream_).

---

## 🚀 6. Cara Menjalankan Project

1. Unduh atau _clone_ repository ini ke komputer lokal Anda.
2. Buka folder projek `PTS_Adaww` menggunakan text editor seperti **Visual Studio Code**.
3. Buka file `index.html` secara langsung di browser favorit Anda, atau jalankan melalui web server lokal (seperti _Live Server_ VS Code, Laragon, atau XAMPP).
4. Pastikan perangkat terhubung ke internet untuk memuat data dari REST API DummyJSON.

---

## 🖼️ 7. Screenshot Tampilan Aplikasi

Untuk SC tampilanya ada di folder PTS di drive

---

## 🛠️ 8. Struktur Direktori Projek

PTS_Adaww/
│
├── CSS/
│ └── styles.css # Styling layout, grid, & palet warna warm
├── JS/
│ └── app.js # Logika Fetch API, manipulasi DOM, & validasi
├── index.html # Struktur utama dokumen HTML5
└── README.md # Dokumentasi projek

---

## 📝 9. Jawaban 10 Pertanyaan Penjelasan Kode

### 1. Jelaskan alur sejak halaman dibuka sampai data REST API tampil. Sebutkan nama fungsi pada project Anda.

- **Alur Pemuatan Data:**
  1. Saat dokumen HTML selesai dimuat oleh browser, event listener `DOMContentLoaded` mendeteksi kondisi tersebut dan memanggil fungsi utama `ambilDataProduk()`.
  2. Fungsi `ambilDataProduk()` pertama-tama menampilkan elemen indikator _loading spinner_ (`elLoading`) dan menyembunyikan status error jika ada.
  3. Proses request data dikirim ke endpoint DummyJSON (`https://dummyjson.com/products`) menggunakan `await fetch(API_URL)`.
  4. Setelah respon diterima dan diubah menjadi format JSON melalui `response.json()`, data produk disaring terlebih dahulu menggunakan `.filter()` untuk mengecualikan kategori `furniture` sesuai dengan tema UMKM yang diusung.
  5. Hasil filter disimpan ke dalam variabel array `dataProdukSemua`.
  6. Selanjutnya, fungsi `ambilDataProduk()` memanggil fungsi-fungsi pembantu secara berurutan:
     - `tampilkanProduk(dataProdukSemua)` untuk merender kartu produk ke grid DOM (`#grid-produk`).
     - `hitungStatistik(dataProdukSemua)` untuk kalkulasi angka ringkasan statistik.
     - `isiOptionKategori(dataProdukSemua)` untuk mengisi pilihan dropdown filter.
     - `catatWaktuMuat()` untuk mencatat jam pemuatan data terkini.
  7. Terakhir, indikator _loading_ disembunyikan (`display = 'none'`) dan seluruh produk serta angka statistik tampil utuh di layar pengguna.

### 2. Mengapa setelah fetch() selesai Anda masih perlu memeriksa response.ok? Jelaskan dengan kasus pada aplikasi Anda.

- **Penjelasan:**
  Perintah `fetch()` hanya akan melempar (_throw_) error jaringan (seperti koneksi internet terputus total). Namun, jika server API merespon dengan status HTTP error seperti `404 Not Found` atau `500 Internal Server Error`, `fetch()` menganggap janji (_promise_) tersebut tetap berhasil diselesaikan. Oleh karena itu, properti `response.ok` wajib diperiksa.
- **Kasus pada Aplikasi UpunStore:**
  Jika URL endpoint API diubah menjadi alamat yang salah (misalnya `https://dummyjson.com/products_salah`), server akan mengembalikan status `404`. Tanpa pengecekan `if (!response.ok)`, aplikasi akan mencoba mengeksekusi `response.json()` yang gagal atau menghasilkan array kosong, sehingga tampilan web berhenti tanpa memberi tahu pengguna penyebabnya. Dengan memeriksa `response.ok`, aplikasi langsung melempar error `throw new Error(...)` yang kemudian ditangkap oleh blok `catch` untuk menampilkan kotak pesan error merah di layar.

### 3. Pilih satu data JSON dari API dan jelaskan bagaimana data tersebut diubah menjadi elemen DOM yang terlihat.

- **Sampel Data JSON:**
  ```json
  {
    "id": 16,
    "title": "Apple",
    "category": "groceries",
    "price": 1.99,
    "rating": 4.19,
    "thumbnail": "[https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp](https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp)"
  }
  ```
- **Proses Transformasi ke DOM:**
  1. Di dalam fungsi `tampilkanProduk()`, array objek di-iterasi menggunakan metode `.forEach(item)`.
  2. Di setiap iterasi, dibuat elemen `<div>` baru di memori menggunakan `document.createElement('div')` dengan nama kelas `card-produk`.
  3. Properti dari objek JSON disisipkan ke dalam struktur HTML menggunakan template literals (`${item.thumbnail}`, `${item.title}`, `${item.price}`, dll).
  4. Elemen `card-produk` tersebut kemudian ditempelkan (_appended_) ke dalam wadah utama `#grid-produk` menggunakan perintah `gridProduk.appendChild(card)`. Browser lalu mengalkulasi style CSS dan menampilkan gambar beserta teks produk Apple tersebut di layar.

### 4. Apa yang terjadi jika internet terputus, endpoint salah, atau server mengembalikan HTTP 404/500? Jelaskan penanganannya.

- **Proses Penanganan Error:**
  1. Seluruh proses pengambilan data di dalam fungsi `ambilDataProduk()` dibungkus di dalam blok `try...catch`.
  2. Jika internet terputus, `fetch()` melempar error jaringan. Jika endpoint salah / server mengembalikan respon 404/500, statement `if (!response.ok)` secara manual melempar `Error`.
  3. Alur program langsung melompat ke blok `catch (error)`.
  4. Di dalam blok `catch`:
     - Elemen _loading spinner_ disembunyikan.
     - Kotak pesan error (`elErrorBox`) ditampilkan dengan mengubah style menjadi `display = 'block'`.
     - Teks pesan error diisi secara dinamis sesuai pesan kesalahan (`elPesanError.textContent = error.message`).
     - Tombol Retry (`btnRetry`) dimunculkan (`display = 'inline-block'`) agar pengguna dapat mencoba memuat ulang data tanpa harus melakukan _hard-reload_ halaman.

### 5. Jelaskan bagaimana fitur berdasarkan digit Y bekerja. Cantumkan nama fungsi/event yang digunakan.

- **Cara Kerja Fitur (Digit Y - Filter Kategori & Statistik):**
  1. Saat pengguna memilih opsi kategori pada elemen `<select id="select-kategori">`, event listener `change` terpicu.
  2. Nilai kategori yang dipilih (`e.target.value`) diambil.
  3. Jika nilainya bukan `'semua'`, variabel `dataProdukSemua` disaring menggunakan metode `.filter(p => p.category === pilihan)`.
  4. Hasil filter tersebut dikirim ke dua fungsi:
     - `tampilkanProduk(hasilFilter)` untuk memperbarui kartu produk yang cocok di layar.
     - `hitungStatistik(hasilFilter)` untuk mengalkulasi ulang statistik (Total, Rata-rata Harga dengan `.reduce()`, Termahal, dan Jumlah Kategori) berdasarkan data yang telah disaring secara _real-time_.
- **Nama Fungsi & Event yang Digunakan:**
  - Event: `addEventListener('change', ...)` pada elemen `selectKategori`.
  - Fungsi: `isiOptionKategori()`, `tampilkanProduk()`, dan `hitungStatistik()`.

### 6. Jelaskan bagaimana validasi berdasarkan digit Z bekerja dan mengapa input tidak valid tidak boleh langsung diproses.

- **Cara Kerja Validasi (Digit Z = 8):**
  1. Saat tombol form diklik, event listener `submit` pada `formPreferensi` memanggil `e.preventDefault()` untuk menghentikan aksi _default_ pengiriman form (mencegah reload halaman).
  2. JavaScript mengambil input nama pengguna (`inputNama.value.trim()`) dan memeriksa _checkbox_ yang dicentang menggunakan `document.querySelectorAll('input[name="preferensi"]:checked')`.
  3. Terdapat tiga tahapan validasi:
     - Memastikan input nama tidak kosong.
     - Memastikan minimal 1 _checkbox_ preferensi kategori dicentang (`dicentang.length === 0`).
     - Memastikan produk telah dipilih dari _dropdown_.
  4. Jika ada salah satu kriteria yang tidak terpenuhi, fungsi langsung dihentikan (`return`) dan pesan peringatan error ditampilkan di bawah form.
- **Mengapa Input Tidak Valid Tidak Boleh Diproses:**
  Input yang tidak valid dapat menyebabkan data yang disimpan atau dikirim menjadi rusak, tidak konsisten, atau kosong. Mencegah pemrosesan sejak dini (_client-side validation_) menjaga integritas data dan memberikan umpan balik langsung yang jelas bagi pengguna.

### 7. Jika project Anda menggunakan localStorage, jelaskan data apa yang disimpan, kapan data dibaca/diubah, dan alasan penggunaannya. Jika varian Anda tidak menggunakan localStorage, jelaskan satu skenario yang relevan tentang bagaimana localStorage dapat diterapkan pada project Anda tanpa harus menambah fitur baru.

- **Skenario Penerapan LocalStorage pada UpunStore:**
  Meskipun varian NIM projek ini mengandalkan pemrosesan data _real-time_ dari REST API, `localStorage` sangat relevan jika diterapkan untuk **menyimpan preferensi kategori terakhir yang dipilih pengguna**.
  - **Data yang Disimpan:** String nama kategori terakhir (misalnya `'groceries'`).
  - **Kapan Ditulis/Diubah:** Saat pengguna mengubah nilai pada dropdown `selectKategori`, nilai baru disimpan menggunakan `localStorage.setItem('kategoriTerakhir', pilihan)`.
  - **Kapan Dibaca:** Saat halaman pertama kali dimuat (`DOMContentLoaded`), aplikasi membaca `localStorage.getItem('kategoriTerakhir')`. Jika nilai tersebut ada, dropdown dan tampilan produk akan otomatis ter-filter sesuai pilihan terakhir pengguna sebelum halaman ditutup.

### 8. Pilih satu fungsi JavaScript penting, lampirkan potongan maksimal 15 baris, lalu jelaskan input - proses - output.

- **Potongan Kode Fungsi `hitungStatistik()`:**

  ```javascript
  function hitungStatistik(listProduk) {
    if (listProduk.length === 0) return;

    statTotal.textContent = listProduk.length;

    const totalHarga = listProduk.reduce((acc, item) => acc + item.price, 0);
    const rataRata = (totalHarga / listProduk.length).toFixed(2);
    statRata.textContent = `$${rataRata}`;

    const termahal = listProduk.reduce(
      (max, item) => (item.price > max.price ? item : max),
      listProduk[0],
    );
    statTermahal.textContent = `${termahal.title} ($${termahal.price})`;

    const kategoriUnik = new Set(listProduk.map((p) => p.category));
    statKategori.textContent = kategoriUnik.size;
  }
  ```

- **Penjelasan Analisis:**
  - **Input:** Berupa sebuah array objek `listProduk` (baik data keseluruhan maupun hasil penyaringan filter).
  - **Proses:**
    1. Mengukur panjang array untuk menghitung total produk.
    2. Menggunakan metode `.reduce()` pertama untuk menjumlahkan seluruh harga produk dan membaginya dengan jumlah produk (`.toFixed(2)`) guna mencari rata-rata harga.
    3. Menggunakan `.reduce()` kedua untuk membandingkan harga tiap item demi menemukan produk termahal.
    4. Menggunakan `map()` dan pembentukan objek `Set` untuk mengekstrak kategori unik tanpa duplikasi.
  - **Output:** Memperbarui teks elemen DOM (`statTotal`, `statRata`, `statTermahal`, dan `statKategori`) secara dinamis di layar.

### 9. Sebutkan bug/error paling sulit selama PTS, penyebabnya, cara menemukannya, dan cara memperbaikinya.

- **Deskripsi Bug/Error:**
  Kartu produk pada grid katalog memiliki tinggi (_height_) yang tidak sejajar/simetris antar satu sama lain ketika judul produk memiliki panjang karakter yang berbeda.
- **Penyebab:**
  Beberapa judul produk dari API hanya terdiri dari 2 kata, sedangkan produk lain memiliki judul hingga 5-6 kata. Hal ini membuat elemen `<h4>` judul produk membesar ke bawah secara tidak konsisten dan mendorong posisi harga serta tombol menjadi tidak rata.
- **Cara Menemukan:**
  Ditemukan saat melakukan _testing_ visual responsif pada tampilan katalog produk dengan berbagai variasi ukuran layar melalui Developer Tools browser.
- **Cara Memperbaiki:**
  Memperbaiki struktur CSS pada `.card-produk` dengan menerapkan Flexbox (`display: flex; flex-direction: column; height: 100%`), mengunci batas baris judul menggunakan `-webkit-line-clamp: 2` dan `height: 2.6em`, serta membungkus elemen harga dan tombol ke dalam `.harga-wrapper` dengan properti `margin-top: auto` agar posisi tombol selalu terkunci rata di bagian paling bawah kartu.

### 10. Jika diberi satu minggu lagi, sebutkan dua perbaikan teknis yang akan Anda lakukan dan alasannya.

1. **Penerapan Fitur Pencarian Dinamis (_Live Search Bar_):**
   - _Alasan:_ Saat ini pengguna hanya dapat menyaring produk berdasarkan kategori. Penambahan bar pencarian nama produk secara _real-time_ menggunakan input `keyup` dan fungsi `.filter()` akan semakin memudahkan pengguna dalam menemukan produk spesifik secara cepat tanpa harus mencari manual di dalam grid.
2. **Implementasi Modal Popup Detail Produk & Pembagian Halaman (_Pagination_):**
   - _Alasan:_ Mengingat data dari API bisa sangat banyak, pembagian halaman (_pagination_) akan meningkatkan performa pemuatan web (_rendering performance_). Selain itu, modal popup detail produk memungkinkan pengguna melihat informasi deskripsi lengkap, stok, dan galeri foto produk tanpa mengganggu navigasi katalog utama.

---

## 🤖 10. AI Usage Log

Riwayat lengkap penggunaan AI selama proses pengembangan projek ini dicatat pada file tersendiri di repository yaitu **`AI_USAGE_LOG.md`**.
