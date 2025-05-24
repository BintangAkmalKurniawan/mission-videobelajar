import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FileText, Video, FileBadge, BadgeCheck, FileSearch, Globe } from "lucide-react";
import { paymentMethods, paymentLogos } from "../../../dataOrder.js";

function ChangePaymentMethod() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) return <div className="p-4">Data tidak tersedia</div>;

  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(state.paymentMethod || null);

  // Price calculations
  const getActualPrice = (basePrice) => basePrice * 1000;
  const hargaProduk = getActualPrice(state.productData.basePrice);
  const biayaAdmin = state.adminFee || 7000;
  const total = hargaProduk + biayaAdmin;

  const formatPrice = (basePrice, shortFormat = false) => {
    const actualPrice = getActualPrice(basePrice);
    if (shortFormat) {
      if (actualPrice >= 1000000) return `Rp ${(actualPrice / 1000000).toFixed(1)}M`;
      if (actualPrice >= 1000) return `Rp ${(actualPrice / 1000).toFixed(0)}K`;
      return `Rp ${actualPrice}`;
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(actualPrice)
      .replace("Rp", "Rp ");
  };

  const handleConfirmPayment = () => {
    navigate("/payment", {
      state: {
        ...state,
        paymentMethod: selectedMethod,
      },
    });
  };

  return (
    <section className="relative mt-[60px] sm:py-12 mx-10 sm:mx-64">
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

      <div className="sm:flex sm:gap-10 flex-col-reverse sm:flex-row">
        {/* Order Summary - Now at the top */}
        <div className="w-full sm:w-[70%] py-5 order-2 sm:order-1">
          <div className="bg-white py-5 rounded-lg border-2 border-gray-200 mb-6">
            <h2 className="text-lg font-semibold px-8 mb-4">Ringkasan Pesanan</h2>

            <div className="px-8 space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-700">{state.productData.title}</p>
                <p className="font-semibold text-gray-400">{formatPrice(state.productData.basePrice)}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-600">Biaya Admin</p>
                <p className="text-gray-600">{formatPrice(biayaAdmin / 1000)}</p>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between items-center">
                <p className="font-semibold text-lg">Total Pembayaran</p>
                <p className="text-green-600 font-bold text-lg">{formatPrice(total / 1000)}</p>
              </div>
            </div>

            <div className="px-8 mt-6">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition disabled:bg-gray-400" onClick={handleConfirmPayment} disabled={!selectedMethod}>
                Konfirmasi Pembayaran
              </button>
            </div>
          </div>

          {/* Payment Methods - Now at the bottom */}
          <div className="bg-white py-5 rounded-lg border-2 border-gray-200">
            <h2 className="text-xl font-bold px-8 mb-6">Pilih Metode Pembayaran Lain</h2>

            {paymentMethods.map((methodGroup) => (
              <div key={methodGroup.category} className="px-8 mb-6 mx-2 rounded-md border-2 border-gray-200">
                <div onClick={() => setExpandedCategory(expandedCategory === methodGroup.category ? null : methodGroup.category)} className="flex justify-between items-center py-3 cursor-pointer">
                  <h3 className="font-semibold">{methodGroup.category}</h3>
                  {expandedCategory === methodGroup.category ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
                </div>

                {expandedCategory === methodGroup.category && (
                  <div className="grid gap-3 mt-3">
                    {methodGroup.methods.map((method) => (
                      <div
                        key={method}
                        onClick={() => setSelectedMethod(method)}
                        className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${selectedMethod === method ? "border-green-500 bg-green-50" : "border-gray-200 hover:bg-gray-50"}`}
                      >
                        <input type="radio" checked={selectedMethod === method} readOnly className="h-4 w-4 text-green-500" />
                        <div className="flex items-center gap-2 overflow-hidden">
                          <img
                            src={paymentLogos[method] ? `/payment-logos/${paymentLogos[method]}` : "/payment-logos/default.png"}
                            alt={method}
                            className="w-16 h-6 object-contain"
                            onError={(e) => {
                              e.target.src = "/payment-logos/default.png";
                            }}
                          />
                          <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">{method}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar - Desktop View */}
        <div className="hidden sm:block w-full sm:w-[30%] py-5 order-1 sm:order-2">
          <div className="bg-white py-5 rounded-lg border-2 border-gray-200 px-5 sticky top-20">
            <img src={state.productData.image} alt={state.productData.title} className="w-full h-40 object-cover rounded-md mb-3" />
            <p className="text-[20px] text-[#222325] font-bold">{state.productData.title}</p>
            <div className="flex gap-2">
              <p className="text-[24px] text-[#3ECF4C] font-semibold text-sm pt-4">{formatPrice(state.productData.basePrice, true)}</p>
              <p className="text-[23px] text-[#3A354161] font-semibold text-sm pt-4">Rp 400K</p>
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
  );
}

export default ChangePaymentMethod;
