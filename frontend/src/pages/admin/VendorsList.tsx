import VendorCard from "../../components/admin/vendorList/VendorCard"
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function VendorsList() {

  return (
    <div className="m-20">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="mb-5">
  <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-inherit">
    Vendors List
  </h3>
  <Button variant="gradient" className="rounded-full" placeholder={undefined}>
    <Link to="/admin/vendor-types">
    View Vendor Types
    </Link>
  </Button>
</div>
      <div style={{ display: 'flex'}}>
        <VendorCard />
        <VendorCard />
        <VendorCard />
      </div>
    </div>
  )
}

export default VendorsList
