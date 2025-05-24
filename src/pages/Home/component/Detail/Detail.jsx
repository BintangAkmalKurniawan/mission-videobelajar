import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaPlayCircle, FaClock } from "react-icons/fa";
import { FileText, Video, FileBadge, BadgeCheck, FileSearch, Globe } from "lucide-react";
import { courses } from "../../../../data.js";
import poster from "/thumbnail/poster.jpeg";
import Footer from "../Footer.jsx";
import Card from "../Card.jsx";

const Detail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.video) return <div className="p-4">Data tidak tersedia</div>;

  const { title, rating, category, instructor, video, price } = state;
  const [name, role] = instructor.split("\n");

  const filteredCourses = courses.filter((course) => course.category);

  const [coursesVideo, setCourses] = useState(video);

  const toggleExpand = (index) => {
    setCourses((prev) => prev.map((item, i) => (i === index ? { ...item, expanded: !item.expanded } : item)));
  };

  const hanldeOrder = () => {
    navigate("/order", {
      state: {
        title,
        instructor,
        price,
        rating,
        image: poster,
        category,
        video: coursesVideo,
      },
    });
  };
  return (
    <>
      <div className="flex flex-cols-3 gap-2">
        <p className="relative top-[10px] sm:top-[100px] ml-10 sm:ml-64 text-gray-500 cursor-pointer">Beranda /</p>
        <p className="relative top-[10px] sm:top-[100px] text-gray-500">{category} /</p>
        <p className="relative top-[10px] sm:top-[100px] text-black-500">{title} </p>
      </div>
      {/* Banner */}
      <section className="relative top-[10px] sm:top-[100px] h-[420px] sm:h-[400px] flex items-center text-left text-white px-10 sm:px-20 mt-[100px] sm:my-10 mx-10 sm:mx-64 rounded shadow-md ">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${poster})` }}>
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        <div className="relative z-10 max-w-3xl ">
          <h2 className="text-2xl sm:banner font-bold leading-tight">{title}</h2>
          <p className="mt-4 text-sm sm:text-base">
            Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.{" "}
          </p>
          <p className="mt-4 text-sm sm:text-base">{rating}</p>
        </div>
      </section>

      {/* Deskripsi */}
      <section className="relative mt-[80px] sm:py-12 mx-10 sm:mx-64">
        {/* Mobile: Bagian harga di atas (hanya tampil di mobile) */}
        <div className="sm:hidden bg-white py-5 rounded-lg border-2 border-gray-200 mb-6">
          <p className="text-[20px] text-[#222325] font-bold px-8">{title}</p>
          <div className="flex gap-2">
            <p className="text-[19px] text-[#3ECF4C] font-semibold text-sm pl-8 pt-4">{`Rp ${price}K`}</p>
            <p className="text-[20px] text-[#3A354161] font-semibold text-sm pt-4">-</p>
          </div>
          <p className="text-[13px] text-[#0980E2] font-semibold text-sm pl-8 pt-4">info diskon</p>
          <button className="bg-[#3ECF4C] text-center text-white py-2 mx-8 mt-4 px-[80px] sm:px-[75px] rounded-lg" onClick={hanldeOrder}>
            Beli Sekarang
          </button>

          <div className="text-gray-800 space-y-6 text-sm">
            {/* Kelas Ini Sudah Termasuk */}
            <div>
              <h2 className="font-semibold text-base mb-3 pl-8 pt-6">Kelas Ini Sudah Termasuk</h2>
              <div className="grid grid-cols-2 gap-3 text-gray-600 pl-8">
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

            {/* Bahasa Pengantar */}
            <div>
              <h2 className="font-semibold text-base mb-3 pl-8">Bahasa Pengantar</h2>
              <div className="flex items-center gap-2 text-gray-600 pl-8">
                <Globe size={18} />
                <span>Bahasa Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:flex sm:gap-10">
          <div className="w-[100%] sm:w-[70%] py-5 order-2 sm:order-1">
            <div className="bg-white py-5 rounded-lg border-2 border-gray-200">
              <p className="text-[20px] text-[#222325] font-bold px-8">Deskripsi</p>
              <p className="px-8 mt-4 text-[#333333AD] text-sm sm:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque exercitationem aspernatur magni beatae quod rerum non eum nemo a maxime sed facilis saepe eveniet optio debitis, nulla veritatis, reprehenderit commodi.
              </p>
            </div>

            {/* Bagian tutor profesional */}
            <div className="bg-white mt-10">
              <div className="bg-white py-5 rounded-lg border-2 border-gray-200">
                <p className="text-[20px] text-[#222325] font-bold px-8">Belajar bersama Tutor Profesional</p>
                <div className="px-8 mt-4 text-[#333333AD] text-sm sm:text-base sm:flex gap-5">
                  {/* Tutor 1 */}
                  <div className="flex items-center gap-3 bg-white w-[100%] p-3 border-2 border-gray-200 rounded-lg">
                    <div className="items-center gap-2">
                      <div className="flex gap-1">
                        <img src="/avatar/satu.png" alt="avatar" className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="text-xs font-medium">{name}</p>
                          <p className="text-xs text-gray-400">{role}</p>
                        </div>
                      </div>
                      <p className="mt-2">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est tempora explicabo quam? Enim repellendus beatae recusandae sint neque expedita aut ad laudantium eos reiciendis! Molestiae culpa similique aut quasi
                        laborum.
                      </p>
                    </div>
                  </div>
                  {/* Tutor 2 */}
                  <div className="flex items-center gap-3 bg-white w-[100%] p-3 mt-5 sm:mt-0 border-2 border-gray-200 rounded-lg">
                    <div className="items-center mt-1 gap-2">
                      <div className="flex gap-1">
                        <img src="/avatar/satu.png" alt="avatar" className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="text-xs font-medium">{name}</p>
                          <p className="text-xs text-gray-400">{role}</p>
                        </div>
                      </div>
                      <p className="mt-2">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est tempora explicabo quam? Enim repellendus beatae recusandae sint neque expedita aut ad laudantium eos reiciendis! Molestiae culpa similique aut quasi
                        laborum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian materi pembelajaran */}
            <div className="p-4 bg-white border-2 border-gray-200 rounded-md shadow mt-10">
              <h2 className="text-lg font-semibold mb-4">Kamu akan Mempelajari</h2>
              {coursesVideo.map((course, index) => (
                <div key={index} className="mb-2">
                  <div onClick={() => toggleExpand(index)} className="cursor-pointer text-[#3ECF4C] font-semibold flex justify-between items-center bg-white px-3 py-2 rounded hover:bg-green-50">
                    <span>{course.title}</span>
                    {course.expanded ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                  {course.expanded && course.items && course.items.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {course.items.map((item, i) => (
                        <div key={i} className="bg-white p-3 rounded border text-sm flex justify-between items-center">
                          <span>{item.title}</span>
                          <div className="flex gap-2 items-center text-gray-500">
                            <FaPlayCircle />
                            <span>{item.type}</span>
                            <FaClock />
                            <span>{item.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden sm:block w-[100%] sm:w-[30%] py-5 order-1 sm:order-2">
            <div className="bg-white py-5 rounded-lg border-2 border-gray-200">
              <p className="text-[20px] text-[#222325] font-bold px-8">{title}</p>
              <div className="flex gap-2">
                <p className="text-[19px] text-[#3ECF4C] font-semibold text-sm pl-8 pt-4">{`Rp ${price}K`}</p>
                <p className="text-[23px] text-[#3A354161] font-semibold text-sm pt-4">-</p>
              </div>
              <p className="text-[13px] text-[#0980E2] font-semibold text-sm pl-8 pt-4">info diskon</p>
              <button className="bg-[#3ECF4C] text-center text-white py-2 mx-8 mt-4 px-[75px] rounded-lg" onClick={hanldeOrder}>
                Beli Sekarang
              </button>

              <div className="text-gray-800 space-y-6 text-sm">
                {/* Kelas Ini Sudah Termasuk */}
                <div>
                  <h2 className="font-semibold text-base mb-3 pl-8 pt-6">Kelas Ini Sudah Termasuk</h2>
                  <div className="grid grid-cols-2 gap-3 text-gray-600 pl-8">
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

                {/* Bahasa Pengantar */}
                <div>
                  <h2 className="font-semibold text-base mb-3 pl-8">Bahasa Pengantar</h2>
                  <div className="flex items-center gap-2 text-gray-600 pl-8">
                    <Globe size={18} />
                    <span>Bahasa Indonesia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" py-8 sm:py-3 mx-10 sm:mx-64 my-10 sm:my-0">
        <h3 className="text-xl font-semibold mb-4">Koleksi Video Pembelajaran Unggulan</h3>
        {/* Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <Card key={course.id} course={course} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Detail;
