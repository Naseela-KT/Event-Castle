"use client";

import React from "react";
import { Link ,useNavigate} from 'react-router-dom';
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  MobileNav,
} from "@material-tailwind/react";
import { useSelector,useDispatch } from 'react-redux';
import AdminState  from '../../redux/rootstate/AdminState';
import {axiosInstanceAdmin} from '../../api/axiosinstance';
import { logout } from "../../redux/slices/AdminSlice";


const AdminNavbar=()=> {
  const [openNav, setOpenNav] = React.useState(false);
  const isAdminSignedIn = useSelector((state: AdminState) => state.admin.isAdminSignedIn);

  const navigate = useNavigate();
  const dispatch= useDispatch();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

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
  

 
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100 }}>
    <Navbar className="px-4 lg:px-8 lg:py-2" placeholder={undefined} style={{ borderRadius: 0,border:0,backgroundColor:'#565656' }} >
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
                  as="a"
                  href="#"
                  className="mr-4 cursor-pointer py-1.5 font-medium" color="pink" placeholder={undefined}        >
          Event Castle
         
        </Typography>
       
       
        <div className="flex items-center gap-x-1">
      {isAdminSignedIn?
        <Button variant="gradient" color="black" size="sm" className="hidden lg:inline-block" placeholder={undefined} onClick={handleLogout}>
          <span>Logout</span>
        </Button>
      :
      <Link to="/admin/login">
        <Button variant="gradient" color="black" size="sm" className="hidden lg:inline-block" placeholder={undefined}>
          <span>Login</span>
        </Button>
      </Link>
      }
    </div>
        <IconButton
                  variant="text"
                  className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                  ripple={false}
                  onClick={() => setOpenNav(!openNav)}  placeholder={undefined}        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      
      <MobileNav  open={openNav}>
        <div className="container mx-auto">
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className=""  placeholder={undefined}>
              <span>Log In</span>
            </Button>
          </div>
        </div>
      </MobileNav >
     
    </Navbar>
    </div>
  );
}
 export default AdminNavbar