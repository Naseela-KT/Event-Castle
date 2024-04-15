// App.tsx
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './layout/userLayout/navbar';
import UserLogin from './pages/user/Login';
import UserSignup from './pages/user/Signup';
import Home from './pages/Home';
import VendorProfile from './pages/SingleVendor';
import UserPrivateRoute from './components/user/UserPrivateRoute';
import VendorsListing from './pages/VendorsListing';
import Profile from './pages/user/Profile';
import BookEventForm from './pages/BookEventForm';
import PaymentSuccess from './pages/PaymentSuccess';
import VerifyEmail from './components/VerifyEmail';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Chat from './pages/Chat';




const App: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <ToastContainer />
      {!(pathname == '/login'|| pathname=='/chat' || pathname == '/signup' || pathname=="/verify" || pathname=="/vendor/verify" || pathname.includes("/forgot-password") ||pathname.includes("/reset-password")) && (
        
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
        </Route>
      </Routes>
    </>
  );
};

export default App;

