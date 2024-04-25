import { useEffect, useState } from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  Bars3Icon,
  BookmarkIcon,
  HeartIcon,
  LockClosedIcon,
  WalletIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UserRootState from "../../../redux/rootstate/UserState";
import { USER } from "../../../config/constants/constants";

export default function Sidebar() {
  const user = useSelector((state: UserRootState) => state.user.userdata);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  const path = useLocation();

  useEffect(() => {
    function handleResize() {
      setIsMediumScreen(window.innerWidth <= 768); // Adjust the width as per your requirement for medium screens
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      {isMediumScreen ? (
        <>
          <IconButton
            variant="text"
            size="lg"
            onClick={openDrawer}
            className="mt-20 fixed"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {isDrawerOpen ? (
              <XMarkIcon className="h-8 w-8 stroke-2" />
            ) : (
              <Bars3Icon className="h-8 w-8 stroke-2" />
            )}
          </IconButton>
          <Drawer
            open={isDrawerOpen}
            onClose={closeDrawer}
            className="fixed"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Card
              color="transparent"
              shadow={false}
              className="h-[calc(100vh-2rem)] w-full p-4"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <div className="mb-2 flex items-center gap-4 p-4">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {user?.name}
                </Typography>
              </div>

              <List
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <hr className="my-2 border-blue-gray-50" />
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
                      path.pathname.includes(
                        USER.BOOKING||USER.BOOKING_DETAILS
                      )
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
            </Card>
          </Drawer>
        </>
      ) : (
        <>
          {" "}
          <Card
            color="transparent"
            shadow={false}
            className="h-[calc(100vh-2rem)] w-200 p-4"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <div className="mb-2 flex items-center gap-4 p-4">
              <Typography
                variant="h5"
                color="blue-gray"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {user?.name}
              </Typography>
            </div>

            <List
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <hr className="my-2 border-blue-gray-50" />
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
                      path.pathname.includes(
                        USER.BOOKING||USER.BOOKING_DETAILS
                      )
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
                     <i className="fa-regular fa-bell"></i>
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
          </Card>
        </>
      )}
    </>
  );
}
