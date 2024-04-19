import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstanceAdmin } from "../../api/axiosinstance";
import { logout } from "../../redux/slices/AdminSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
// import { SetStateAction } from "react";
import { PowerIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const handleOpen = (value: SetStateAction<boolean> | "") => {
  //   setOpen(open === value ? 0 : value);
  // };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axiosInstanceAdmin
      .get("/logout")
      .then(() => {
        dispatch(logout()); // Assuming you want to clear admin info on logout
        navigate("/admin/login");
      })
      .catch((error) => {
        console.log("here", error);
      });
  };

  // Function to handle window resize and adjust sidebar accordingly
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setOpen(false); // Set sidebar to closed when screen size hits medium or below
    } else {
      setOpen(true); // Set sidebar to open for larger screens
    }
  };

  // Add event listener for window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [open, setOpen] = useState(true);

  return (
    <div className="sidebar fixed">
      <div className={`sidebar ${
          open ? "open" : "closed"
        } bg-blue-900 h-screen p-5 pt-8 relative duration-30 top-0 left-0 w-full md:w-auto md:static md:left-auto md:top-auto md:translate-x-0 transition-all duration-300 ease-in-out transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: open ? "250px" : "80px" }}>
        <img
          src="/public/imgs/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          {/* <img
            src="/public/imgs/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          /> */}
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Event Castle
          </h1>
        </div>
        <ul className="pt-6">
          <Link to="/admin/dashboard">
            <li
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              mt-9 bg-light-white
              `}
            >
              <img src={`/public/imgs/Chart_fill.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Dashboard
              </span>
            </li>
          </Link>
          <Link to="/admin/users">
            <li
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              mt-2
              `}
            >
              <i className="fa-solid fa-users"></i>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Users
              </span>
            </li>
          </Link>
          <Link to="/admin/vendors">
            <li
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              mt-2
              `}
            >
              <i className="fa-solid fa-user-tie"></i>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Vendors
              </span>
            </li>
          </Link>
          <Link to="/admin/wallet">
            <li
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              mt-2
              `}
            >
              <i className="fa-solid fa-wallet"></i>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Wallet
              </span>
            </li>
          </Link>
          <Link to="/admin/inbox">
            <li
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              mt-2
              `}
            >
              <i className="fa-solid fa-bell"></i>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Inbox
              </span>
            </li>
          </Link>
          <Link to="/admin/wallet">
            <li
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
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
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
