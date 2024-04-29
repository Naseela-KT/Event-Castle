import { Card, CardBody, Typography } from "@material-tailwind/react";
import VendorFilters from "../../components/home/Vendors/VendorFilters";
import VendorSort from "../../components/home/Vendors/VendorSort";
import VendorCard from "../../components/home/Vendors/VendorCard";
import Footer from "../../layout/user/footer";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/api/axiosinstance";
import { VendorData } from "../../types/vendorTypes";
import { USER } from "../../config/constants/constants";
import { useNavigate } from "react-router-dom";

const VendorsListing = () => {
  const [vendors, setVendors] = useState<VendorData[]>([]);
  const [vendorTypeData, setVendorTypeData] = useState([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>();
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string[]>([]);
  const [selectLocation, setSelectLocation] = useState<string[]>([]);
  const [sort,setSort]=useState<number>();
  const navigate = useNavigate();


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get("search");
    const pageParam = queryParams.get("page");
    setPage(pageParam ? parseInt(pageParam, 10) : 1);
    fetchVendors();
    fetchVendorTypes();
    if (searchParam) {
      setSearch(searchParam); // Update search state if a search parameter is found
    }
  }, [search]);

  useEffect(() => {
    fetchVendors();
  }, [category,search,selectLocation,sort]);

  useEffect(() => {
    axiosInstance
      .get(`/get-locations`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.locations);
        setLocations(res.data.locations);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axiosInstance.get(
        `/getvendors?search=${search}&page=${page}&category=${category.join(",")}&location=${selectLocation.join(",")}&sort=${sort}`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data.vendorData);
      setVendors(response.data.vendorData);
      setTotalPages(() => {
        return Math.ceil(response.data.totalUsers / 6);
      });
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const fetchVendorTypes = async () => {
    try {
      const response = await axiosInstance.get("/vendor-types", {
        withCredentials: true,
      });
      setVendorTypeData(response.data);
    } catch (error) {
      console.error("Error fetching vendor types:", error);
    }
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              // onKeyUp={handleSearch}
              placeholder="Search vendors..."
              className="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <h3>Sort By:</h3>
          <div>
            <VendorSort setSort={setSort}/>
          </div>
        </div>
        <div className="flex md:flex-row flex-col">
          <div>
            <h3 className="-mt-10 mb-5">Filter By</h3>
            <VendorFilters
              vendorTypeData={vendorTypeData}
              locations={locations}
              setSelectLocation={setSelectLocation}
              setCategory={setCategory}
            />
          </div>

          <div className="md:ml-15 mx-5 flex md:flex-row flex-col gap-4">
            {vendors.map((vendor, index) => (
              <VendorCard {...vendor} key={index} />
            ))}
          </div>
        </div>
      </section>
      {/* pagination */}
      {/* {vendors.length > 0 && (
         <Pagination
         currentPage={currentPage}
         totalPages={totalPages}
         handlePageChange={handlePageChange}
         isTable={false}
       />
      )} */}
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
};

export default VendorsListing;
