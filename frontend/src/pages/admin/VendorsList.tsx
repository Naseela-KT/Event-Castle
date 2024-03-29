import VendorCard from "../../components/admin/vendorList/VendorCard"
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstanceAdmin} from "../../api/axiosinstance";

interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: number;
  city:string;
  password:string;
  isActive: boolean;
  isVerified:boolean;
  verificationRequest:boolean;
  totalBooking:number;
  coverpicUrl:string;
  logoUrl:string;
}

// VendorCard component remains unchanged

function VendorsList() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
 
  useEffect(() => {
     axiosInstanceAdmin
       .get("/getvendors", { withCredentials: true })
       .then((response) => {
         console.log(response);
         setVendors(response.data);
       })
       .catch((error) => {
         console.log("here", error);
       });
  }, []);
 
  return (
     <div className="m-20">
       <div className="mb-5 flex justify-between">
         <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-inherit">
           Vendors List
         </h3>
         <Button variant="gradient" className="rounded-full"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
           <Link to="/admin/vendor-types">View Vendor Types</Link>
         </Button>
       </div>
       <div className="flex flex-wrap justify-center gap-4">
         {vendors.map((vendor, index) => (
           <Link key={index} to={`/admin/vendor?Id=${vendor._id}`} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
             <VendorCard {...vendor} />
           </Link>
         ))}
       </div>
     </div>
  );
 }
 
 export default VendorsList;
 


