import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from '../../common/Loader';
import EditProfile from './Profile/EditProfile';
import Posts from './Posts/Posts';
import CreatePost from './Posts/CreatePost';
import { Toaster } from 'react-hot-toast';
import ChangePassword from './Profile/ChangePassword';
import { Reviews } from './Reviews';
import BookingHistory from './Booking/BookingHistory';
import Notifications from './Notifications';
import VendorSignupForm from './Authentication/Signup';
import VendorLoginForm from './Authentication/Login';
import VendorPrivateRoute from '../../components/vendor/VendorPrivateRoute';
import Dashboard from './Dashboard';
import CustomDatePicker from './Booking/Dates';
import VerifyEmail from '../../components/VerifyEmail';
import ViewBooking from './Booking/ViewBooking';
import ResetPassword from '../../components/ResetPassword';
import ForgotPassword from '../../components/ForgotPassword';
import Profile from './Profile/Profile';
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
          path="/vendor/signup"
          element={
            <>
              <VendorSignupForm />
            </>
          }
        />
        <Route
          path="/vendor/login"
          element={
            <>
              
              <VendorLoginForm />
            </>
          }
        />
        <Route
          path="/vendor/chat"
          element={
            <>
              
              <Chat />
            </>
          }
        />
         <Route
          path="/vendor/verify"
          element={
            <>
              
              <VerifyEmail/>
            </>
          }
        />
          <Route
          path="/vendor/reset-password"
          element={
            <>
              
              <ResetPassword/>
            </>
          }
        />
          <Route
          path="/vendor/forgot-password"
          element={
            <>
              
              <ForgotPassword/>
            </>
          }
        />
            <Route path="" element={<VendorPrivateRoute />}>
            <Route
          index
          path="/vendor"
          element={
            <>

              <Dashboard />
            </>
          }
        />
         
        <Route
          index
          path="/vendor/dashboard"
          element={
            <>
          
              <Dashboard />
            </>
          }
        />
        <Route
          index
          path="/vendor/view-profile"
          element={
            <>
              
              <Profile />
            </>
          }
        />
        <Route
          index
          path="/vendor/edit-profile"
          element={
            <>
              
              <EditProfile />
            </>
          }
        />
        <Route
          index
          path="/vendor/change-password"
          element={
            <>
              
              <ChangePassword />
            </>
          }
        />
        <Route
          index
          path="/vendor/view-posts"
          element={
            <>
              
              <Posts />
            </>
          }
        />
        <Route
          index
          path="/vendor/add-post"
          element={
            <>
              
              <CreatePost />
            </>
          }
        />
        <Route
          index
          path="/vendor/booking-history"
          element={
            <>
              
              <BookingHistory      
              
              />
            </>
          }
        />
        <Route
          index
          path="/vendor/view-booking"
          element={
            <>
             
              <ViewBooking
              
              />
            </>
          }
        />
         <Route
          index
          path="/vendor/add-date"
          element={
            <>
             
              <CustomDatePicker/>
            </>
          }
        />

        <Route
          index
          path="/vendor/reviews"
          element={
            <>
              
              <Reviews />
            </>
          }
        />

        <Route
          index
          path="/vendor/notifications"
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
