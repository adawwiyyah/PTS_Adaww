// link api utama produk
const API_URL = "https://dummyjson.com/products";

// mengambil elemen dom
const gridProduk = document.getElementById("grid-produk");
const elLoading = document.getElementById("loading");
const elErrorBox = document.getElementById("error-box");
const elPesanError = document.getElementById("pesan-error");
const elWaktuMuat = document.getElementById("waktu-muat");
const btnRetry = document.getElementById("btn-retry");
const selectKategori = document.getElementById("select-kategori");

// elemen statistik
const statTotal = document.getElementById("stat-total");
const statRata = document.getElementById("stat-rata");
const statTermahal = document.getElementById("stat-termahal");
const statKategori = document.getElementById("stat-kategori");

// elemen form pemesanan
const formPreferensi = document.getElementById("form-preferensi");
const inputNama = document.getElementById("nama-pemohon");
const selectProdukPesan = document.getElementById("select-produk-pesan");
const errorPreferensi = document.getElementById("error-preferensi");
const notifSukses = document.getElementById("notif-sukses");
const checkboxes = document.querySelectorAll('input[name="preferensi"]');

let dataProdukSemua = [];

// 1. mengambil data dari api
async function ambilDataProduk() {
  elLoading.style.display = "block";
  elErrorBox.style.display = "none";
  btnRetry.style.display = "none";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Gagal muat data, status: ${response.status}`);
    }

    const data = await response.json();

    // menyaring data kemudian buang kategori furniture
    dataProdukSemua = data.products.filter(
      (item) => item.category !== "furniture",
    );

    // memanggil fungsi pendukung
    isiOptionKategori(dataProdukSemua);
    tampilkanProduk(dataProdukSemua);
    hitungStatistik(dataProdukSemua);
    catatWaktuMuat();

    // menyembunyikan loading
    elLoading.style.display = "none";
  } catch (error) {
    // menampil tombol retry jika terjadi error
    elLoading.style.display = "none";
    elErrorBox.style.display = "block";
    elPesanError.textContent = error.message;
    btnRetry.style.display = "inline-block";
  }
}

// 2. menghitung statistik
function hitungStatistik(listProduk) {
  if (listProduk.length === 0) {
    statTotal.textContent = "0";
    statRata.textContent = "$0";
    statTermahal.textContent = "-";
    statKategori.textContent = "0";
    return;
  }

  // a. menghitung total jumlah produk
  statTotal.textContent = listProduk.length;

  // b. menghitung rata-rata harga produk menggunakan .reduce()
  const totalHarga = listProduk.reduce((acc, item) => acc + item.price, 0);
  const rataRata = (totalHarga / listProduk.length).toFixed(2);
  statRata.textContent = `$${rataRata}`;

  // c. menentukan produk dengan harga termahal
  const termahal = listProduk.reduce(
    (max, item) => (item.price > max.price ? item : max),
    listProduk[0],
  );
  statTermahal.textContent = `${termahal.title} ($${termahal.price})`;

  // d. menghitung jumlah kategori unik menggunakan set
  const kategoriUnik = new Set(listProduk.map((p) => p.category));
  statKategori.textContent = kategoriUnik.size;
}

// 3. tampilan fungsi render kartu produk
function tampilkanProduk(listProduk) {
  gridProduk.innerHTML = "";

  if (listProduk.length === 0) {
    gridProduk.innerHTML = "<p>Produk tidak ditemukan.</p>";
    return;
  }

  listProduk.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card-produk";
    card.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}">
      <span class="kat-produk">${item.category}</span>
      <h4 class="judul-produk">${item.title}</h4>
      <div class="harga-wrapper">
        <p class="harga-produk">Harga: <strong>$${item.price}</strong> | Rating: ${item.rating}</p>
        <button class="btn-detail">Lihat Produk</button>
      </div>
    `;
    gridProduk.appendChild(card);
  });
}

// 4. tampilan isi dropdown filter utama
function isiOptionKategori(listProduk) {
  const daftarKategori = [
    "semua",
    ...new Set(listProduk.map((p) => p.category)),
  ];

  selectKategori.innerHTML = daftarKategori
    .map((kat) => `<option value="${kat}">${kat.toUpperCase()}</option>`)
    .join("");
}

