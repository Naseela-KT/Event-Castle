import {
  Button,
  Card,
  CardBody,
  Select,
  Typography,
  Option,
  CardHeader,
} from '@material-tailwind/react';
import Footer from '../layout/userLayout/footer';
import VendorTypesCarousels from '../components/Home/VendorTypesCarousels';
import {
  ArrowSmallRightIcon,
  FingerPrintIcon,
} from '@heroicons/react/24/outline';
import SubsribeCard from '../components/Home/SubsribeCard';
function Home() {
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
                className="flex"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  <Select
                    placeholder="Select vendor category"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full bg-gray text-black"
                    labelProps={{
                      className: 'text-dark-purple',
                    }}
                    menuProps={{ className: 'h-48' }}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <Option>value1</Option>
                  </Select>

                  <Select
                    placeholder="Select city"
                    className="placeholderColor-custom-gray !border-t-blue-gray-200 focus:!border-t-gray-900 w-full bg-gray"
                    labelProps={{
                      className: 'before:content-none after:content-none',
                    }}
                    menuProps={{ className: 'h-48' }}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <Option>value1</Option>
                  </Select>

                  <Button
                    className="w-full bg-black"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Find Vendors
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
      <section className="mt-10 mb-20 mx-20 items-center">
      <h1 style={{ fontFamily: 'playfair display', fontSize: '30px' }} className="text-center mb-10">
      POPULAR &nbsp;VENDOR &nbsp;TYPES
    </h1>
        <VendorTypesCarousels />
      </section>
      <section>
        <div className="mt-32 flex flex-wrap items-start mb-20 w-full h-full bg-[url('/imgs/bg-4.jpg')] bg-cover bg-center">
          <div className="mx-20 -mt-8 w-full px-4 md:w-5/12">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
              <FingerPrintIcon className="h-8 w-8 text-white " />
            </div>
            <div className="lg:mx-20 lg:my-20 mb-10 px-4 md:w-full">
              <Card
                className="shadow-lg border shadow-gray-500/10 rounded-lg"
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
                    Enterprise
                  </Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Top Notch Services
                  </Typography>
                  <Typography
                    className="font-normal text-blue-gray-500"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-30  mx-20 items-center">
      <h1 style={{ fontFamily: 'playfair display', fontSize: '30px' }} className="text-center mb-10">
      TOP &nbsp;RATED &nbsp;VENDORS
    </h1>
        <div className="flex flex-wrap items-center w-full">
          <div className="mx-auto px-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            <Card
              className="shadow-lg  shadow-gray-500/10 rounded-lg w-full"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <CardHeader
                floated={false}
                className="relative h-56"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <img
                  alt="Card Image"
                  src="https://images.unsplash.com/photo-1460364157752-926555421a7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="h-full w-full"
                />
              </CardHeader>
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
                  Enterprise
                </Typography>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-3 mt-2 font-bold"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Top Notch Services
                </Typography>
              </CardBody>
            </Card>
            <Card
              className="shadow-lg  shadow-gray-500/10 rounded-lg w-full"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <CardHeader
                floated={false}
                className="relative h-56"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <img
                  alt="Card Image"
                  src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="h-full w-full"
                />
              </CardHeader>
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
                  Enterprise
                </Typography>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-3 mt-2 font-bold"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Top Notch Services
                </Typography>
              </CardBody>
            </Card>
            <Card
              className="shadow-lg  shadow-gray-500/10 rounded-lg w-full"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <CardHeader
                floated={false}
                className="relative h-56"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <img
                  alt="Card Image"
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="h-full w-full"
                />
              </CardHeader>
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
                  Enterprise
                </Typography>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-3 mt-2 font-bold"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Top Notch Services
                </Typography>
              </CardBody>
            </Card>
            <Card
              className="shadow-lg  shadow-gray-500/10 rounded-lg w-full"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <CardHeader
                floated={false}
                className="relative h-56"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <img
                  alt="Card Image"
                  src="https://images.unsplash.com/photo-1485178075098-49f78b4b43b4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="h-full w-full"
                />
              </CardHeader>
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
                  Enterprise
                </Typography>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-3 mt-2 font-bold"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Top Notch Services
                </Typography>
              </CardBody>
            </Card>
            <Card
              className="shadow-lg shadow-gray-500/10 rounded-lg w-full"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <CardHeader
                floated={false}
                className="relative h-56"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <img
                  alt="Card Image"
                  src="https://images.unsplash.com/photo-1515715709530-858f7bfa1b10?q=80&w=1806&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="h-full w-full"
                />
              </CardHeader>
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
                  Enterprise
                </Typography>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-3 mt-2 font-bold"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Top Notch Services
                </Typography>
              </CardBody>
            </Card>
            <Card
              className="shadow-lg shadow-gray-500/10 rounded-lg w-full"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <CardHeader
                floated={false}
                className="relative h-56"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <img
                  alt="Card Image"
                  src="https://images.unsplash.com/photo-1600547224355-10c6482872ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="h-full w-full"
                />
              </CardHeader>
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
                  Enterprise
                </Typography>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-3 mt-2 font-bold"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Top Notch Services
                </Typography>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
      <div className="flex items-end justify-end mr-25 mt-10">
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
      </div>

      <section className="mt-12 md:mt-20">
  <div className="flex flex-wrap items-start justify-center w-full h-80 bg-[url('/imgs/bg-5.jpg')] bg-cover bg-center md:px-5">
    {/* Content goes here */}
  </div>
</section>

<section className="-mt-20 mb-20 mx-4 md:mx-30 md:-mt-40">
  <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl">
    <h1 style={{ fontFamily: 'playfair display', fontSize: '30px' }} className="mt-10 text-center">
      ABOUT &nbsp;OUR &nbsp;PLANNING &nbsp;PROCESS
    </h1>
    <div className="flex flex-wrap justify-center m-10 gap-8">
      <div className="w-full md:w-1/4">
        <h2 style={{ fontFamily: 'playfair display', fontSize: '20px' }} className="text-center mb-4 text-brown">Find</h2>
        <p style={{ fontSize: '14px' }}>
          Discover a variety of vendors tailored to your event needs, with options ranging from photographers to decorators. Filter your search based on criteria like location, budget, and service type
        </p>
      </div>
      <div className="w-full md:w-1/4">
        <h2 style={{ fontFamily: 'playfair display', fontSize: '20px' }} className="text-center mb-4 text-brown">Connect</h2>
        <p style={{ fontSize: '14px' }}>
          Initiate communication with selected vendors through the platform. Send messages, inquire about availability, and discuss details such as pricing and services offered.
        </p>
      </div>
      <div className="w-full md:w-1/4">
        <h2 style={{ fontFamily: 'playfair display', fontSize: '20px' }} className="text-center mb-4 text-brown">Plan</h2>
        <p style={{ fontSize: '14px' }}>
          Streamline your event planning process by managing vendor bookings, organizing timelines, and tracking budgets. Access tools and resources to stay on track and create memorable events with ease.
        </p>
      </div>
    </div>
  </div>
</section>
<section className='mt-40'>
<SubsribeCard />
</section>

    
<div className="bg-white">
         <Footer />
       </div>
    </>
  );
}

export default Home;
