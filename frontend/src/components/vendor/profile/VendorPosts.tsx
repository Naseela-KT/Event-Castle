import { useEffect, useState } from "react";
import { axiosInstanceVendor } from "../../../api/axiosinstance";
import { useSelector } from "react-redux";
import VendorRootState from "../../../redux/rootstate/VendorState";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function VendorPosts() {

  const vendor = useSelector(
    (state: VendorRootState) => state.vendor.vendordata
  );

  const [posts,setPosts]=useState<[]>()
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const navigate=useNavigate()

  useEffect(()=>{
    axiosInstanceVendor.get(`/posts?vendorid=${vendor?._id}`).then((response) => {
      console.log(response)
      setPosts(response.data)
    })
    .catch((error) => {
      console.log("here", error);
    });
  },[fetchTrigger])

  const handleDelete = (postId:string) => {
    axiosInstanceVendor
    .delete(`/posts/${postId}`)
    .then((response) => {
      console.log(response);
      toast.success(response.data.message)
      setFetchTrigger(!fetchTrigger);
      navigate("/Vendor/profile");
    })
    .catch((error) => {
      toast.error(error.response.data.message)
      console.log("here", error);
    });
 };
   
   
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {posts?.map(({ imageUrl, _id }, index) => (
        <div key={index} className="relative">
          <img
            className="h-40 w-full max-w-full rounded-lg object-cover object-center"
            src={imageUrl}
            alt="gallery-photo"
          />
          <button
            onClick={() => handleDelete(_id)}
            className="absolute top-0 right-0 m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </div>
    );
  }
   