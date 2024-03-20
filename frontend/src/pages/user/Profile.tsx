import { Routes, Route } from "react-router-dom";
import ChangePassword from "../../components/user/Profile/ChangePassword";
import Favourites from "../../components/user/Profile/Favourites";
import UserSidebar from "../../components/user/Profile/UserSidebar";
import  ProfileCard  from "../../components/user/Profile/ProfileCard";

const Profile = () => {
  return (
    <div style={{ display: 'flex' }}>
      <UserSidebar />
      <div style={{ marginLeft: '200px', flex: 1 ,marginTop:"100px"}}>
        <Routes>
          <Route path="/" element={<ProfileCard />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
