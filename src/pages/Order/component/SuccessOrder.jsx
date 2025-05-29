import { useNavigate } from "react-router";

function SuccessPage() {
  const navigate = useNavigate();

  const isPaymentPage = location.pathname === "/payment";
  const isSuccessPage = location.pathname === "/success-order";

  return (
    <>
      <section className="relative sm:py-12 mx-10 sm:mx-64">
        <div className="min-h-screen pt-[60px] bg-[#f8f2ea]">
          {/* Mobile Stepper */}
          <div className="sm:hidden flex items-center text-gray-400 mb-6">
            {/* Step 1: Always completed on payment page */}
            <i className="ri-checkbox-circle-fill text-[30px] text-[#3ECF4C]"></i>
            <span className="text-black text-[12px] mr-2 my-auto">Pilih Metode</span>
            <div className="w-[44px] h-[3px] my-auto bg-[#3A354161]"></div>

            {/* Step 2: Bayar */}
            {isPaymentPage ? (
              <i className="ri-radio-button-line text-[30px] text-[#3ECF4C]"></i>
            ) : isSuccessPage ? (
              <i className="ri-checkbox-circle-fill text-[30px] text-[#3ECF4C]"></i>
            ) : (
              <i className="ri-radio-button-line text-[30px] text-gray-300"></i>
            )}
            <span className={`text-[12px] mr-2 my-auto ${isPaymentPage ? "text-black" : isSuccessPage ? "text-black" : "text-gray-300"}`}>Bayar</span>
            <div className="w-[44px] h-[3px] bg-[#3A354161] my-auto"></div>

            {/* Step 3: Selesai */}
            {isSuccessPage ? <i className="ri-radio-button-line text-[30px] text-[#3ECF4C]"></i> : <i className="ri-radio-button-line text-[30px] text-gray-300"></i>}
            <span className={`text-[12px] my-auto ${isSuccessPage ? "text-black" : "text-gray-300"}`}>Selesai</span>
          </div>
          <div className="max-w-md mx-auto">
            {/* Success Content */}
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              {/* Success Icon */}
              <div className="flex justify-center mb-4">
                <img src="./successOrder.png" />
              </div>

              {/* Success Title */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Berhasil!</h2>

              {/* Success Message */}
              <p className="text-gray-600 mb-6">Silakan cek email kamu untuk informasi lebih lanjut. Hubungi kami jika ada kendala.</p>

              {/* Action Button */}
              <button onClick={() => navigate("/list/order-list")} className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg transition">
                Lihat Detail Pesanan
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SuccessPage;
