import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { ADMIN } from "../../config/constants/constants";
import { PowerIcon } from "@heroicons/react/24/outline";
import { axiosInstanceAdmin } from "../../config/api/axiosinstance";
import { logout } from "../../redux/slices/AdminSlice";
import { useDispatch } from "react-redux";
import { Typography } from "@material-tailwind/react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const path = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axiosInstanceAdmin
      .get("/logout")
      .then(() => {
        dispatch(logout()); // Assuming you want to clear admin info on logout
        navigate(`${ADMIN.LOGIN}`);
      })
      .catch((error) => {
        console.log("here", error);
      });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed bg-white text-black w-64 p-4 h-full transition-transform border-r border-gray-300 ${
          isSidebarOpen ? "translate-x-0 z-999" : "-translate-x-64 pt-20"
        } sm:translate-x-0`}
      >
        {isSidebarOpen ? (
          <button className="ml-50" onClick={toggleSidebar}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        ) : (
          ""
        )}
        <nav>
          {isSidebarOpen&&(<Typography
     variant="h4"
            className="font-bold"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          
          >
            Event Castle
          </Typography>)}
          <ul>
            <Link to={ADMIN.DASHBOARD}>
              <li
                className={`${path.pathname == ADMIN.DASHBOARD ? "bg-gray-300 text-gray-800" : "text-gray-900"} flex  rounded-md p-2 cursor-pointer hover:bg-light-white  text-sm items-center gap-x-4 
              mt-9 bg-light-white
              `}
              >
                <svg
                  className="fill-black"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
                    fill=""
                  />
                  <path
                    d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
                    fill=""
                  />
                  <path
                    d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
                    fill=""
                  />
                  <path
                    d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
                    fill=""
                  />
                </svg>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Dashboard
                </span>
              </li>
            </Link>
            <Link to={ADMIN.USERS}>
              <li
                className={`${path.pathname == ADMIN.USERS ? "bg-gray-300 text-gray-800" : "text-gray-900"} flex  rounded-md p-2 cursor-pointer hover:bg-light-white  text-sm items-center gap-x-4 
              mt-2
              `}
              >
                <i className="fa-solid fa-users"></i>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Users
                </span>
              </li>
            </Link>
            <Link to={ADMIN.VENDORS}>
              <li
                className={`${path.pathname == ADMIN.VENDORS || path.pathname == ADMIN.VENDOR ? "bg-gray-300 text-gray-800" : "text-gray-900"} flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 
              mt-2
              `}
              >
                <i className="fa-solid fa-user-tie"></i>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Vendors
                </span>
              </li>
            </Link>
            <Link to={ADMIN.WALLET}>
              <li
                className={`${path.pathname == ADMIN.WALLET ? "bg-gray-300 text-gray-800" : "text-gray-900"} flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 
              mt-2
              `}
              >
                <i className="fa-solid fa-wallet"></i>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Wallet
                </span>
              </li>
            </Link>
            <Link to={ADMIN.INBOX}>
              <li
                className={`${path.pathname == ADMIN.INBOX ? "bg-gray-300 text-gray-800" : "text-gray-900"} flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 
              mt-2
              `}
              >
                <i className="fa-solid fa-bell"></i>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Notifications
                </span>
              </li>
            </Link>

            <button
              className={`text-gray-300 bg-pink-400 flex  rounded-md px-4 py-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 
              mt-6
              `}
            >
              <PowerIcon className="h-5 w-5 text-white" />
              <span
                className={`${!open && "hidden"} origin-left duration-200 text-white`}
                onClick={handleLogout}
              >
                Logout
              </span>
            </button>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="fixed w-full bg-black h-16 text-white p-4 flex justify-between items-center z-10">
          {/* Left-aligned logo/text */}

          <Typography
            className="font-bold"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            variant="h5"
          >
            Event Castle
          </Typography>

          {/* Right-aligned icon */}
          <button onClick={toggleSidebar} className="sm:hidden">
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 bg-white mt-16 sm:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
