import VendorAbout from "../../components/vendor/profile/VendorAbout"
import VendorCover from "../../components/vendor/profile/VendorCover"
import VendorDetails from "../../components/vendor/profile/VendorDetails"
import VendorReview from "../../components/vendor/profile/VendorReview"
import VendorTabs from "../../components/vendor/profile/VendorTabs"
import { useLocation } from 'react-router-dom';

const VendorProfilePage=()=> {
  const location=useLocation()
  const path=location.pathname
    return (
      <>
        <VendorCover/>
        <VendorDetails/>
        <VendorTabs/>
        {path=='/view-vendor'?<VendorReview/>:""}
        <VendorAbout/>

      </>
    )
  }
  
  export default VendorProfilePage
  