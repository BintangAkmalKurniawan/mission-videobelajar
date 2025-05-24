export const paymentMethods = [
  {
    category: "Transfer Bank",
    methods: ["Bank BCA", "Bank BNI", "Bank BRI", "Bank Mandiri"],
  },
  {
    category: "E-Wallet",
    methods: ["Dana", "OVO", "LinkAja", "Shopee Pay"],
  },
  {
    category: "Kartu Kredit/Debit",
    methods: ["Master Card", "Visa", "JCB"],
  },
];

export const paymentLogos = {
  "Bank BCA": "bank-bca.png",
  "Bank BNI": "bank-bni.png",
  "Bank BRI": "bank-bri.png",
  "Bank Mandiri": "bank-mandiri.png",
  Dana: "dana.png",
  OVO: "ovo.png",
  LinkAja: "linkaja.png",
  "Shopee Pay": "shopeePay.png",
  "Master Card": "mastercard.png",
  Visa: "visa.png",
  JCB: "jcb.png",
};

export const paymentTutorial = [
  {
    category: "ATM BCA",
    steps: [
      "Masukkan kartu ATM dan PIN BCA Anda",
      'Di menu utama, pilih "Transaksi Lainnya". Pilih "Transfer". Pilih "Ke BCA Virtual Account"',
      "Masukkan nomor Virtual Account",
      "Pastikan data Virtual Account Anda benar, kemudian masukkan angka yang perlu Anda bayarkan, kemudian pilih “Benar”",
      "Cek dan perhatikan konfirmasi pembayaran dari layar ATM, jika sudah benar pilih “Ya”, atau pilih “Tidak” jika data di layar masih salah",
      "Transaksi Anda sudah selesai. Pilih “Tidak” untuk tidak melanjutkan transaksi lain",
    ],
  },
  {
    category: "Mobile Banking BCA",
    steps: [
      "Buka Aplikasi BCA Mobile",
      'Pilih "m-BCA", kemudian pilih "m-Transfer"',
      'Pilih "BCA Virtual Account"',
      'Masukkan nomor Virtual Account, lalu pilih "OK"',
      'Klik tombol "Send" yang berada di sudut kanan atas aplikasi untuk melakukan transfer',
      'Klik "OK" untuk melanjutkan pembayaran',
      "Masukkan PIN Anda untuk meng-otorisasi transaksi",
      "Transaksi Anda telah selesai",
    ],
  },
  {
    category: "Internet Banking BCA",
    steps: [
      "Login ke KlikBCA Individual",
      'Pilih "Transfer", kemudian pilih "Transfer ke BCA Virtual Account"',
      "Masukkan nomor Virtual Account",
      'Pilih "Lanjutkan" untuk melanjutkan pembayaran',
      'Masukkan "RESPON KEYBCA APPLI 1" yang muncul pada Token BCA Anda, lalu klik tombol "Kirim"',
      "Pembayaran telah selesai",
    ],
  },
];
