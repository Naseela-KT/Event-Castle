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
