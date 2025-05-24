import { useState } from "react";
import { courses } from "../../data.js";
import poster from "/thumbnail/poster.jpeg";
import Footer from "../Home/component/Footer.jsx";
import Card from "../Home/component/Card.jsx";

export default function Beranda() {
  const navbar = ["Semua Kelas", "Pemasaran", "Desain", "Pengembangan Diri", "Bisnis"];
  const [selectedCategory, setSelectedCategory] = useState("Semua Kelas");

  const filteredCourses = selectedCategory === "Semua Kelas" ? courses : courses.filter((course) => course.category === selectedCategory);

  return (
    <div className="background-color min-h-screen">
      {/* Banner */}
      <section className="relative top-[10px] sm:top-[70px] h-[420px] sm:h-[400px] flex items-center justify-center text-center text-white px-4 mt-[100px] sm:my-10 mx-10 sm:mx-64 rounded shadow-md ">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${poster})` }}>
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        <div className="relative z-10 max-w-3xl ">
          <h2 className="text-2xl sm:banner font-bold leading-tight">Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!</h2>
          <p className="mt-4 text-sm sm:text-base">
            Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.{" "}
          </p>
          <button className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow-md">Temukan Video Course untuk Dipelajari!</button>
        </div>
      </section>

      {/* Koleksi Video */}
      <section className=" py-8 sm:py-3 mx-10 sm:mx-64 my-10 sm:my-20">
        <h3 className="text-xl font-semibold mb-4">Koleksi Video Pembelajaran Unggulan</h3>

        {/* Kategori */}

        <div className="snap-x snap-mandatory overflow-x-scroll">
          <div className="flex gap-5 sm:gap-6 mb-2 text-sm sm:snap-start scroll-ms-6">
            {navbar.map((item) => (
              <span key={item} onClick={() => setSelectedCategory(item)} className={`px-4 py-1 rounded-full cursor-pointer hover:text-orange-500 ${selectedCategory === item ? "bg-orange-100 text-orange-600 font-semibold" : ""}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
        {/* Video Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <Card key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative mt-10 bg-black text-white py-12 px-4 text-center my-10 mx-10 sm:mx-64 rounded-xl sm:rounded-xl">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${poster})` }}>
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-sm font-light mb-2">NEWSLETTER</p>
          <h3 className="text-2xl font-semibold mb-2">Mau Belajar Lebih Banyak?</h3>
          <p className="text-sm max-w-md mx-auto mb-4">Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik hariesok.id</p>
          <form className="flex flex-col sm:flex-row justify-center gap-2 max-w-md mx-auto">
            <input type="email" placeholder="Masukkan email kamu" className="w-full px-4 py-2 rounded text-black" />
            <button type="submit" className="bg-yellow-500 hover:bg-orange-600 px-6 py-2 rounded text-white">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
