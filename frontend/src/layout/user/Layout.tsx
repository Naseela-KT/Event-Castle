import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { USER } from "../../config/constants/constants";
import {
  BookmarkIcon,
  HeartIcon,
  LockClosedIcon,
  PowerIcon,
  UserCircleIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { axiosInstance } from "../../config/api/axiosinstance";
import { useDispatch } from "react-redux";
import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { logout } from "../../redux/slices/UserSlice";

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

  const handleLogout = () => {
    axiosInstance
      .get("/logout")
      .then(() => {
        dispatch(logout());
        navigate(USER.LOGIN);
      })
      .catch((error) => {
        console.log("here", error);
      });
  };

  return (
    <div className="flex h-screen overflow-hidden ">
      {/* Sidebar */}
      <aside
        className={`fixed bg-white border border-gray-300  text-white w-64 p-4 h-full transition-transform ${
          isSidebarOpen ? "translate-x-0 z-999" : "-translate-x-64 pt-20"
        } sm:translate-x-0`}
      >
        {isSidebarOpen ? (
          <button className="ml-50 text-black" onClick={toggleSidebar}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        ) : (
          ""
        )}
        <nav> 
          <List
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
           
            <Link to={USER.PROFILE}>
              <ListItem
                className={`${path.pathname == USER.PROFILE ? "bg-gray-300" : ""}`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
            </Link>
            <Link to={`${USER.PROFILE}${USER.CHANGE_PWD}`}>
              <ListItem
                className={`${path.pathname == `${USER.PROFILE}${USER.CHANGE_PWD}` ? "bg-gray-300" : ""}`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <LockClosedIcon className="h-5 w-5" />
                </ListItemPrefix>
                Change Password
              </ListItem>
            </Link>
            <Link to={`${USER.PROFILE}${USER.FAV}`}>
              <ListItem
                className={`${path.pathname == `${USER.PROFILE}${USER.FAV}` ? "bg-gray-300" : ""}`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <HeartIcon className="h-5 w-5" />
                </ListItemPrefix>
                Favourites
              </ListItem>
            </Link>
            <Link to={`${USER.PROFILE}${USER.BOOKING_DETAILS}`}>
              <ListItem
                className={`${
                  path.pathname.includes(USER.BOOKING || USER.BOOKING_DETAILS)
                    ? "bg-gray-300"
                    : ""
                }`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <BookmarkIcon className="h-5 w-5" />
                </ListItemPrefix>
                Booking Details
              </ListItem>
            </Link>
            <Link to={`${USER.PROFILE}${USER.WALLET}`}>
              <ListItem
                className={`${path.pathname == `${USER.PROFILE}${USER.WALLET}` ? "bg-gray-300" : ""}`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <WalletIcon className="h-5 w-5" />
                </ListItemPrefix>
                Wallet
              </ListItem>
            </Link>
            <Link to={`${USER.PROFILE}${USER.INBOX}`}>
              <ListItem
                className={`${path.pathname == `${USER.PROFILE}${USER.INBOX}` ? "bg-gray-300" : ""}`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <i className="fa-solid fa-bell"></i>
                </ListItemPrefix>
                Notifications
                {/* <ListItemSuffix  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix> */}
              </ListItem>
            </Link>

            <hr className="my-2 border-blue-gray-50" />
            <ListItem
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={handleLogout}
            >
              <ListItemPrefix
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="fixed w-full bg-black text-white p-4 flex justify-between items-center z-10">
          {/* Left-aligned logo/text */}
          <Link to={USER.HOME} className="flex items-center">
            {/* <img
              src="/icons/logo.svg"
              alt="Event Castle Logo"
              className="w-10 h-10 mr-2"
            /> */}
            <Typography className="font-bold" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Event Castle</Typography>
          </Link>

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
