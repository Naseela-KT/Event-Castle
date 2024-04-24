import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import EditProfile from './profile/EditProfile';
import Posts from './posts/Posts';
import CreatePost from './posts/CreatePost';
import { Toaster } from 'react-hot-toast';
import ChangePassword from './profile/ChangePassword';
import { Reviews } from './Reviews';
import BookingHistory from './booking/BookingHistory';
import Notifications from './Notifications';
import VendorSignupForm from './auth/Signup';
import VendorLoginForm from './auth/Login';
import VendorPrivateRoute from './VendorPrivateRoute';
import Dashboard from './Dashboard';
import CustomDatePicker from './booking/Dates';
import VerifyEmail from '../common/VerifyEmail';
import ViewBooking from './booking/ViewBooking';
import ResetPassword from '../common/ResetPassword';
import ForgotPassword from '../common/ForgotPassword';
import Profile from './profile/Profile';
import { ToastContainer } from 'react-toastify';
import Chat from './Chat';




function VendorApp() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer />
      <Toaster />
      <Routes>
      <Route
          path="/signup"
          element={
            <>
              <VendorSignupForm />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              
              <VendorLoginForm />
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              
              <Chat />
            </>
          }
        />
         <Route
          path="/verify"
          element={
            <>
              
              <VerifyEmail/>
            </>
          }
        />
          <Route
          path="/reset-password"
          element={
            <>
              
              <ResetPassword/>
            </>
          }
        />
          <Route
          path="/forgot-password"
          element={
            <>
              
              <ForgotPassword/>
            </>
          }
        />
            <Route path="" element={<VendorPrivateRoute />}>
            <Route
          
          path="/dashboard"
          element={
            <>

              <Dashboard />
            </>
          }
        />
         
        <Route
          index
          path="/dashboard"
          element={
            <>
          
              <Dashboard />
            </>
          }
        />
        <Route
          index
          path="/view-profile"
          element={
            <>
              
              <Profile />
            </>
          }
        />
        <Route
          index
          path="/edit-profile"
          element={
            <>
              
              <EditProfile />
            </>
          }
        />
        <Route
          index
          path="/change-password"
          element={
            <>
              
              <ChangePassword />
            </>
          }
        />
        <Route
          index
          path="/view-posts"
          element={
            <>
              
              <Posts />
            </>
          }
        />
        <Route
          index
          path="/add-post"
          element={
            <>
              
              <CreatePost />
            </>
          }
        />
        <Route
          index
          path="/booking-history"
          element={
            <>
              
              <BookingHistory      
              
              />
            </>
          }
        />
        <Route
          index
          path="/view-booking"
          element={
            <>
             
              <ViewBooking
              
              />
            </>
          }
        />
         <Route
          index
          path="/add-date"
          element={
            <>
             
              <CustomDatePicker/>
            </>
          }
        />

        <Route
          index
          path="/reviews"
          element={
            <>
              
              <Reviews />
            </>
          }
        />

        <Route
          index
          path="/notifications"
          element={
            <>
              
             <Notifications/>
            </>
          }
        />
        
     
     </Route>
      </Routes>
    </>
  );
}

export default VendorApp;
