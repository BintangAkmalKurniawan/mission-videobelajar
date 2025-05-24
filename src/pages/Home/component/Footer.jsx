import React from "react";

function Footer() {
  return (
    <footer className=" bottom-0 w-full bg-white text-gray-700 border-t">
      <div className="max-w-7xl mx-auto px-6 py-5">
        {/* Atas - Logo & Deskripsi */}
        <div className="mb-6">
          <h2 className="text-xl font-bold">
            <span className="text-yellow-500">video</span>
            <span className="text-red-500">belajar</span>
          </h2>
          <p className="mt-2 font-medium">Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!</p>
          <p className="mt-2 text-sm">Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
          <p className="text-sm">+62-877-7123-1234</p>
        </div>

        {/* Menu responsive */}
        <div className="block sm:hidden border-t border-gray-200 pt-4">
          {["Perusahaan", "Perusahaan", "Komunitas"].map((item, idx) => (
            <details key={idx} className="mb-2">
              <summary className="font-semibold cursor-pointer py-1 flex justify-between items-center">
                {item}
                <span className="ml-2">›</span>
              </summary>
            </details>
          ))}
        </div>

        {/* Menu desktop */}
        <div className="hidden sm:grid grid-cols-3 gap-10">
          {/* Kategori */}
          <div>
            <h4 className="font-semibold mb-2">Kategori</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>Digital & Teknologi</li>
              <li>Pemasaran</li>
              <li>Manajemen Bisnis</li>
              <li>Pengembangan Diri</li>
              <li>Desain</li>
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h4 className="font-semibold mb-2">Perusahaan</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>Tentang Kami</li>
              <li>FAQ</li>
              <li>Kebijakan Privasi</li>
              <li>Ketentuan Layanan</li>
              <li>Bantuan</li>
            </ul>
          </div>

          {/* Komunitas */}
          <div>
            <h4 className="font-semibold mb-2">Komunitas</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>Tips Sukses</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>

        {/* Footer bawah */}
        <div className="border-t mt-8 pt-6 pb-8 flex flex-col items-start lg:flex-row lg:justify-between lg:items-center">
          <div className="flex gap-4 mb-4 lg:mb-0">
            <a href="#" className="text-gray-600 hover:text-black">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <p className="text-sm text-gray-500">@2023 Gerobak Sayur All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
