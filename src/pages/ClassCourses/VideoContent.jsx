import { useLocation } from "react-router";

export default function VideoContent() {
  // const { classId } = useParams();
  const { state } = useLocation();
  const classData = state?.classData;

  if (!classData) {
    return (
      <div className="pt-[60px] w-full min-h-screen bg-white flex items-center justify-center">
        <p>Kelas tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="pt-[60px] w-full min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row gap-4 px-4 lg:px-12 py-6">
        {/* Left Side - Video & Description */}
        <div className="lg:w-[70%] w-full space-y-4">
          <div className="aspect-video bg-gray-200 flex items-center justify-center rounded-xl">
            <button className="bg-white p-4 rounded-full shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12l-6.75 4.5v-9l6.75 4.5z" />
              </svg>
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{classData.title}</h2>
            <p className="text-sm text-gray-500">{classData.description || "Pelajari dan praktikkan skill teknis dalam berbagai industri"}</p>
            <div className="flex items-center gap-2 mt-2">
              <img src={classData.instructorImage || "https://api.dicebear.com/7.x/miniavs/svg?seed=Jenna"} className="w-8 h-8 rounded-full" alt={classData.instructorName} />
              <div>
                <p className="text-sm font-medium">{classData.instructorName}</p>
                <p className="text-xs text-gray-400">{classData.instructorJob}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(Math.floor(classData.rating || 3.5))].map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">
                  ★
                </span>
              ))}
              {(classData.rating || 3.5) % 1 > 0 && <span className="text-yellow-400 text-lg">☆</span>}
              <span className="text-gray-400 text-sm">
                {classData.rating || 3.5} ({classData.reviewCount || 86})
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Modul List */}
        <div className="lg:w-[30%] w-full border rounded-lg p-4 bg-gray-50">
          <h3 className="text-md font-semibold mb-2">Daftar Modul</h3>
          <div className="space-y-3">
            {classData.modules?.map((module, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-3 border rounded-lg">
                <div className={`${module.completed ? "bg-green-100" : "bg-gray-100"} p-2 rounded-full`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${module.completed ? "text-green-600" : "text-gray-400"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={module.type === "quiz" ? "M16.5 9.75L9 16.5 4.5 12" : "M15.75 12l-6.75 4.5v-9l6.75 4.5z"} />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">{module.title}</p>
                  <p className="text-xs text-gray-400">{module.type === "quiz" ? `${module.questionCount} Pertanyaan` : `${module.duration} Menit`}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full bg-yellow-400 py-2 rounded-lg font-semibold text-white">Beri Review & Rating</button>
        </div>
      </div>
    </div>
  );
}
