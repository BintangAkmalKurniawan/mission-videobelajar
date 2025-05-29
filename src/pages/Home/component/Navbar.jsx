import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";

function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const Navigate = useNavigate;

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const toggleSidebar2 = () => {
    setShowSidebar(!showSidebar);
  };

  const sideActive = showSidebar ? "flex" : "block";
  const menuActive = showSidebar ? "block sm:inline " : "hidden";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 sm:z-50 bg-white shadow-sm px-4 sm:px-20 flex justify-between sm:items-center ${sideActive} transition duration-300 h-[60px]`}>
        <img className="h-[50px] w-[200px] curcor-pointer" src="./videobelajar.png" onClick={() => Navigate("/home")} />
        <div className="flex sm:items-center pt-4 sm:pt-0 space-x-4 overflow-hidden sm:overflow-visible">
          <button>
            <span className="text-sm text-gray-600 hidden sm:inline" onClick={toggleSidebar2}>
              Kategori
            </span>
          </button>
          <img src="/avatar/satu.png" alt="User" className="w-8 h-8 rounded-full hidden sm:inline" />
          <svg onClick={toggleSidebar} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 sm:hidden ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
          <ul
            className={` ${menuActive} fixed top-[60px] flex-col top-30 left-[47%] sm:left-[90%] right-0 w-full sm:w-56 bg-white border border-gray-200 rounded divide-y divide-gray-100 shadow transform -translate-x-1/2 space-y-1 text-sm text-gray-600 flex flex-col p-4 gap-4 z-50 sm:z-50`}
          >
            <li>
              <NavLink to={"/kategori"} className="pt-4 sm:pt-0 block ">
                Kategori
              </NavLink>
            </li>
            <li>
              <button href="#" className="pt-4 ">
                Profile
              </button>
            </li>
            <li>
              <button href="#" className="pt-4 ">
                Kalas Saya
              </button>
            </li>
            <li>
              <button href="#" className="pt-4 ">
                Pesanan Saya
              </button>
            </li>
            <li>
              <button href="#" className="pt-4 text-red-500">
                Keluar<i className="ml-4 ri-logout-box-r-line"></i>
              </button>
            </li>
          </ul>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Navbar;
