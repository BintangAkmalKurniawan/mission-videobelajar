import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FileText, Video, FileBadge, BadgeCheck, FileSearch, Globe } from "lucide-react";
import { paymentLogos, paymentTutorial } from "../../../dataOrder.js";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function PaymentType() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(2 * 60); // 20 minutes in seconds
  const [paymentFailed, setPaymentFailed] = useState(false);

  const [expandedCategory, setExpandedCategory] = useState(null);

  // Handle missing data
  if (!state) {
    return (
      <div className="p-4 text-center mt-[60px]">
        <p>Data tidak tersedia</p>
        <button onClick={() => navigate("/order")} className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg">
          Kembali ke Order
        </button>
      </div>
    );
  }

  const { productData, paymentMethod, totalPayment, adminFee } = state;

  // Format price function
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("Rp", "Rp ");
  };

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setPaymentFailed(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle payment failure
  useEffect(() => {
    if (paymentFailed) {
      const timer = setTimeout(() => {
        navigate("/home");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [paymentFailed, navigate]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Payment method details
  const getPaymentDetails = () => {
    const bankMethods = {
      "Bank BCA": { accountNumber: "11738 081234567890", accountName: "videobelajar" },
      "Bank BNI": { accountNumber: "8812 3456 7890", accountName: "videobelajar" },
      "Bank BRI": { accountNumber: "1234 56 789012 345", accountName: "videobelajar" },
      "Bank Mandiri": { accountNumber: "1234 5678 9012", accountName: "videobelajar" },
    };

    const eWalletMethods = {
      Dana: { accountNumber: "081234567890", accountName: "videobelajar" },
      OVO: { accountNumber: "081234567890", accountName: "videobelajar" },
      LinkAja: { accountNumber: "081234567890", accountName: "videobelajar" },
      "Shopee Pay": { accountNumber: "081234567890", accountName: "videobelajar" },
    };

    const cardMethods = {
      "Master Card": { accountNumber: "1234 5678 9012 3456", accountName: "videobelajar" },
      Visa: { accountNumber: "1234 5678 9012 3456", accountName: "videobelajar" },
      JCB: { accountNumber: "1234 5678 9012 3456", accountName: "videobelajar" },
    };

    if (bankMethods[paymentMethod]) return { ...bankMethods[paymentMethod], type: "Virtual Account" };
    if (eWalletMethods[paymentMethod]) return { ...eWalletMethods[paymentMethod], type: "E-Wallet" };
    if (cardMethods[paymentMethod]) return { ...cardMethods[paymentMethod], type: "Kartu" };

    return {
      accountNumber: "1234 5678 9012 3456",
      accountName: "videobelajar",
      type: "Virtual Account",
    };
  };

  const paymentDetails = getPaymentDetails();

  return (
    <>
      {/* Timer Section - Matches Design Image */}
      <div className=" h-[56px] bg-[#FEE8D2CC] border border-[#FFE5E5] rounded-lg ">
        <div className="flex justify-center">
          <div className="flex gap-3">
            <div className="flex mt-3 gap-3">
              <p className="text-[15px] text-[#5F6368]">Selesaikan pemesanan dalam</p>
              <p className="text-[#FF3A3A] font-bold">{formatTime(timeLeft)}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="relative sm:py-12 mx-10 sm:mx-64">
        {/* Payment failed notification */}
        {paymentFailed && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md text-center">
              <h3 className="text-xl font-bold text-red-500 mb-2">Pembayaran Gagal</h3>
              <p className="mb-4">Waktu pembayaran telah habis. Anda akan diarahkan kembali ke halaman order.</p>
            </div>
          </div>
        )}

        {/* Mobile Stepper */}
        <div className="sm:hidden flex items-center text-gray-400 mb-6">
          <i className="ri-radio-button-line text-[30px] text-[#3ECF4C]"></i>
          <span className="text-black text-[12px] mr-2 my-auto">Pilih Metode</span>
          <div className="w-[44px] h-[3px] my-auto bg-[#3A354161]"></div>
          <i className="ri-radio-button-line text-[30px] text-[#3ECF4C]"></i>
          <span className="text-black text-[12px] mr-2 my-auto">Bayar</span>
          <div className="w-[44px] h-[3px] bg-[#3A354161] my-auto"></div>
          <i className="ri-radio-button-line text-[30px]"></i>
          <span className="text-[12px] my-auto">Selesai</span>
        </div>

        <div className="sm:hidden block w-full sm:w-[30%] py-5 order-1 sm:order-2">
          <div className="bg-white py-5 rounded-lg border-2 border-gray-200 px-5 sticky top-20">
            <img src={productData.image} alt={productData.title} className="w-full h-40 object-cover rounded-md mb-3" />
            <p className="text-[20px] text-[#222325] font-bold">{productData.title}</p>
            <div className="flex gap-2">
              <p className="text-[19px] text-[#3ECF4C] font-semibold text-sm pt-4">{formatPrice(productData.basePrice * 1000).replace("Rp ", "Rp")}</p>
              <p className="text-[23px] text-[#3A354161] font-semibold text-sm pt-4"></p>
            </div>

            <div className="text-gray-800 space-y-6 text-sm">
              <div>
                <h2 className="font-semibold text-base mb-3 pt-6">Kelas Ini Sudah Termasuk</h2>
                <div className="grid grid-cols-2 gap-3 text-gray-600">
                  <div className="flex items-center gap-2">
                    <FileText size={18} />
                    <span>Ujian Akhir</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video size={18} />
                    <span>49 Video</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileBadge size={18} />
                    <span>7 Dokumen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck size={18} />
                    <span>Sertifikat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileSearch size={18} />
                    <span>Pretest</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-base mb-3">Bahasa Pengantar</h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe size={18} />
                  <span>Bahasa Indonesia</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:flex sm:gap-10">
          <div className="w-full sm:w-[70%] py-5 order-2 sm:order-1">
            {/* Payment Method Section */}
            <div className=" bg-white py-5 rounded-lg border-2 border-gray-200 mb-6">
              <h2 className="text-xl font-bold px-8 mb-6">Metode Pembayaran</h2>

              <div className="rounded-lg border-2 border-gray-200 mx-5 py-5">
                <div className="flex justify-center gap-3 mb-2">
                  <img
                    src={paymentLogos[paymentMethod] ? `/payment-logos/${paymentLogos[paymentMethod]}` : "/payment-logos/default.png"}
                    alt={paymentMethod}
                    className="w-12 h-8 object-contain"
                    onError={(e) => {
                      e.target.src = "/payment-logos/default.png";
                    }}
                  />
                  <h3 className="font-semibold text-lg">{paymentMethod}</h3>
                </div>
                <p className="flex justify-center text-gray-600 mb-1">Bayar Melalui {paymentDetails.type}</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="flex justify-center font-mono text-xl">{paymentDetails.accountNumber}</p>
                  <p className="flex justify-center text-gray-600">{paymentDetails.accountName}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className=" py-5 ">
                <h2 className="text-lg font-semibold px-8 mb-4">Ringkasan Pesanan</h2>

                <div className="px-8 space-y-4">
                  <div className="flex justify-between">
                    <p className="text-gray-700">{productData.title}</p>
                    <p className="font-semibold text-gray-400">{formatPrice(productData.basePrice * 1000)}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-gray-600">Biaya Admin</p>
                    <p className="text-gray-600">{formatPrice(adminFee)}</p>
                  </div>

                  <hr className="my-2" />

                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg">Total Pembayaran</p>
                    <p className="text-green-600 font-bold text-lg">{formatPrice(totalPayment)}</p>
                  </div>
                </div>

                <div className="px-8 mt-6 flex gap-3">
                  {/* <button onClick={() => navigate("/order")} className="text-orange-500 font-medium text-sm">
                    Ganti Metode Pembayaran
                  </button> */}
                  <button onClick={() => navigate("/change-payment", { state })} className="w-full bg-white text-green-500 border-2 border-green-500 hover:bg-green-50 font-semibold py-3 rounded-lg transition">
                    Ganti Pembayaran
                  </button>
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition" onClick={() => navigate("/success-order")}>
                    Bayar Sekarang
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Instructions - Placeholder */}
            <div className="bg-white py-5 rounded-lg border-2 border-gray-200">
              <h2 className="text-xl font-bold px-8 mb-6">Tata Cara Pembayaran</h2>

              {paymentTutorial.map((methodGroup) => (
                <div key={methodGroup.category} className="px-8 mb-6 mx-2 rounded-md border-2 border-gray-200">
                  <div onClick={() => setExpandedCategory(expandedCategory === methodGroup.category ? null : methodGroup.category)} className="flex justify-between items-center py-3 cursor-pointer">
                    <h3 className="font-semibold">{methodGroup.category}</h3>
                    {expandedCategory === methodGroup.category ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
                  </div>

                  {expandedCategory === methodGroup.category && (
                    <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2 mt-3">
                      {methodGroup.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Desktop View */}
          <div className="hidden sm:block w-full sm:w-[30%] py-5 order-1 sm:order-2">
            <div className="bg-white py-5 rounded-lg border-2 border-gray-200 px-5 sticky top-20">
              <img src={productData.image} alt={productData.title} className="w-full h-40 object-cover rounded-md mb-3" />
              <p className="text-[20px] text-[#222325] font-bold">{productData.title}</p>
              <div className="flex gap-2">
                <p className="text-[19px] text-[#3ECF4C] font-semibold text-sm pt-4">{formatPrice(productData.basePrice * 1000).replace("Rp ", "Rp")}</p>
                <p className="text-[23px] text-[#3A354161] font-semibold text-sm pt-4"></p>
              </div>

              <div className="text-gray-800 space-y-6 text-sm">
                <div>
                  <h2 className="font-semibold text-base mb-3 pt-6">Kelas Ini Sudah Termasuk</h2>
                  <div className="grid grid-cols-2 gap-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      <FileText size={18} />
                      <span>Ujian Akhir</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video size={18} />
                      <span>49 Video</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileBadge size={18} />
                      <span>7 Dokumen</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeCheck size={18} />
                      <span>Sertifikat</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileSearch size={18} />
                      <span>Pretest</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-semibold text-base mb-3">Bahasa Pengantar</h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe size={18} />
                    <span>Bahasa Indonesia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PaymentType;
