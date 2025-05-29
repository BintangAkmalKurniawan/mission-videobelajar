import { Outlet, useNavigate, useLocation } from "react-router";
import Footer from "../Footer.jsx";

export default function List() {
  const navigate = useNavigate();
  const location = useLocation();

  // Fungsi untuk menentukan apakah link aktif
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className="relative sm:flex flex-col sm:flex-row top-[100px] sm:mx-[160px] mx-4 gap-6 mb-[200px]">
        {/* Sidebar */}
        <div className="sm:w-[20%] w-full mb-6 sm:mb-0">
          <p className="text-xl font-bold">Daftar Pesanan</p>
          <p className="text-[15px] text-[#333333AD] mb-5">Informasi terperinci mengenai pembelian</p>
          <div className="grid grid-rows bg-white p-5 border-2 border-gray-200 rounded-lg">
            <button
              className={`text-left h-[49px] text-[18px] rounded-lg flex items-center ${
                isActive("/list/profile") ? "text-[#FFBD3A] border-2 border-[#FFBD3A] bg-[#FFF7D7CC]" : "text-[#333333AD] hover:bg-[#FFF7D7CC] hover:text-[#FFBD3A] hover:border-2 hover:border-[#FFBD3A]"
              }`}
              onClick={() => navigate("/list/profile")}
            >
              <i className="ri-user-3-fill p-2 text-[24px]"></i>Profil Saya
            </button>
            <button
              className={`text-left h-[49px] text-[18px] rounded-lg flex items-center ${
                isActive("/list/class-list") ? "text-[#FFBD3A] border-2 border-[#FFBD3A] bg-[#FFF7D7CC]" : "text-[#333333AD] hover:bg-[#FFF7D7CC] hover:text-[#FFBD3A] hover:border-2 hover:border-[#FFBD3A]"
              }`}
              onClick={() => navigate("/list/class-list")}
            >
              <i className="ri-bookmark-fill p-2 text-[24px]"></i>Kelas Saya
            </button>
            <button
              className={`text-left h-[49px] text-[18px] rounded-lg flex items-center ${
                isActive("/list/order-list") ? "text-[#FFBD3A] border-2 border-[#FFBD3A] bg-[#FFF7D7CC]" : "text-[#333333AD] hover:bg-[#FFF7D7CC] hover:text-[#FFBD3A] hover:border-2 hover:border-[#FFBD3A]"
              }`}
              onClick={() => navigate("/list/order-list")}
            >
              <i className="ri-shopping-basket-fill p-2 text-[24px]"></i>Pesanan Saya
            </button>
          </div>
        </div>
        <div className="sm:w-[90%] w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
