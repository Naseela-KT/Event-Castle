import { Routes, Route } from "react-router-dom";
import ChangePassword from "../../components/user/Profile/ChangePassword";
import Favourites from "../../components/user/Profile/Favourites";
import  ProfileCard  from "../../components/user/Profile/ProfileCard";
import Sidebar from "../../components/user/Profile/UserSidebar";
import Footer from "../../layout/userLayout/footer";



const Profile: React.FC = () => {

  return (
    <>
    <div className="flex bg-gray-100">
    <Sidebar/>
      <div className="flex-1 bg-gray-100 my-20 mt-30">
      <Routes>
          <Route path="/" element={<ProfileCard />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </div>
    </div>
    <div className="bg-white">
    <Footer />
  </div>
</>
  );
};

export default Profile;
