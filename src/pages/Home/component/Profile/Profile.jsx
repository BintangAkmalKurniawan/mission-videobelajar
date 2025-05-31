import { useState, useEffect } from "react";

export default function Profile() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [kodeNegara, setKodeNegara] = useState("+62");
  const [noHp, setNoHp] = useState("");

  // Ambil data dari localStorage saat pertama kali render
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("profileData"));
    if (storedData) {
      setNama(storedData.nama || "");
      setEmail(storedData.email || "");
      setKodeNegara(storedData.kodeNegara || "+62");
      setNoHp(storedData.noHp?.replace(storedData.kodeNegara || "+62", "") || "");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      nama,
      email,
      kodeNegara,
      noHp: `${kodeNegara}${noHp}`,
    };

    // Simpan ke localStorage
    localStorage.setItem("profileData", JSON.stringify(profileData));
    alert("✅ Data berhasil disimpan!");
  };

  return (
    <div className="bg-white w-full p-4">
      {/* Profil Header */}
      <div className="flex">
        <img
          className="w-[92px] h-[92px] object-cover rounded-md"
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="profile"
        />
        <div>
          <p className="text-[17px] font-bold ml-4 my-2">{nama || "Nama belum diisi"}</p>
          <p className="text-1xl text-black ml-4">{email || "Email belum diisi"}</p>
          <p className="text-[15px] text-[#F64920] ml-4 font-bold cursor-pointer">Ganti Foto Profile</p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#3A35411F] mt-7"></div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="items-center p-6">
        <div className="flex gap-10">
          {/* Nama Lengkap */}
          <div className="flex flex-col">
            <label className="text-green-500 text-sm font-semibold mb-1">Nama Lengkap</label>
            <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} className="border border-green-400 rounded px-3 py-1 outline-none" placeholder="Nama Lengkap" />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-semibold mb-1">E-Mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded px-3 py-1 outline-none" placeholder="Alamat Email" />
          </div>

          {/* Kode Negara */}
          <div className="flex flex-col w-[80px]">
            <label className="invisible mb-1">Kode</label>
            <select value={kodeNegara} onChange={(e) => setKodeNegara(e.target.value)} className="border rounded px-2 py-1 outline-none">
              <option value="+62">+62</option>
              <option value="+1">+1</option>
              <option value="+91">+91</option>
            </select>
          </div>

          {/* No HP */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm font-semibold mb-1">No. Hp</label>
            <input type="text" value={noHp} onChange={(e) => setNoHp(e.target.value)} className="border rounded px-3 py-1 outline-none" placeholder="81234567890" />
          </div>
        </div>

        {/* Tombol Simpan */}
        <button type="submit" className="bg-green-500 text-white font-semibold px-5 py-2 rounded hover:bg-green-600 ml-[900px] mt-5">
          Simpan
        </button>
      </form>
    </div>
  );
}
