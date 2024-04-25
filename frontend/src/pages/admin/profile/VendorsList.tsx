import VendorCard from "../../../components/admin/vendorList/VendorCard"
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstanceAdmin} from "../../../config/api/axiosinstance";
import Pagination from "../../../components/common/Pagination";
import { ADMIN } from "../../../config/constants/constants";
import { VendorData } from "../../../types/vendorTypes";



// VendorCard component remains unchanged

function VendorsList() {
  const [vendors, setVendors] = useState<VendorData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchVendors(currentPage);
  }, [currentPage]);

  const fetchVendors = async (page: number) => {
    try {
      const response = await axiosInstanceAdmin.get(`/getvendors?page=${page}`, {
        withCredentials: true,
      });
      setVendors(response.data.vendorData);
      const totalPagesFromResponse = response.data.totalPages;
      setTotalPages(totalPagesFromResponse);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };
 
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
 
  return (
     <div className="m-20">
       <div className="mb-5 flex justify-between">
         <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-inherit">
           Vendors List
         </h3>
         <Button variant="gradient" className="rounded-full"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
           <Link to={ADMIN.VENDOR_TYPES}>View Vendor Types</Link>
         </Button>
       </div>
       <div className="flex flex-wrap  gap-4">
         {vendors.map((vendor, index) => (
           <Link key={index} to={`${ADMIN.VENDOR}?Id=${vendor._id}`} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
             <VendorCard {...vendor} />
           </Link>
         ))}
       </div>
       {vendors.length > 0 && (
             <Pagination
             currentPage={currentPage}
             totalPages={totalPages}
             handlePageChange={handlePageChange}
             isTable={true}
           />
        )}
     </div>
  );
 }
 
 export default VendorsList;
 


