import { Card, CardBody, Typography } from '@material-tailwind/react';
import VendorFilters from '../components/Home/Vendors/VendorFilters';
import VendorSearch from '../components/Home/Vendors/VendorSearch';
import VendorSort from '../components/Home/Vendors/VendorSort';
import VendorCard from '../components/Home/Vendors/VendorCard';
import Footer from '../layout/userLayout/footer';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axiosinstance';
import Pagination from '../components/common/Pagination';

interface Vendors {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  isActive: boolean;
  totalBooking: number;
  coverpicUrl: string;
}

const VendorsListing = () => {
  const [vendors, setVendors] = useState<Vendors[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchVendors(currentPage);
  }, [currentPage]);

  const fetchVendors = async (page: number) => {
    try {
      const response = await axiosInstance.get(`/getvendors?page=${page}`, {
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
            <h3>Found 11 Vendors</h3>
          </div>

          <div className="relative flex w-full gap-2 md:w-max">
            <VendorSearch />
          </div>
          <h3>Sort By:</h3>
          <div>
            <VendorSort />
          </div>
        </div>
        <div className="flex md:flex-row flex-col">
          <div>
            <h3 className="-mt-10 mb-5">Filter By</h3>
            <VendorFilters />
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
