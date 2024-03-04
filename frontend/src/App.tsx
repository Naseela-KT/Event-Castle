// App.tsx

import React from 'react';
import UserNavbar from './components/user/Navbar';
import { Outlet } from 'react-router-dom';
import Layout from './components/Layout';

const App: React.FC = () => {
  const role = 'user'; 

  return (
    <>
      <Layout role={role}>
        <UserNavbar />
        <Outlet />
      </Layout>
    </>
  );
};

export default App;
