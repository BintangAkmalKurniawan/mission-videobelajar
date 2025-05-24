import { useNavigate } from "react-router";

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="background-color">
        <div className="min-h-screen bg-gray-50 pt-[60px]">
          <div className="max-w-md mx-auto p-6">
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
              <button onClick={() => navigate("/order-list")} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition">
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
