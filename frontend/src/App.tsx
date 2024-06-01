// App.tsx
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./layout/user/navbar";
import UserLogin from "./pages/user/auth/Login";
import UserSignup from "./pages/user/auth/Signup";
import Home from "./pages/home/Home";
import VendorProfile from "./pages/home/SingleVendor";
import UserPrivateRoute from "./pages/user/UserPrivateRoute";
import VendorsListing from "./pages/home/VendorsListing";
import Profile from "./pages/user/profile/Profile";
import BookEventForm from "./pages/home/BookEventForm";
import PaymentSuccess from "./pages/home/PaymentSuccess";
import VerifyEmail from "./pages/common/VerifyEmail";
import ForgotPassword from "./pages/common/ForgotPassword";
import ResetPassword from "./pages/common/ResetPassword";
import Chat from "./pages/user/profile/Chat";
import LiveStreaming from "./pages/user/profile/LiveStreaming";
import Room from "./components/user/live/Room";
import { USER, VENDOR } from "./config/constants/constants";
import { Toaster } from "react-hot-toast";
import About from "./pages/home/About";
import Contact from "./pages/home/Contact";


const App: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Toaster />
      <ToastContainer />
      {!(
        pathname == USER.LOGIN ||
        pathname == USER.SIGNUP ||
        pathname == USER.VERIFY ||
        pathname == VENDOR.VERIFY ||
        pathname.includes(USER.FORGOT_PWD) ||
        pathname.includes(USER.RESET_PWD)||
        pathname.includes(USER.PROFILE)
      ) && (
        <div className="container fixed left-2/4 z-10 -translate-x-2/4 pt-4">
          <Navbar />
        </div>
      )}
     
        <Routes>
        
          <Route path={USER.HOME} element={<Home />} />
          <Route path={USER.LOGIN} element={<UserLogin />} />
          <Route path={USER.VERIFY} element={<VerifyEmail />} />
          <Route path={USER.FORGOT_PWD} element={<ForgotPassword />} />
          <Route path={USER.RESET_PWD} element={<ResetPassword />} />
          <Route path={USER.SIGNUP} element={<UserSignup />} />
          <Route path={USER.VENDORS} element={<VendorsListing />} />
          <Route path={USER.ABOUT} element={<About/>} />
          <Route path={USER.CONTACT} element={<Contact/>} />
          <Route path="" element={<UserPrivateRoute />}>
            <Route path={USER.VIEW_VENDOR} element={<VendorProfile />} />
            <Route path={`${USER.PROFILE}/*`} element={<Profile />} />
            <Route path={USER.BOOK_EVENT} element={<BookEventForm />} />
            <Route path={USER.PAYMENT_SUCCESS} element={<PaymentSuccess />} />
            <Route path={USER.CHAT} element={<Chat />} />
            <Route path={USER.LIVE} element={<LiveStreaming />} />
            <Route
              path={`${USER.LIVE_ROOM}/:roomId/:role_str`}
              element={<Room />}
            />
          </Route>
         
        </Routes>
   
    </>
  );
};

export default App;
