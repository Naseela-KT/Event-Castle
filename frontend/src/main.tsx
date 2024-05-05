
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './pages/ErrorBoundary';
import App from './App';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import VendorApp from './pages/vendor/VendorApp';
import AdminApp from './pages/admin/AdminApp';
import Dashboard from './pages/admin/profile/Dahboard';
import AdminLogin from './pages/admin/auth/Login';
import VendorsList from './pages/admin/profile/VendorsList';
import VendorTypes from './pages/admin/profile/VendorTypes';
import UsersList from './pages/admin/profile/UsersList';
import AdminPrivateRoute from './pages/admin/AdminPrivateRoute';
import VendorProfile from './components/admin/vendorList/VendorProfile';
import Wallet from './pages/admin/profile/Wallet';
import Notifications from './pages/admin/profile/Notifications';
import { ADMIN } from './config/constants/constants';
import React from 'react';




// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/*" element={<App/>} errorElement={<ErrorBoundary />}>
      <Route path="/*" element={<App />} />
    </Route>


      <Route path="/admin" element={<AdminApp />}>
        <Route index={true} path="/admin" element={<AdminLogin />}/>
        {/* Admin Private Routes */}
        <Route path="" element={<AdminPrivateRoute />}>
          <Route path={ADMIN.DASHBOARD} element={<Dashboard />} />
          <Route path={ADMIN.VENDORS} element={<VendorsList />} />
          <Route path={ADMIN.VENDOR_TYPES} element={<VendorTypes />} />
          <Route path={ADMIN.USERS} element={<UsersList />} />
          <Route path={ADMIN.VENDOR} element={<VendorProfile />} />
          <Route path={ADMIN.WALLET} element={<Wallet />} />
          <Route path={ADMIN.INBOX} element={<Notifications />} />
        </Route>
      </Route>

      <Route path="/vendor/*" element={<VendorApp />} />
      
    </>,
  ),
);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
);
