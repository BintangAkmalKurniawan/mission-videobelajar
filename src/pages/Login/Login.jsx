import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router";

const Index = () => {
  const navigate = useNavigate();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    localStorage.setItem("videobelajar-user", JSON.stringify(userData));
    alert("Registrasi berhasil! Silakan login.");
    setIsLoginPage(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("videobelajar-user"));
    if (savedUser && savedUser.email === formData.email && savedUser.password === formData.password) {
      alert("Login berhasil!");
      navigate("/home");
    } else {
      alert("Email atau password salah.");
    }
  };

  return (
    <div className="bg-[#FFFCEE] min-h-screen">
      <header className="bg-white shadow-md py-1 px-6">
        <div className="text-xl font-bold text-orange-500">
          <img src="./videobelajar.png" />
        </div>
      </header>

      <main className="flex justify-center items-center py-12 px-4 mt-10">
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
          <h2 className="text-center text-2xl font-semibold mb-2">{isLoginPage ? "Masuk Ke Akun" : "Pendaftaran Akun"}</h2>
          <p className="text-center text-sm text-gray-500 mb-6">{isLoginPage ? "Yuk, lanjutin belajarmu di videobelajar" : "Yuk, daftarkan akunmu sekarang juga!"}</p>

          <form className="space-y-4" onSubmit={isLoginPage ? handleLogin : handleRegister}>
            {!isLoginPage && (
              <>
                <div>
                  <label className="block text-sm mb-1">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" required />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm mb-1">
                    No. Hp <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput country={"id"} value={formData.phone} onChange={(phone) => setFormData({ ...formData, phone })} inputClass="!w-full !border !border-gray-300 !rounded-md !px-4 !py-2" inputStyle={{ width: "100%" }} />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm mb-1">
                E-Mail <span className="text-red-500">*</span>
              </label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" required />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Kata Sandi <span className="text-red-500">*</span>
              </label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" required />
            </div>

            {!isLoginPage && (
              <div>
                <label className="block text-sm mb-1">
                  Konfirmasi Kata Sandi <span className="text-red-500">*</span>
                </label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2" required />
              </div>
            )}

            <div className="text-right mt-1">
              <a href="#" className="text-xs text-gray-500 hover:underline">
                Lupa Password?
              </a>
            </div>

            <button type="submit" className="w-full bg-[#3DDB5A] text-white py-2 rounded-md hover:bg-[#33c14e] font-semibold">
              {isLoginPage ? "Masuk" : "Daftar"}
            </button>

            <button type="button" onClick={() => setIsLoginPage(!isLoginPage)} className="w-full bg-[#ECFCE5] text-[#3DDB5A] py-2 rounded-md font-semibold hover:bg-[#daf5d4]">
              {isLoginPage ? "Daftar" : "Masuk"}
            </button>

            <div className="flex items-center justify-center">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-sm text-gray-400">atau</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <button type="button" className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 text-sm hover:bg-gray-100">
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5 mr-2" alt="Google" />
              Masuk dengan Google
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Index;
