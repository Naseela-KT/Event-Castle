// App.tsx

import React from 'react';
import AllNavbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Layout from './components/Layout';

const App: React.FC = () => {
  const role = 'user'; // Replace this with your actual logic to get the user's role

  return (
    <>
      <Layout role={role}>
        <AllNavbar />
        <Outlet />
      </Layout>
    </>
  );
};

export default App;
