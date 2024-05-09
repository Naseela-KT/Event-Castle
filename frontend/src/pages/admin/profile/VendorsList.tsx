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
     <div className="m-10">
       <div className="mb-5 flex justify-between md:flex-row flex-col gap-4">
         <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-inherit text-center">
           Vendors List
         </h3>
         <Button variant="gradient" className="rounded-full md:mx-20 w-50" color="pink" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
           <Link to={ADMIN.VENDOR_TYPES}>View Vendor Types</Link>
         </Button>
       </div>
       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {vendors.map((vendor, index) => (
           <Link key={index} to={`${ADMIN.VENDOR}?Id=${vendor._id}`}>
             <VendorCard {...vendor} />
           </Link>
         ))}
       </div>
       {vendors.length > 0 && (
             <Pagination
             currentPage={currentPage}
             totalPages={totalPages}
             handlePageChange={handlePageChange}
             isTable={false}
           />
        )}
     </div>
  );
 }
 
 export default VendorsList;
 


