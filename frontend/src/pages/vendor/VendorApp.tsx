import React from "react";
import VendorNavbar from "../../components/vendor/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VendorApp: React.FC = () => {
  return (
    <>
      <ToastContainer />
      {/* <VendorNavbar /> */}
      <Outlet />
    </>
  );
};

export default VendorApp;
