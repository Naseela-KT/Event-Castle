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



const App: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <ToastContainer />
      {!(pathname == '/login' || pathname == '/signup') && (
        
        <div className="container fixed left-2/4 z-10 mx-auto -translate-x-2/4 pt-4">
          <Navbar />
        </div>
      )}
      
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<UserLogin />}/>
        <Route path="/sinup" element={<UserSignup />}/>
        <Route path="/vendors" element={<VendorsListing />}/>
        <Route path="" element={<UserPrivateRoute />}>
            <Route path="/view-vendor" element={<VendorProfile />}/>
            <Route path="/profile/*" element={<Profile />}/>
            <Route path="/book-event" element={<BookEventForm/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;

