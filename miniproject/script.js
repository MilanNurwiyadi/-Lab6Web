// Pemilihan elemen DOM
const formWorkshop = document.getElementById("formPendaftaranWorkshop");
const inputNama = document.getElementById("nama");
const inputEmail = document.getElementById("email");
const selectSesi = document.getElementById("sesi");

const hitungKarakter = document.getElementById("hitungKarakter");
const ringkasanNama = document.getElementById("ringkasanNama");
const ringkasanEmail = document.getElementById("ringkasanEmail");
const ringkasanSesi = document.getElementById("ringkasanSesi");

const pesanNotifikasi = document.getElementById("pesanNotifikasi");
const tombolReset = document.getElementById("tombolReset");

// Fungsi 1: Menampilkan pesan kesalahan atau sukses di halaman
function perbaruiNotifikasi(pesan, jenis) {
    pesanNotifikasi.textContent = pesan;
    pesanNotifikasi.classList.remove("notifikasi-error", "notifikasi-sukses");

    if (jenis === "error") {
        pesanNotifikasi.classList.add("notifikasi-error");
    } else if (jenis === "sukses") {
        pesanNotifikasi.classList.add("notifikasi-sukses");
    }
}

// Fungsi 2: Memperbarui ringkasan input dan penghitung karakter secara langsung
function perbaruiRingkasan() {
    const teksNama = inputNama.value;
    const teksEmail = inputEmail.value.trim();
    const nilaiSesi = selectSesi.value;

    hitungKarakter.textContent = teksNama.length;
    ringkasanNama.textContent = teksNama.trim() !== "" ? teksNama.trim() : "-";
    ringkasanEmail.textContent = teksEmail !== "" ? teksEmail : "-";
    ringkasanSesi.textContent = nilaiSesi !== "" ? nilaiSesi : "Belum dipilih";
}

// Event 'input' pada nama dan email
inputNama.addEventListener("input", perbaruiRingkasan);
inputEmail.addEventListener("input", perbaruiRingkasan);

// Event 'change' pada dropdown pilihan sesi
selectSesi.addEventListener("change", perbaruiRingkasan);

// Fungsi 3: Validasi nama, email, dan pilihan sesi saat form disubmit
formWorkshop.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = inputNama.value.trim();
    const email = inputEmail.value.trim();
    const sesi = selectSesi.value;
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nama === "") {
        perbaruiNotifikasi("Kesalahan: Nama lengkap wajib diisi.", "error");
        inputNama.focus();
        return;
    }

    if (nama.length < 3) {
        perbaruiNotifikasi("Kesalahan: Nama lengkap minimal 3 karakter.", "error");
        inputNama.focus();
        return;
    }

    if (email === "" || !polaEmail.test(email)) {
        perbaruiNotifikasi("Kesalahan: Masukkan format email yang valid.", "error");
        inputEmail.focus();
        return;
    }

    if (sesi === "") {
        perbaruiNotifikasi("Kesalahan: Silakan pilih sesi workshop terlebih dahulu.", "error");
        selectSesi.focus();
        return;
    }

    perbaruiNotifikasi(
        `Pendaftaran berhasil! ${nama} (${email}) terdaftar pada ${sesi}.`,
        "sukses"
    );

    formWorkshop.reset();
    perbaruiRingkasan();
});

// Fungsi 4: Tombol reset / hapus seluruh input dan notifikasi
tombolReset.addEventListener("click", function () {
    formWorkshop.reset();
    perbaruiRingkasan();
    pesanNotifikasi.textContent = "";
    pesanNotifikasi.classList.remove("notifikasi-error", "notifikasi-sukses");
    inputNama.focus();
});