import {
  Button,
  Card,
  CardBody,
  Typography,
  CardHeader,
  Input,
} from "@material-tailwind/react";
import Footer from "../../layout/user/footer";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import SubsribeCard from "../../components/home/SubsribeCard";
import LiveEvents from "../../components/home/LiveEvents";
import { Link } from "react-router-dom";
import { USER } from "../../config/constants/constants";
import { VendorData } from "../../types/vendorTypes";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/api/axiosinstance";


function Home() {
  const [vendors, setVendors] = useState<VendorData[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axiosInstance.get(
        `/getvendors?page=${""}&search=${""}&category=${""}&location=${""}&sort=${""}`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data.vendorData);
      setVendors(response.data.vendorData);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

 

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32 m-0">
        <div className="absolute top-0 h-full w-full bg-[url('/imgs/bg-3.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black text-4xl lg:text-5xl" // Adjust font size for different screen sizes
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Craft Unforgettable Moments: Your Event Starts Here
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="opacity-80 text-sm lg:text-2xl"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Every event is a blank canvas waiting for your imagination to
                paint the perfect picture. Let's create memories that last a
                lifetime.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-20 bg-white px-4 pb-20 pt-4">
  <div className="container mx-auto">
    <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1 lg:mx-30">
      <Card
        className="mt-6 w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardBody
          className="flex flex-col lg:flex-row justify-between items-center"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex flex-col lg:flex-row w-full lg:space-x-4">
            {/* Input field covers 100% in small screens and 80% in large screens */}
            <div className="w-full lg:w-4/5">
              <Input
                label="Search"
                size="lg"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>

            {/* "Find Vendors" button covers 100% in small screens and 20% in large screens */}
            <div className="w-full lg:w-1/5 mt-4 lg:mt-0">
              <Link
                to={
                  search?.length > 0
                    ? `${USER.VENDORS}?search=${search}`
                    : `${USER.VENDORS}`
                }
              >
                <Button
                  className="w-full bg-black"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Find Vendors
                </Button>
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  </div>
</section>


      <LiveEvents />

      {/* <section className="mt-10 mb-20 mx-20 items-center">
        <h1
          style={{ fontFamily: "playfair display", fontSize: "30px" }}
          className="text-center mb-10"
        >
          POPULAR &nbsp;VENDOR &nbsp;TYPES
        </h1>
        <VendorTypesCarousels />
      </section> */}
     <section>
  <div className="flex flex-wrap items-start w-full h-full bg-[url('/imgs/bg-4.jpg')] bg-cover bg-center mt-32 mb-20">
    {/* This div is centered for smaller screens and remains at the same location for larger screens */}
    <div className="w-full md:w-5/12 px-4 md:px-20 lg:px-20 md:mt-8 lg:mt-0 p-20">
      <div className="flex justify-center">
        {/* Ensure the card is centered on smaller screens */}
        <div className="w-full md:w-auto lg:w-auto">
          <Card
            className="shadow-lg border shadow-gray-500/10 rounded-lg mx-auto lg:mx-0"
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
                variant="small"
                color="blue-gray"
                className="font-normal"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Events
              </Typography>
              <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mb-3 mt-2 font-bold"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}  onPointerLeaveCapture={undefined}              >
                Professional Event Planning
              </Typography>
              <Typography
                className="font-normal text-blue-gray-500"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Experience the convenience of personalized service, tailored to meet your company's unique needs. Our experts handle everything from venue selection to logistics, so you can focus on your business.
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="mt-30  mx-20 items-center">
        <h1
          style={{ fontFamily: "playfair display", fontSize: "30px" }}
          className="text-center mb-10"
        >
          TOP &nbsp;RATED &nbsp;VENDORS
        </h1>
        <div className="flex flex-wrap items-center w-full">
          <div className="mx-auto md:m-20 px-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {vendors?.map((vendor, index) => (
              <Card
                key={index}
                className="shadow-lg  shadow-gray-500/10 rounded-lg w-full"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Link to={`${USER.VIEW_VENDOR}?id=${vendor?._id}`}>
                  <CardHeader
                    floated={false}
                    className="relative h-56"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <img
                      alt="Card Image"
                      src={vendor.coverpicUrl}
                      className="h-full w-full"
                    />
                  </CardHeader>
                </Link>
                <CardBody
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {vendor.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {vendor.city}
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <div className="flex items-end justify-end mr-25 mt-10">
        <Link to={USER.VENDORS}>
          <Button
            variant="text"
            size="lg"
            color="gray"
            className="flex items-end bg-gray justify-end gap-2 mb-10 mt-4"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <ArrowSmallRightIcon className="h-5 w-5 font-bold text-gray-900" />
            VIEW MORE
          </Button>
        </Link>
      </div>

      <section className="mt-12 md:mt-20">
        <div className="flex flex-wrap items-start justify-center w-full h-80 bg-[url('/imgs/bg-5.jpg')] bg-cover bg-center md:px-5">
          {/* Content goes here */}
        </div>
      </section>

      <section className="-mt-20 mb-20 mx-4 md:mx-30 md:-mt-40">
        <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl">
          <h1
            style={{ fontFamily: "playfair display", fontSize: "30px" }}
            className="mt-10 text-center sm:p-4"
          >
            ABOUT &nbsp;OUR &nbsp;PLANNING &nbsp;PROCESS
          </h1>
          <div className="flex flex-wrap justify-center m-10 gap-8">
            <div className="w-full md:w-1/4">
              <h2
                style={{ fontFamily: "playfair display", fontSize: "20px" }}
                className="text-center mb-4 text-brown"
              >
                Find
              </h2>
              <p style={{ fontSize: "14px" }}>
                Discover a variety of vendors tailored to your event needs, with
                options ranging from photographers to decorators. Filter your
                search based on criteria like location, budget, and service type
              </p>
            </div>
            <div className="w-full md:w-1/4">
              <h2
                style={{ fontFamily: "playfair display", fontSize: "20px" }}
                className="text-center mb-4 text-brown"
              >
                Connect
              </h2>
              <p style={{ fontSize: "14px" }}>
                Initiate communication with selected vendors through the
                platform. Send messages, inquire about availability, and discuss
                details such as pricing and services offered.
              </p>
            </div>
            <div className="w-full md:w-1/4">
              <h2
                style={{ fontFamily: "playfair display", fontSize: "20px" }}
                className="text-center mb-4 text-brown"
              >
                Plan
              </h2>
              <p style={{ fontSize: "14px" }}>
                Streamline your event planning process by managing vendor
                bookings, organizing timelines, and tracking budgets. Access
                tools and resources to stay on track and create memorable events
                with ease.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-40">
        <SubsribeCard />
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
