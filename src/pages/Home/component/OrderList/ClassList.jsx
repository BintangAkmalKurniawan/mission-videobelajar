import { useState, useEffect } from "react";
import axios from "axios";

const statusColor = {
  completed: "text-green-600 bg-green-100",
  ongoing: "text-yellow-600 bg-yellow-100",
};

const ClassList = () => {
  const URL = "https://68385dcb2c55e01d184d0632.mockapi.io/api/videobelajar/classUsers";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navbar = ["Semua Kelas", "ongoing", "completed"];
  const [selectedCategory, setSelectedCategory] = useState("Semua Kelas");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        // Pastikan response.data adalah array
        if (!Array.isArray(response.data)) {
          throw new Error("Format data tidak valid");
        }

        const transformedData = response.data.map((item) => ({
          id: item.id,
          invoice: item.invoice || `HEL/VI/${Math.floor(1000 + Math.random() * 9000)}`,
          time: item.time instanceof Date ? item.time : new Date(item.time || item.createdAt),
          status: item.status || "ongoing",
          title: item.courseTitle || "Kelas Belum Diberi Judul",
          price: item.price || 0,
          image: item.image || "/avatar/satu.png",
          total_payment: item.totalPayment || item.price || 0,
        }));
        setData(transformedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data
  const filteredData = data.filter((item) => {
    const matchesCategory = selectedCategory === "Semua Kelas" || item.status === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusDisplay = (status) => {
    switch (status) {
      case "ongoing":
        return "Sedang Berjalan";
      case "completed":
        return "Selesai";
      default:
        return status;
    }
  };

  if (loading) return <div className="text-center py-10">Memuat data...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white sm:w-[100%] w-full h-full p-5 border-2 border-gray-200 rounded-lg">
      {/* Search & Filter UI */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-4">
        <div className="flex sm:flex-nowrap gap-2 sm:gap-4 overflow-x-scroll">
          {navbar.map((item) => (
            <span
              key={item}
              onClick={() => {
                setSelectedCategory(item);
                setCurrentPage(1);
              }}
              className={`px-5 py-1 rounded-full cursor-pointer hover:text-[#F64920] ${selectedCategory === item ? "text-[#F64920] font-semibold" : ""}`}
            >
              {item === "ongoing" ? "Sedang Berjalan" : item === "completed" ? "Selesai" : item}
            </span>
          ))}
        </div>
        <div className="relative sm:ml-auto w-full sm:w-auto">
          <input
            type="text"
            placeholder="Cari"
            className="w-full sm:w-auto p-2 border-2 border-gray-200 rounded-lg pl-10"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
        </div>
      </div>

      {/* Daftar Kelas */}
      {currentItems.length > 0 ? (
        currentItems.map((order) => (
          <div key={order.id} className="mt-4 bg-white border-2 border-gray-200 rounded-lg text-[15px] text-[#333333AD]">
            <div className="flex flex-col sm:flex-row w-full bg-[#3A35411F] p-4 gap-2 sm:items-center">
              <p>
                No: Invoice <span className="font-semibold text-blue-600">{order.invoice}</span>
              </p>
              <p className="sm:ml-[50px] text-[17px]">
                Waktu:{" "}
                <span className="font-semibold text-green-600">
                  {order.time.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </p>
              <p className={`sm:ml-auto px-3 py-1 rounded-lg w-fit ${statusColor[order.status]}`}>{getStatusDisplay(order.status)}</p>
            </div>
            <div className="flex flex-col sm:flex-row w-full bg-white p-4 border-b-2 border-[#3A35411F] items-center sm:items-center gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img src={order.image} alt={order.title} className="w-[50px] h-[50px] rounded-[30%] object-cover" />
                <p className="text-black text-[17px]">{order.title}</p>
              </div>
              <div className="sm:ml-auto text-right w-full sm:w-auto">
                <p className="text-[#333333AD] text-[17px]">Harga</p>
                <p className="text-black text-[17px]">Rp. {order.price.toLocaleString("id-ID")}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full bg-[#3A35411F] p-4 items-center sm:justify-between">
              <p>Total Pembayaran</p>
              <p className="text-[#3ECF4C] text-[18px] px-3 py-1 rounded-lg">Rp. {order.total_payment.toLocaleString("id-ID")}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-10 text-gray-500">Tidak ada data yang ditemukan</div>
      )}

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex justify-center mt-10 mb-5 overflow-x-auto">
          <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"}`}
            >
              <span className="sr-only">Previous</span>
              <i className="ri-arrow-left-s-line text-xl"></i>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page ? "z-10 bg-[#FFBD3A] border-[#FFBD3A] text-white" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"}`}
            >
              <span className="sr-only">Next</span>
              <i className="ri-arrow-right-s-line text-xl"></i>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ClassList;
