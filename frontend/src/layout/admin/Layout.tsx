import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { ADMIN } from '../../config/constants/constants';
import { PowerIcon } from "@heroicons/react/24/outline";
import { axiosInstanceAdmin } from '../../config/api/axiosinstance';
import { logout } from '../../redux/slices/AdminSlice';
import { useDispatch } from 'react-redux';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const path=useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axiosInstanceAdmin
      .get("/logout")
      .then(() => {
        dispatch(logout()); // Assuming you want to clear admin info on logout
        navigate(ADMIN.LOGIN);
      })
      .catch((error) => {
        console.log("here", error);
      });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed bg-gray-900 text-white w-64 p-4 h-full transition-transform ${
          isSidebarOpen ? 'translate-x-0 z-999' : '-translate-x-64 pt-20'
        } sm:translate-x-0`}
      >
        {isSidebarOpen?<button className='ml-50' onClick={toggleSidebar}><i className="fa-solid fa-arrow-left"></i></button>:""}
        <nav>
          <ul>
          <Link to={ADMIN.DASHBOARD}>
            <li
              className={`${path.pathname==ADMIN.DASHBOARD?"bg-gray-400 text-gray-800":"text-gray-300"} flex  rounded-md p-2 cursor-pointer hover:bg-light-white  text-sm items-center gap-x-4 
              mt-9 bg-light-white
              `}
            >
              <img src={`/public/imgs/Chart_fill.png`}  />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Dashboard
              </span>
            </li>
          </Link>
          <Link to={ADMIN.USERS}>
            <li
              className={`${path.pathname==ADMIN.USERS?"bg-gray-400 text-gray-800":"text-gray-300"} flex  rounded-md p-2 cursor-pointer hover:bg-light-white  text-sm items-center gap-x-4 
              mt-2
              `}
            >
              <i className="fa-solid fa-users"></i>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Users
              </span>
            </li>
          </Link>
          <Link to={ADMIN.VENDORS}>
            <li
              className={`${path.pathname==ADMIN.VENDORS || path.pathname==ADMIN.VENDOR?"bg-gray-400 text-gray-800":"text-gray-300"} flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 
              mt-2
              `}
            >
              <i className="fa-solid fa-user-tie"></i>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Vendors
              </span>
            </li>
          </Link>
          <Link to={ADMIN.WALLET}>
            <li
              className={`${path.pathname==ADMIN.WALLET?"bg-gray-400 text-gray-800":"text-gray-300"} flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 
              mt-2
              `}
            >
              <i className="fa-solid fa-wallet"></i>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Wallet
              </span>
            </li>
          </Link>
          <Link to={ADMIN.INBOX}>
            <li
              className={`${path.pathname==ADMIN.INBOX?"bg-gray-400 text-gray-800":"text-gray-300"} flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 
              mt-2
              `}
            >
              <i className="fa-solid fa-bell"></i>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Notifications
              </span>
            </li>
          </Link>
       
            <li
              className={`text-gray-300 flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 
              mt-6
              `}
            >
              <PowerIcon className="h-5 w-5" />
              <span
                className={`${!open && "hidden"} origin-left duration-200`}
                onClick={handleLogout}
              >
                Logout
              </span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="fixed w-full bg-gray-900 text-white p-4 flex justify-between items-center z-10">
          <button onClick={toggleSidebar} className="sm:hidden">
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className="text-xl text-end">Event Castle</h1>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 bg-gray-100 mt-16 sm:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
