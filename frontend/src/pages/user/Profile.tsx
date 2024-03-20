import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { IconButton, Drawer } from '@material-tailwind/react'; // Importing from @material-tailwind/react
import UserSidebar from '../../components/user/Profile/Sidebar';
import { useMediaQuery } from '@mui/material'; // Importing useMediaQuery hook from Material-UI

const Profile = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isMedium = useMediaQuery('(max-width: 960px)'); // Use useMediaQuery hook to check screen width

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      {/* Show the icon on screens smaller than medium */}
      {!isMedium && (
        <div className="md:hidden fixed top-4 left-4 z-50">
          <IconButton
                      variant="text"
                      size="lg"
                      onClick={openDrawer}  placeholder={undefined}          >
            <Bars3Icon className="h-8 w-8 stroke-2" />
          </IconButton>
        </div>
      )}

      {/* Conditionally render the sidebar or hamburger icon */}
      {isMedium ? (
        <div className="hidden md:block">
          <UserSidebar /> 
        </div>
      ) : null}

      {/* Show the drawer on screens smaller than medium */}
      <Drawer open={isDrawerOpen} onClose={closeDrawer}  placeholder={undefined}>
        <div className="md:hidden">
          <IconButton
                      variant="text"
                      size="lg"
                      onClick={closeDrawer}  placeholder={undefined}          >
            <XMarkIcon className="h-8 w-8 stroke-2" />
          </IconButton>
        </div>
        <div className="md:hidden">
          <UserSidebar />
        </div>
      </Drawer>
    </>
  );
}

export default Profile;
