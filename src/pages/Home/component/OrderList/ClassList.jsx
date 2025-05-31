import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchClasses, deleteClass } from "../../../../redux/classesSlice.js";

const statusColor = {
  completed: "text-green-600 bg-green-100",
  ongoing: "text-yellow-600 bg-yellow-100",
};

const ClassList = () => {
  const dispatch = useDispatch();
  const { items: data, status, error } = useSelector((state) => state.classes);

  const navbar = ["Semua Kelas", "ongoing", "completed"];
  const [selectedCategory, setSelectedCategory] = useState("Semua Kelas");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

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

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kelas ini?")) {
      dispatch(deleteClass(id));
    }
  };

  if (status === "loading") return <div className="text-center py-10">Memuat data...</div>;
  if (status === "failed") return <div className="text-center py-10 text-red-500">Error: {error}</div>;

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
      // ... (import dan bagian awal komponen tetap sama)
      {currentItems.length > 0 ? (
        currentItems.map((classItem) => {
          const isCompleted = classItem.status === "completed";
          // Progress sudah dihitung di Redux slice
          const progress = classItem.progress;

          return (
            <div key={classItem.id} className="mt-4 bg-white border-2 border-gray-200 rounded-lg mb-4">
              {/* Header dengan info modul dan status */}
              <div className="flex justify-between items-center bg-[#E2FCD933] px-3 py-2 border-b">
                <p className="text-sm font-bold">
                  {classItem.completedModules} / {classItem.totalModules} Modul Terselesaikan
                </p>
                <span className={`text-sm px-2 py-1 rounded-full font-semibold ${isCompleted ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>{isCompleted ? "Selesai" : "Sedang Berjalan"}</span>
              </div>

              {/* Konten utama kelas */}
              <div className="flex gap-4 px-5 py-4">
                <img src={classItem.image} alt={classItem.title} className="w-24 h-24 rounded" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mt-1">{classItem.title}</h2>
                  <p className="text-sm text-gray-500">Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik</p>
                  <div className="flex items-center mt-2 text-sm text-gray-700 gap-2">
                    <span className="font-semibold">{classItem.instructorName}</span>
                    <span>• {classItem.instructorJob}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1 gap-4">
                    <span>
                      <i className="ri-book-line text-[20px]"></i> {classItem.totalModules} Modul
                    </span>
                    <span>
                      <i className="ri-time-line text-[20px]"></i> {classItem.duration} Menit
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress bar dan aksi */}
              <div className="mt-2 flex items-center px-10 bg-[#E2FCD933] py-3 border-t justify-between">
                <div className="flex items-center">
                  <p className="text-sm">
                    Progres Kelas: <span className="font-semibold">{progress}%</span>
                  </p>
                  <div className="h-1 w-[210px] bg-red-200 rounded-full mx-4">
                    <div className="h-1 bg-red-500 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {isCompleted ? (
                    <>
                      <button className="border border-green-500 text-green-500 px-3 py-2 rounded-md text-sm font-medium">Unduh Sertifikat</button>
                      <button className="bg-green-500 text-white px-3 py-2 rounded-md text-sm font-medium">Lihat Detail Kelas</button>
                    </>
                  ) : (
                    <button className="bg-green-500 text-white px-3 py-2 rounded-md text-sm font-medium">Lanjutkan Pembelajaran</button>
                  )}
                  <button onClick={() => handleDelete(classItem.id)} className="ml-2 text-red-500 hover:text-red-700">
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-10 text-gray-500">Tidak ada data yang ditemukan</div>
      )}
      // ... (bagian lainnya tetap sama)
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
