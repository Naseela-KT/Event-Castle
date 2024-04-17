import React from 'react';
import ReactDOM from 'react-dom/client';
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
import Dashboard from './pages/admin/Dahboard';
import AdminLogin from './components/admin/Login';
import VendorsList from './pages/admin/VendorsList';
import VendorTypes from './pages/admin/VendorTypes';
import UsersList from './pages/admin/UsersList';
import AdminPrivateRoute from './components/admin/AdminPrivateRoute';
import VendorProfile from './components/admin/vendorList/VendorProfile';
import Wallet from './pages/admin/Wallet';



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/*" element={<App />}>
      </Route>

      <Route path="/admin" element={<AdminApp />}>
        <Route index={true} path="/admin" element={<AdminLogin />} />
        {/* Admin Private Routes */}
        <Route path="" element={<AdminPrivateRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/vendors" element={<VendorsList />} />
          <Route path="/admin/vendor-types" element={<VendorTypes />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/vendor" element={<VendorProfile />} />
          <Route path="/admin/wallet" element={<Wallet />} />
        </Route>
      </Route>

      <Route path="" element={<VendorApp/>}>
      <Route path="/vendor/*" element={<VendorApp/>} />
        </Route>
     
    </>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      {/* <React.StrictMode> */}
        <RouterProvider router={router} />
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>,
);
