import React, { useState } from "react";
import { useNavigate } from "react-router";
import { RiSearchLine, RiArrowDownSLine } from "react-icons/ri";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Semua Pesanan");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Data dummy pesanan
  const orders = [
    {
      id: 1,
      invoice: "HEL/VI/I0062023",
      date: "10 Juni 2023, 14.17",
      status: "Berhasil",
      course: "Belajar Microsoft Office dan Google Workspace untuk Pemula",
      price: "Rp 300.000",
    },
    {
      id: 2,
      invoice: "HEL/VI/I0062024",
      date: "11 Juni 2023, 10.30",
      status: "Gagal",
      course: "Belajar Microsoft Office dan Google Workspace untuk Pemula",
      price: "Rp 300.000",
    },
    {
      id: 3,
      invoice: "HEL/VI/I0062025",
      date: "12 Juni 2023, 09.15",
      status: "Menunggu",
      course: "Belajar Microsoft Office dan Google Workspace untuk Pemula",
      price: "Rp 300.000",
    },
  ];

  // Tab filter
  const tabs = ["Semua Pesanan", "Menunggu", "Berhasil", "Gagal"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-center">Daftar Pesanan</h1>
      </header>

      {/* Konten Utama */}
      <main className="container mx-auto p-4">
        {/* Filter dan Pencarian */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-lg font-semibold">Informasi Pembelian</h2>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {/* Tab Filter */}
              <div className="flex overflow-x-auto pb-2 sm:pb-0">
                {tabs.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm whitespace-nowrap ${activeTab === tab ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-500"}`}>
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search dan Sort */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input type="text" placeholder="Cari Kelas" className="border rounded-lg p-2 pl-10 w-full text-sm" />
                  <RiSearchLine className="absolute left-3 top-3 text-gray-400" />
                </div>
                <div className="relative">
                  <button onClick={() => setIsSortOpen(!isSortOpen)} className="border rounded-lg p-2 flex items-center gap-1 text-sm">
                    Urutkan <RiArrowDownSLine />
                  </button>
                  {isSortOpen && (
                    <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 w-40">
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Terbaru</button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">Terlama</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Daftar Pesanan */}
          <div className="space-y-4">
            {orders
              .filter((order) => activeTab === "Semua Pesanan" || order.status === activeTab)
              .map((order) => (
                <div key={order.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-500">No. Invoice: {order.invoice}</p>
                      <p className="text-sm text-gray-500">Waktu Pembayaran: {order.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${order.status === "Berhasil" ? "bg-green-100 text-green-800" : order.status === "Gagal" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="my-3">
                    <h3 className="font-medium">{order.course}</h3>
                    <p className="text-gray-500 text-sm mt-1">Harga: {order.price}</p>
                  </div>

                  <div className="flex justify-between items-center border-t pt-3">
                    <p className="font-semibold">Total Pembayaran: {order.price}</p>
                    {order.status === "Berhasil" && (
                      <button onClick={() => navigate(`/course-access`)} className="text-orange-500 text-sm font-medium">
                        Akses Kelas
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-1">
              <button className="px-3 py-1 border rounded text-sm">{"<"}</button>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button key={num} className={`px-3 py-1 border rounded text-sm ${num === 1 ? "bg-orange-500 text-white" : ""}`}>
                  {num}
                </button>
              ))}
              <button className="px-3 py-1 border rounded text-sm">{">"}</button>
            </nav>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 mt-8">
        <div className="container mx-auto text-center">
          <p className="mb-4">Gali Potensi Anda Melalui Pembelajaran Video di haresok.id!</p>
          <p className="text-sm">
            Jl. Usman Effendi No. 50 Lowokwaru, Malang
            <br />
            +62-877-7123-1234
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6 text-sm">
            <div>
              <h4 className="font-bold mb-2">Kategori</h4>
              <p>Digital & Teknologi</p>
              <p>Pemasaran</p>
              <p>Manajemen Bisnis</p>
            </div>
            <div>
              <h4 className="font-bold mb-2 invisible">-</h4>
              <p>Pengembangan Diri</p>
              <p>Desain</p>
              <p>Perusahaan</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Tentang Kami</h4>
              <p>FAQ</p>
              <p>Kebijakan Privasi</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Bantuan</h4>
              <p>Komunitas</p>
              <p>Tips Sukses</p>
              <p>Blog</p>
            </div>
          </div>

          <p className="mt-8 text-xs">©2023 Gerobak Soyur All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default OrdersPage;
