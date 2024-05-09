import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemPrefix,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { logout } from "../../redux/slices/UserSlice";
import NotificationIcon from "../../components/home/NotificationIcon";
import UserState from "../../redux/rootstate/UserState";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector((state: UserState) => state.user.userdata);

  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    // Set activePath based on the current location
    setActivePath(location.pathname);
  }, [location]);

  const handleSidebarClick = (path:string) => {
    setActivePath(path);
  };

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
        navigate(`${USER.LOGIN}`);
      })
      .catch((error) => {
        console.log("here", error);
      });
  };

  const navList = (
    <ul className="hidden lg:flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        key="Home"
        as="li"
        variant="small"
        color={location.pathname === USER.HOME ? "pink" : "inherit"}
        className="capitalize"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Link to={USER.HOME} className="flex items-center gap-1 p-1 font-bold">
          Home
        </Link>
      </Typography>
      <Typography
        key="Vendors"
        as="li"
        color={location.pathname === USER.VENDORS ? "pink" : "inherit"}
        variant="small"
        className="capitalize"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Link
          to={USER.VENDORS}
          className="flex items-center gap-1 p-1 font-bold"
        >
          Vendors
        </Link>
      </Typography>
      <Typography
        key="About"
        as="li"
        variant="small"
        color={location.pathname === USER.ABOUT ? "pink" : "inherit"}
        className="capitalize"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Link to={USER.ABOUT} className="flex items-center gap-1 p-1 font-bold">
          About
        </Link>
      </Typography>
    </ul>
  );

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
            <Link to={USER.PROFILE} onClick={() => handleSidebarClick(`${USER.PROFILE}`)}>
              <ListItem
                className={`${activePath == USER.PROFILE ? "text-pink-400" : ""}text-sm`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <UserCircleIcon className="h-5 w-5 text-sm" />
                </ListItemPrefix>
                Profile
              </ListItem>
            </Link>
            <Link to={`${USER.PROFILE}${USER.CHANGE_PWD}`}>
              <ListItem
                className={`${path.pathname == `${USER.PROFILE}${USER.CHANGE_PWD}` ? "text-pink-300" : ""}text-sm`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <LockClosedIcon className="h-5 w-5 text-sm" />
                </ListItemPrefix>
                Change Password
              </ListItem>
            </Link>
            <Link to={`${USER.PROFILE}${USER.FAV}`}>
              <ListItem
                className={`${path.pathname == `${USER.PROFILE}${USER.FAV}` ? "bg-gray-300" : ""}text-sm`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <HeartIcon className="h-5 w-5 text-sm" />
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
                }text-sm`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <BookmarkIcon className="h-5 w-5 text-sm" />
                </ListItemPrefix>
                Booking Details
              </ListItem>
            </Link>
            <Link to={`${USER.PROFILE}${USER.WALLET}`}>
              <ListItem
                className={`${path.pathname == `${USER.PROFILE}${USER.WALLET}` ? "bg-gray-300" : ""}text-sm`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <WalletIcon className="h-5 w-5 text-sm" />
                </ListItemPrefix>
                Wallet
              </ListItem>
            </Link>
            <Link to={`${USER.PROFILE}${USER.INBOX}`}>
              <ListItem
                className={`${path.pathname==`${USER.PROFILE}${USER.INBOX}` ? "bg-gray-300" : ""}text-sm`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <i className="fa-regular fa-bell text-sm"></i>
                </ListItemPrefix>
                Notifications
                
              </ListItem>
            </Link>

         
            <Link to={`${USER.CHAT}`}>
              <ListItem
                className={`${path.pathname == `${USER.CHAT}` ? "bg-gray-300" : ""}text-sm`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <i className="fa-regular fa-message text-sm"></i>
                </ListItemPrefix>
                Chat
                
              </ListItem>
            </Link>
            <Link to={`${USER.LIVE}`}>
              <ListItem
              
                className={`${path.pathname == `${USER.LIVE}` ? "bg-gray-300" : ""}text-sm`}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItemPrefix
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <i className="fa-solid fa-tower-broadcast text-sm"></i>
                </ListItemPrefix>
                Live
                
              </ListItem>
            </Link>
            <hr className="my-2 border-blue-gray-50" />
            <Button
              onClick={handleLogout}
              className={`group relative flex rounded-lg items-center gap-2.5  py-2 w-30 font-medium  duration-300 ease-in-out  bg-pink-400 dark:bg-meta-4`}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <svg
                className="white"
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_130_9814)">
                  <path
                    d="M12.7127 0.55835H9.53457C8.80332 0.55835 8.18457 1.1771 8.18457 1.90835V3.84897C8.18457 4.18647 8.46582 4.46772 8.80332 4.46772C9.14082 4.46772 9.45019 4.18647 9.45019 3.84897V1.88022C9.45019 1.82397 9.47832 1.79585 9.53457 1.79585H12.7127C13.3877 1.79585 13.9221 2.33022 13.9221 3.00522V15.0709C13.9221 15.7459 13.3877 16.2802 12.7127 16.2802H9.53457C9.47832 16.2802 9.45019 16.2521 9.45019 16.1959V14.2552C9.45019 13.9177 9.16894 13.6365 8.80332 13.6365C8.43769 13.6365 8.18457 13.9177 8.18457 14.2552V16.1959C8.18457 16.9271 8.80332 17.5459 9.53457 17.5459H12.7127C14.0908 17.5459 15.1877 16.4209 15.1877 15.0709V3.03335C15.1877 1.65522 14.0627 0.55835 12.7127 0.55835Z"
                    fill=""
                  />
                  <path
                    d="M10.4346 8.60205L7.62207 5.7333C7.36895 5.48018 6.97519 5.48018 6.72207 5.7333C6.46895 5.98643 6.46895 6.38018 6.72207 6.6333L8.46582 8.40518H3.45957C3.12207 8.40518 2.84082 8.68643 2.84082 9.02393C2.84082 9.36143 3.12207 9.64268 3.45957 9.64268H8.49395L6.72207 11.4427C6.46895 11.6958 6.46895 12.0896 6.72207 12.3427C6.83457 12.4552 7.00332 12.5114 7.17207 12.5114C7.34082 12.5114 7.50957 12.4552 7.62207 12.3145L10.4346 9.4458C10.6877 9.24893 10.6877 8.85518 10.4346 8.60205Z"
                    fill=""
                  />
                </g>
                <defs>
                  <clipPath id="clip0_130_9814">
                    <rect
                      width="18"
                      height="18"
                      fill="white"
                      transform="translate(0 0.052124)"
                    />
                  </clipPath>
                </defs>
              </svg>
              Logout
            </Button>
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
            <Typography
              className="font-bold"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Event Castle
            </Typography>
          </Link>
        {navList}
          <div className="hidden lg:flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-2">
            <NotificationIcon />

            <Link to={`${USER.PROFILE}`}>
              <Tooltip content="Profile" color="white">
                <Avatar
                  size="xs"
                  variant="circular"
                  alt={user?.name}
                  className="cursor-pointer bg-pink-500"
                  src={
                    user?.imageUrl ? user.imageUrl : "/imgs/user-default.svg"
                  }
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
                </Tooltip>
              </Link>
              <Tooltip content="Logout" color="white">
              <Button
              color="white"
              size="sm"
                variant="text"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                onClick={handleLogout}
              >
                <PowerIcon className="h-5 w-5" />
              </Button>
              </Tooltip>
          </div>
          

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
