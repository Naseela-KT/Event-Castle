import { useEffect, useState } from "react";
import { axiosInstanceVendor } from "../../../api/axiosinstance";
import { useSelector } from "react-redux";
import VendorRootState from "../../../redux/rootstate/VendorState";

export default function VendorPosts() {

  const vendor = useSelector(
    (state: VendorRootState) => state.vendor.vendordata
  );

  const [posts,setPosts]=useState<[]>()

  useEffect(()=>{
    axiosInstanceVendor.get(`/posts?vendorid=${vendor?._id}`).then((response) => {
      console.log(response)
      setPosts(response.data)
    })
    .catch((error) => {
      console.log("here", error);
    });
  },[])
   
   
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {posts?.map(({ imageUrl }, index) => (
          <div key={index}>
            <img
              className="h-40 w-full max-w-full rounded-lg object-cover object-center"
              src={imageUrl}
              alt="gallery-photo"
            />
          </div>
        ))}
      </div>
    );
  }
   