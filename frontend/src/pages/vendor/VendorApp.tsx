import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from '../../common/Loader';
import PageTitle from '../../components/vendor/PageTitle';
import Profile from './Profile/Profile';
import { ToastContainer } from 'react-toastify';
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
            <Route path="" element={<VendorPrivateRoute />}>
            <Route
          index
          path="/vendor"
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Dashboard />
            </>
          }
        />
        <Route
          index
          path="/vendor/dashboard"
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Dashboard />
            </>
          }
        />
        <Route
          index
          path="/vendor/view-profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          index
          path="/vendor/edit-profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <EditProfile />
            </>
          }
        />
        <Route
          index
          path="/vendor/change-password"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ChangePassword />
            </>
          }
        />
        <Route
          index
          path="/vendor/view-posts"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Posts />
            </>
          }
        />
        <Route
          index
          path="/vendor/add-post"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <CreatePost />
            </>
          }
        />
        <Route
          index
          path="/vendor/booking-history"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <BookingHistory      
              
              />
            </>
          }
        />

        <Route
          index
          path="/vendor/reviews"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Reviews />
            </>
          }
        />

        <Route
          index
          path="/vendor/notifications"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
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