// filter produk utama
selectKategori.addEventListener("change", (e) => {
  const pilihan = e.target.value;
  let hasilFilter = dataProdukSemua;

  if (pilihan !== "semua") {
    hasilFilter = dataProdukSemua.filter((p) => p.category === pilihan);
  }

  tampilkanProduk(hasilFilter);
  hitungStatistik(hasilFilter);
});

// update dropdown pilihan produk di form berdasarkan checkbox kategori yang dicentang
checkboxes.forEach((cb) => {
  cb.addEventListener("change", updateDropdownProdukForm);
});

function updateDropdownProdukForm() {
  const kategoriDicentang = Array.from(checkboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  selectProdukPesan.innerHTML = "";

  if (kategoriDicentang.length === 0) {
    selectProdukPesan.innerHTML =
      '<option value="">-- Pilih Kategori Di Atas Terlebih Dahulu --</option>';
    return;
  }

  // Menyaring daftar produk sesuai checkbox kategori
  const produkTersedia = dataProdukSemua.filter((p) =>
    kategoriDicentang.includes(p.category),
  );

  if (produkTersedia.length === 0) {
    selectProdukPesan.innerHTML =
      '<option value="">-- Tidak ada produk untuk kategori ini --</option>';
    return;
  }

  selectProdukPesan.innerHTML = '<option value="">-- Pilih Produk --</option>';
  produkTersedia.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = `${p.title} ($${p.price})`;
    opt.textContent = `${p.title} - $${p.price} [${p.category.toUpperCase()}]`;
    selectProdukPesan.appendChild(opt);
  });
}

// 5. memvalidasi form & tampilkan notifikasi instruksi wa tanpa membuka wa otomatis (digit Z=8)
formPreferensi.addEventListener("submit", (e) => {
  e.preventDefault();
  errorPreferensi.textContent = "";
  notifSukses.style.display = "none";

  const nama = inputNama.value.trim();
  const dicentang = document.querySelectorAll(
    'input[name="preferensi"]:checked',
  );
  const produkDipilih = selectProdukPesan.value;

  // validasi 1: nama wajib diisi
  if (nama === "") {
    errorPreferensi.textContent = "Nama pembeli / UMKM wajib diisi!";
    return;
  }

  // validasi 2: minimal 1 checkbox dipilih (syarat digit Z)
  if (dicentang.length === 0) {
    errorPreferensi.textContent =
      "Minimal satu kategori/preferensi harus dipilih!";
    return;
  }

  // validasi 3: produk harus dipilih
  if (!produkDipilih) {
    errorPreferensi.textContent =
      "Silakan pilih produk yang ingin dipesan dari daftar!";
    return;
  }

  // jika lolos validasi, tampilkan pesan sukses berupa instruksi di dalam web
  const katTeks = Array.from(dicentang)
    .map((c) => c.value)
    .join(", ");

  notifSukses.innerHTML = `
    <strong>✅ Pengajuan Preferensi & Pesanan Berhasil Ditambahkan!</strong><br>
    --------------------------------------------------<br>
    👤 <strong>Pemohon:</strong> ${nama}<br>
    📦 <strong>Produk Dipesan:</strong> ${produkDipilih}<br>
    🏷️ <strong>Kategori:</strong> ${katTeks}<br>
    --------------------------------------------------<br>
    📲 <em>Silakan konfirmasi atau cek rincian pembayaran melalui WhatsApp Admin UpunStore.</em>
  `;

  notifSukses.style.display = "block";

  // reset input form
  formPreferensi.reset();
  updateDropdownProdukForm();
});

// 6. tampilan waktu muat (challenge C=1)
function catatWaktuMuat() {
  const skrg = new Date();
  const jam = skrg.toLocaleTimeString("id-ID");
  elWaktuMuat.textContent = `Waktu pemuatan data: ${jam} WITA`;
}

// Event handler untuk tombol Retry
btnRetry.addEventListener("click", ambilDataProduk);

// Event handler untuk tombol Retry
document.addEventListener("DOMContentLoaded", ambilDataProduk);
