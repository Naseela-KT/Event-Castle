// App.tsx
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './layout/user/navbar';
import UserLogin from './pages/user/auth/Login';
import UserSignup from './pages/user/auth/Signup';
import Home from './pages/home/Home';
import VendorProfile from './pages/home/SingleVendor';
import UserPrivateRoute from './pages/user/UserPrivateRoute';
import VendorsListing from './pages/home/VendorsListing';
import Profile from './pages/user/profile/Profile';
import BookEventForm from './pages/home/BookEventForm';
import PaymentSuccess from './pages/home/PaymentSuccess';
import VerifyEmail from './pages/common/VerifyEmail';
import ForgotPassword from './pages/common/ForgotPassword';
import ResetPassword from './pages/common/ResetPassword';
import Chat from './pages/user/profile/Chat';
import LiveStreaming from './pages/user/profile/LiveStreaming';
import Room from './components/user/live/Room';




const App: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <ToastContainer />
      {!(pathname == '/login' || pathname == '/signup' || pathname=="/verify" || pathname=="/vendor/verify" || pathname.includes("/forgot-password") ||pathname.includes("/reset-password")) && (
        
        <div className="container fixed left-2/4 z-10 mx-auto -translate-x-2/4 pt-4">
          <Navbar />
        </div>
      )}
      
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<UserLogin />}/>
        <Route path="/verify" element={<VerifyEmail />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route path="/signup" element={<UserSignup />}/>
        <Route path="/vendors" element={<VendorsListing />}/>
        <Route path="" element={<UserPrivateRoute />}>
            <Route path="/view-vendor" element={<VendorProfile />}/>
            <Route path="/profile/*" element={<Profile />}/>
            <Route path="/book-event" element={<BookEventForm/>}/>
            <Route path="/payment-success" element={<PaymentSuccess/>}/>
            <Route path="/chat" element={<Chat/>}/>
            <Route path="/live" element={<LiveStreaming/>}/>
            <Route path="/room/:roomId/:role_str" element={<Room/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;

