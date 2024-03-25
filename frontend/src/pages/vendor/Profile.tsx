import { useEffect, useState } from "react"
import VendorAbout from "../../components/vendor/profile/VendorAbout"
import VendorCover from "../../components/vendor/profile/VendorCover"
import VendorDetails from "../../components/vendor/profile/VendorDetails"
import VendorReview from "../../components/vendor/profile/VendorReview"
import VendorTabs from "../../components/vendor/profile/VendorTabs"
import { useLocation} from 'react-router-dom';
import { axiosInstance, axiosInstanceVendor } from "../../api/axiosinstance"
import { useSelector } from "react-redux"
import VendorRootState from "../../redux/rootstate/VendorState"


interface Review {
  username: string;
  rating: number;
  content: string;
  // Add any other properties of a review here
}

interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city:string;
  isActive: boolean;
  totalBooking:number;
  coverpic:string;
  logo:string;
  reviews: Review[] | undefined;
  logoUrl:string;
  coverpicUrl:string
}

const VendorProfilePage=()=> {
  const vendorData = useSelector(
    (state: VendorRootState) => state.vendor.vendordata
  );
  const location=useLocation()
  const path=location.pathname
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [vendor,setVendor]=useState<Vendor>()

  useEffect(() => {
      if(id){
        axiosInstance.get(`/getvendor?vendorid=${id}`,{withCredentials:true}).then((response) => {
          setVendor(response.data.data);
          console.log(response.data)
        }).catch((error) => {
          console.log("here", error);
        });
      }else{
        axiosInstanceVendor.get(`/getvendor?vendorid=${vendorData?._id}`,{withCredentials:true}).then((response) => {
          setVendor(response.data.data);
          console.log(response.data)
        }).catch((error) => {
          console.log("here", error);
        });
      }
 
  }, [id, vendorData]);
  

    return (
      <>
        <VendorCover logo={vendor?.logoUrl} coverpic={vendor?.coverpicUrl}/>
        <VendorDetails name={vendor?.name} city={vendor?.city} id={vendor?._id}/>
        <VendorTabs reviews={vendor?.reviews}/>
        {path=='/view-vendor'?<VendorReview id={vendor?._id}/>:""}
        <VendorAbout/>
      </>
    )
  }
  
  export default VendorProfilePage


  