import { useSelector } from "react-redux";
import { axiosInstance } from "../../../api/axiosinstance";
import UserRootState from "../../../redux/rootstate/UserState";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function Favourites() {
  const [favourites,setFavourites]=useState([]);
  const user = useSelector((state: UserRootState) => state.user.userdata);
  useEffect(() => {
    axiosInstance
    .get(`/get-favorite-vendor?userid=${user?._id}`,{withCredentials:true})
    .then((response) => {
      console.log(response);
      setFavourites(response.data.data)
    })
    .catch((error) => {
      // localStorage.removeItem("userToken");
      toast.error(error.response.data.message)
      console.log("here", error);
    });
  }, [])




   
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 m-20">
        {favourites.map(({ coverpicUrl,name }, index) => (
          <div key={index}>
            <img
              className="h-40 w-full max-w-full rounded-lg object-cover object-center"
              src={coverpicUrl}
              alt={name}
            />
          </div>
        ))}
      </div>
    );
  }
   