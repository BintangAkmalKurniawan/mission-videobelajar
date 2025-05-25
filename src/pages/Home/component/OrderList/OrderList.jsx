import { useState } from "react";

// const orders = [
//   {
//     id: 1,
//     invoice: "HEL/VI/10062023",
//     time: "10 Juni 2023, 14.17",
//     status: "Berhasil",
//     title: "Belajar UI/UX untuk Pemula",
//     price: 300000,
//   },
//   {
//     id: 2,
//     invoice: "HEL/VI/10062024",
//     time: "11 Juni 2023, 10.00",
//     status: "Gagal",
//     title: "Belajar Data Science dengan Python",
//     price: 300000,
//   },
//   {
//     id: 3,
//     invoice: "HEL/VI/10062025",
//     time: "12 Juni 2023, 15.30",
//     status: "Belum Bayar",
//     title: "Dasar-dasar Microsoft Excel",
//     price: 300000,
//   },
//   {
//     id: 4,
//     invoice: "HEL/VI/10062026",
//     time: "13 Juni 2023, 09.45",
//     status: "Berhasil",
//     title: "Pemrograman Web dengan HTML & CSS",
//     price: 300000,
//   },
//   {
//     id: 5,
//     invoice: "HEL/VI/10062027",
//     time: "14 Juni 2023, 18.00",
//     status: "Berhasil",
//     title: "Mahir Menggunakan Canva untuk Desain",
//     price: 300000,
//   },
//   {
//     id: 6,
//     invoice: "HEL/VI/10062028",
//     time: "15 Juni 2023, 11.20",
//     status: "Berhasil",
//     title: "Belajar Microsoft Office dan Google Workspace",
//     price: 300000,
//   },
// ];

// const statusColor = {
//   Berhasil: "text-green-600 bg-green-100",
//   Gagal: "text-red-600 bg-red-100",
//   "Belum Bayar": "text-yellow-600 bg-yellow-100",
// };

const OrderList = () => {
  const navbar = ["Semua Pesanan", "Menunggu", "Berhasil", "Gagal"];
  const [selectedCategory, setSelectedCategory] = useState("Semua Kelas");
  return (
    <>
      <div className="relative flex top-[100px] mx-[160px] gap-10">
        {/* flex-1 */}
        <div className=" w-[20%]">
          <p className="text-xl font-bold">Daftar Pesanan</p>
          <p className="text-[15px] text-[#333333AD] mb-5">Informasi terperinci mengenai pembelian</p>
          <div className="grid grid-rows bg-white p-5">
            <button className="text-left h-[49px] text-[#333333AD] text-[18px] hover:bg-[#FFF7D7CC] hover:text-[#FFBD3A] hover:border-2 border-[#FFBD3A] rounded-lg">
              <i class="ri-user-3-fill p-2 text-[24px]"></i>Profil Saya
            </button>
            <button className="text-left h-[49px] text-[#333333AD] text-[18px] hover:bg-[#FFF7D7CC] hover:text-[#FFBD3A] hover:border-2 border-[#FFBD3A] rounded-lg">
              <i class="ri-bookmark-fill p-2 text-[24px]"></i>Kelas Saya
            </button>
            <button className="text-left h-[49px] text-[#333333AD] text-[18px] hover:bg-[#FFF7D7CC] hover:text-[#FFBD3A] hover:border-2 border-[#FFBD3A] rounded-lg">
              <i class="ri-shopping-basket-fill p-2 text-[24px]"></i>Pesanan Saya
            </button>
          </div>
        </div>
        {/* flex-2 */}
        <div className="flex bg-white w-[80%] h-[10%] p-5">
          <div className="pt-2">
            {navbar.map((item) => (
              <span key={item} onClick={() => setSelectedCategory(item)} className={`px-7 py-1 rounded-full cursor-pointer hover:text-[#F64920] ${selectedCategory === item ? " text-[#F64920] font-semibold" : ""}`}>
                {item}
              </span>
            ))}
          </div>
          <div className="px-5 w-full max-w-sm relative">
            <input type="text" placeholder="Cari" className=" p-2 border-2 border-gray-200 rounded-lg" />
            <i className="ri-search-line absolute right-[164px] top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
