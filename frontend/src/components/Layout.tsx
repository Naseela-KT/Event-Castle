// Layout.tsx

import React from 'react';
import "../../public/css/user-unauth.css"

interface Props {
  role: string;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ role, children }) => {
  const getCssFilePath = (role: string) => {
    switch (role) {
      case 'admin':
        return '../../public/css/admin.css';
      case 'user':
        return "../../public/css/user-unauth.css";
      case 'vendor':
        return "../../public/css/vendor-unauth.css";
      default:
        return ''; // Default styles for unknown roles
    }
  };

  const cssFilePath = getCssFilePath(role);

  return (
    <>
      <link rel="stylesheet" type="text/css" href={cssFilePath}/>
      <div>{children}</div>
    </>
  );
};

export default Layout;
