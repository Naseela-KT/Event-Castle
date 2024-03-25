//
import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstanceAdmin } from "../../api/axiosinstance";
import { logout } from "../../redux/slices/AdminSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { SetStateAction } from "react";
 
const Sidebar=() =>{
  

  const navigate = useNavigate();
  const dispatch= useDispatch();
 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOpen = (value: SetStateAction<boolean> | '') => {
    setOpen(open === value ? 0 : value);
  };


  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axiosInstanceAdmin.get("/logout")
      .then(() => {
        dispatch(logout()); // Assuming you want to clear admin info on logout
        navigate("/admin/login");
      })
      .catch((error) => {
        console.log('here', error);
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
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Inbox", src: "Chat" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Schedule ", src: "Calendar" },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  return (
    <div className="flex">
      <div
          className={`sidebar ${open ? "" : "closed"} bg-dark-purple h-screen p-5 pt-8 relative duration-300`}
          style={{ width: open ? "250px" : "80px" }} 
      >
        <img
          src="/public/imgs/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="/public/imgs/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={`/public/imgs/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default Sidebar