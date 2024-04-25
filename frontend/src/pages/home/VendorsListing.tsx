import { Card, CardBody, Typography } from '@material-tailwind/react';
import VendorFilters from '../../components/home/Vendors/VendorFilters';
import VendorSort from '../../components/home/Vendors/VendorSort';
import VendorCard from '../../components/home/Vendors/VendorCard';
import Footer from '../../layout/user/footer';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/api/axiosinstance';
import Pagination from '../../components/common/Pagination';
import { VendorData } from '../../types/vendorTypes';

const VendorsListing = () => {
  const [vendors, setVendors] = useState<VendorData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [vendorTypeData, setVendorTypeData] = useState([]);
  

  useEffect(() => {
    fetchVendors(currentPage);
    fetchVendorTypes();
  }, [currentPage]);


  useEffect(() => {
    fetchVendors(currentPage);
  }, [currentPage]);

  const fetchVendors = async (page: number) => {
    try {
      const response = await axiosInstance.get(`/getvendors?page=${page}`, {
        withCredentials: true,
      });
      
      console.log(response.data.vendorData)
      setVendors(response.data.vendorData);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const fetchVendorTypes = async () => {
    try {
      const response = await axiosInstance.get('/vendor-types', { withCredentials: true });
      setVendorTypeData(response.data);
    } catch (error) {
      console.error('Error fetching vendor types:', error);
    }
   }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
 
  



  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-start pt-16 pb-20 m-0">
        <div className="absolute top-0 h-100 w-full bg-[url('/imgs/bg-3.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-100 w-full bg-black/30 bg-cover bg-center" />
        <Card
          className="mt-6 m-6 lg:justify-start"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Find Vendor
            </Typography>
            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              "Discover the perfect vendors for your perfect day. Start your
              search now!"
            </Typography>
          </CardBody>
        </Card>
      </div>
      <section className="mx-20 -mt-15 mb-20">
        <div className="flex justify-end gap-6 md:flex-row flex-col mb-10 mr-5">
          <div>
            <h3>Found {vendors.length} Vendors</h3>
          </div>

          <div className="relative flex w-full gap-2 md:w-max">
          <input
              type="text"
              name="search"
              placeholder="Search vendors..."
          
              className="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <h3>Sort By:</h3>
          <div>
            <VendorSort/>
          </div>
        </div>
        <div className="flex md:flex-row flex-col">
          <div>
            <h3 className="-mt-10 mb-5">Filter By</h3>
            <VendorFilters vendorTypeData={vendorTypeData}/>
          </div>
         
          <div className="md:ml-15 mx-5 flex md:flex-row flex-col gap-4">
            {vendors.map((vendor, index) => (
              <VendorCard {...vendor} key={index} />
            ))}
          </div>
        </div>
      </section>
      {/* pagination */}
      {vendors.length > 0 && (
         <Pagination
         currentPage={currentPage}
         totalPages={totalPages}
         handlePageChange={handlePageChange}
         isTable={false}
       />
      )}
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
};

export default VendorsListing;
