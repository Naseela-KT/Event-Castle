import { Routes, Route } from "react-router-dom";
import ChangePassword from "../../../components/user/Profile/ChangePassword";
import Favourites from "../../../components/user/Profile/Favourites";
import ProfileCard from "../../../components/user/Profile/ProfileCard";
import Sidebar from "../../../components/user/Profile/UserSidebar";
import BookingDetails from "../../../components/user/Profile/BookingDetails";
import SingleBooking from "../../../components/user/Profile/SingleBooking";
import Wallet from "../../../components/user/Profile/Wallet";
import Notifications from "../../../components/user/Profile/Notifications";
import {
  USER
} from "../../../config/constants/constants";


const Profile: React.FC = () => {
  return (
    <>
      <div className="flex bg-gray-100">
        <Sidebar />
        <div className="flex-1 bg-gray-100 my-20 mt-30">
          <div
            className="overflow-y-scroll"
            style={{ maxHeight: "calc(100vh - 120px)" }}
          >
            <Routes>
              <Route path="/" element={<ProfileCard />} />
              <Route path={USER.CHANGE_PWD} element={<ChangePassword />} />
              <Route path={USER.FAV} element={<Favourites />} />
              <Route path={USER.BOOKING_DETAILS} element={<BookingDetails />} />
              <Route path={USER.BOOKING} element={<SingleBooking />} />
              <Route path={USER.WALLET} element={<Wallet />} />
              <Route path={USER.INBOX} element={<Notifications />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
