import { useSelector } from "react-redux";
import UserRootState from "../../../redux/rootstate/UserState";

const Wallet = () => {
    const user= useSelector((state: UserRootState) => state.user.userdata);
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{user?.name}'s Wallet</h2>
        <div className="flex justify-center items-center">
          <p className="text-gray-600">Balance:</p>
          <p className="text-xl font-bold">₹2000</p>
        </div>
      </div>
    </div>
  )
}

export default Wallet