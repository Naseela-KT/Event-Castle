import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Avatar,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  Tooltip,
} from "@material-tailwind/react";

import {
  Bars3Icon,
  ChevronDownIcon,
  PowerIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import UserState from "../../redux/rootstate/UserState";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../../config/api/axiosinstance";
import { logout } from "../../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { USER } from "../../config/constants/constants";
import NotificationIcon from "../../components/home/NotificationIcon";

const Navbar = () => {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  const [openNav, setOpenNav] = useState<boolean>(false);
  const user = useSelector((state: UserState) => state.user.userdata);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0 && location.pathname !== USER.PROFILE) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [path.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
    <ul className="flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
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
    <MTNavbar
      style={{ borderRadius: "0" }}
      color="transparent"
      className={`${
        path.pathname.includes("/profile") ||
        path.pathname.includes("/live") ||
        path.pathname.includes("/room/") ||
        path.pathname.includes("/book-event") ||
        path.pathname.includes("/chat") ||
        path.pathname.includes("/payment-success")
          ? "z-50 px-3 bg-black h-18 -mt-5 fixed"
          : "z-50"
      }`}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div
        className={`navbar flex items-center justify-between ${isScrolled && (!location.pathname.includes(`/profile`) || !location.pathname.includes("/chat")) ? "bg-black -mt-5 rounded-lg py-4 px-2 shadow-lg text-white" : "m-0"}`}
      >
        <Link to={USER.HOME}>
          <Typography
            className="ml-4 mr-2 cursor-pointer py-1 font-bold"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            variant="h6"
          >
            Event Castle
          </Typography>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="hidden gap-2 lg:flex">
          {user ? (
            <>
           
              <NotificationIcon />
            

              <Link to={`${USER.PROFILE}`}>
              <Tooltip content="Profile" color="white">
                <Avatar
                  size="xs"
                  variant="circular"
                  alt={user?.name}
                  className="cursor-pointer bg-white mt-2"
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
            </>
          ) : (
            <>
              <Link to={USER.LOGIN}>
                <Button
                  variant="text"
                  size="sm"
                  color="white"
                  fullWidth
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Login
                </Button>
              </Link>

              <Link to={USER.SIGNUP}>
                <Button
                  variant="gradient"
                  size="sm"
                  fullWidth
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Signup
                </Button>
              </Link>
            </>
          )}
        </div>
        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <MobileNav
        className="rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900"
        open={openNav}
      >
        <div className="container mx-auto">
          {navList}
          {user ? (
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                />
              }
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <ListItem
                className="p-0"
                selected={open === 1}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
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
                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Profile
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List
                  className="p-0"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <ListItem
                    className="flex items-center gap-2"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM10 5C10 5.53043 9.78929 6.03914 9.41421 6.41421C9.03914 6.78929 8.53043 7 8 7C7.46957 7 6.96086 6.78929 6.58579 6.41421C6.21071 6.03914 6 5.53043 6 5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5ZM8 9C7.0426 8.99981 6.10528 9.27449 5.29942 9.7914C4.49356 10.3083 3.85304 11.0457 3.454 11.916C4.01668 12.5706 4.71427 13.0958 5.49894 13.4555C6.28362 13.8152 7.13681 14.0009 8 14C8.86319 14.0009 9.71638 13.8152 10.5011 13.4555C11.2857 13.0958 11.9833 12.5706 12.546 11.916C12.147 11.0457 11.5064 10.3083 10.7006 9.7914C9.89472 9.27449 8.9574 8.99981 8 9Z"
                        fill="#90A4AE"
                      />
                    </svg>
                    <Link to={USER.PROFILE}>
                      <Typography
                        variant="small"
                        className="font-medium"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        My Profile
                      </Typography>
                    </Link>
                  </ListItem>
                  <ListItem
                    className="flex items-center gap-2"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <i className="fa-regular fa-message"></i>
                    <Link to={USER.CHAT}>
                      <Typography
                        variant="small"
                        className="font-medium"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Chat
                      </Typography>
                    </Link>
                  </ListItem>
                  <ListItem
                    className="flex items-center gap-2"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <i className="fa-solid fa-tower-broadcast"></i>
                    <Link to={USER.LIVE}>
                      <Typography
                        variant="small"
                        className="font-medium"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Live
                      </Typography>
                    </Link>
                  </ListItem>

                  <ListItem
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <Button
                      variant="text"
                      size="sm"
                      className="hidden lg:inline-block"
                      placeholder={undefined}
                      onClick={handleLogout}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Logout
                    </Button>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
          ) : (
            <Link to={USER.LOGIN}>
              <Button
                variant="text"
                size="sm"
                fullWidth
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Login
              </Button>
            </Link>
          )}
        </div>
        <div>
          <Button
            variant="gradient"
            size="sm"
            fullWidth
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </MobileNav>
    </MTNavbar>
  );
};

Navbar.defaultProps = {
  brandName: "Event Castle",
  action: (
    <a
      href="https://www.creative-tim.com/product/material-tailwind-kit-react"
      target="_blank"
    ></a>
  ),
};

export default Navbar;
