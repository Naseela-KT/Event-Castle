import VendorAbout from "../../components/vendor/profile/VendorAbout"
import VendorCover from "../../components/vendor/profile/VendorCover"
import VendorDetails from "../../components/vendor/profile/VendorDetails"
import VendorTabs from "../../components/vendor/profile/VendorTabs"

const VendorProfilePage=()=> {
    return (
      <>
        <VendorCover/>
        <VendorDetails/>
        <VendorTabs/>
        <VendorAbout/>
      </>
    )
  }
  
  export default VendorProfilePage
  