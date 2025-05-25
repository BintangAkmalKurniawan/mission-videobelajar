import { Outlet, useLocation } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import { RiRadioButtonLine } from "react-icons/ri";

function Navbar() {
  const location = useLocation();

  const isOrderPage = location.pathname === "/order";
  const isPaymentPage = location.pathname === "/payment";
  const isSuccessPage = location.pathname === "/success-order";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm px-4 sm:px-20 flex justify-between items-center h-[60px]">
        <h1 className="text-orange-500 text-xl font-bold">videobelajar</h1>
        <div className="hidden sm:flex items-center text-gray-400">
          {/* Step 1: Pilih Metode */}
          <div className="flex items-center">
            {isOrderPage ? <RiRadioButtonLine className="text-[30px] text-[#3ECF4C]" /> : <FaCheckCircle className="text-[30px] text-[#3ECF4C]" />}
            <span className={`ml-2 font-medium mr-10 ${isOrderPage ? "text-black" : "text-gray-400"}`}>Pilih Metode</span>
          </div>

          <div className="w-[74px] h-[3px] bg-[#3A354161]"></div>

          {/* Step 2: Bayar */}
          <div className="flex items-center">
            {isPaymentPage ? <RiRadioButtonLine className="text-[30px] text-[#3ECF4C]" /> : isSuccessPage ? <FaCheckCircle className="text-[30px] text-[#3ECF4C]" /> : <RiRadioButtonLine className="text-[30px]" />}
            <span className={`ml-2 font-medium mr-10 ${isPaymentPage ? "text-black" : "text-gray-400"}`}>Bayar</span>
          </div>

          <div className="w-[74px] h-[3px] bg-[#3A354161]"></div>

          {/* Step 3: Selesai */}
          <div className="flex items-center">
            {isSuccessPage ? <RiRadioButtonLine className="text-[30px] text-[#3ECF4C]" /> : <RiRadioButtonLine className="text-[30px]" />}
            <span className={`ml-2 font-medium ${isSuccessPage ? "text-black" : "text-gray-400"}`}>Selesai</span>
          </div>
        </div>
      </header>

      <div className="pt-[60px] bg-[#f8f2ea]">
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
