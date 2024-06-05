import { Typography } from "@material-tailwind/react";
import Footer from "../../layout/user/footer";
import { USER } from "../../config/constants/constants";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-start lg:pt-16 pt-6 pb-20 mb-0">
        <div className="absolute top-0 h-100 w-full bg-[url('/imgs/about/banner.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-100 w-full bg-black/40 bg-cover bg-center" />
        <div className="mt-4 lg:ml-20 ml-10 lg:justify-start z-10">
          <Typography
            variant="h2"
            color="white"
            style={{ fontFamily: "playfair display", fontSize: "40px" }}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Who we are?
          </Typography>
        </div>
      </div>
      {/* Section 2 */}
      <div className="flex flex-wrap items-center mb-20 mx-10 lg:-mt-10 md:-mt-20 -mt-40">
        <div className="mx-auto  w-full px-4 md:w-5/12">
          <Typography
            variant="h2"
            className="mb-4 font-bold lg:mt-0 mt-10"
            color="blue-gray"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            style={{ fontFamily: "playfair display", fontSize: "30px" }}
          >
            Event Castle
          </Typography>
          <Typography
            className="font-normal text-blue-gray-500"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Welcome to Event Castle, the premier platform designed to make your
            event planning experience seamless and stress-free. Whether you're
            organizing a wedding, corporate event, birthday party, or any
            special occasion, Event Castle connects you with top-notch vendors
            tailored to your needs
            <br />
            <br />
            Our user-friendly interface and comprehensive search options make it
            easy for clients to find and choose the best services for their
            events. With Event Castle, planning and executing memorable events
            has never been easier, ensuring a delightful experience for all
            involved.
          </Typography>
        </div>
        <div className="mx-auto mt-24 flex justify-center px-4 md:w-5/12 w-12/12 lg:mt-0">
          <div className="grid grid-cols-4 gap-4 md:grid-cols-4">
            <div className="grid gap-4">
              <div className="overflow-hidden group">
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                  src="/imgs/about/ev-1.jpg"
                  alt="gallery-photo"
                />
              </div>
              <div className="overflow-hidden group">
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                  src="/imgs/about/ev-2.jpg"
                  alt="gallery-photo"
                />
              </div>
              <div className="overflow-hidden group">
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                  src="https://images.unsplash.com/photo-1541314053190-1db8c88dc05a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="gallery-photo"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="overflow-hidden group">
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                  src="/imgs/about/ev-4.jpg"
                  alt="gallery-photo"
                />
              </div>
              <div className="overflow-hidden group">
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                  src="/imgs/about/ev-5.jpg"
                  alt="gallery-photo"
                />
              </div>
              <div className="overflow-hidden group">
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                  src="/imgs/about/ev-6.jpg"
                  alt="gallery-photo"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="overflow-hidden group">
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                  src="/imgs/about/ev-7.jpg"
                  alt="gallery-photo"
                />
              </div>
              <div className="overflow-hidden group">
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                  src="/imgs/about/ev-8.jpg"
                  alt="gallery-photo"
                />
              </div>
              <div className="overflow-hidden group">
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                  src="/imgs/about/ev-9.jpg"
                  alt="gallery-photo"
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="overflow-hidden group">
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                  src="/imgs/about/ev-10.jpg"
                  alt="gallery-photo"
                />
              </div>
              <div className="overflow-hidden group">
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                  src="/imgs/about/ev-11.jpg"
                  alt="gallery-photo"
                />
              </div>
              <div className="overflow-hidden group">
                <img
                  className="h-auto max-w-full rounded-lg object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                  src="/imgs/about/ev-12.jpg"
                  alt="gallery-photo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section3 */}
      <div className="flex flex-wrap items-center mx-10 my-40">
        <div className="mx-auto mt-24 lg:flex hidden w-full justify-center px-4 md:w-5/12 lg:mt-0">
          <img
            alt="Card Image"
            src="https://images.unsplash.com/photo-1550237324-d4e2f5009488?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-full w-full"
          />
        </div>
        <div className="mx-auto lg:-mt-8 -mt-15 w-full px-4 md:w-5/12">
          <Typography
            variant="h3"
            className="mb-3 font-bold"
            color="blue-gray"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            style={{ fontFamily: "playfair display", fontSize: "30px" }}
          >
            Our Aim
          </Typography>
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <span className="h-2 w-2 bg-pink-500 rounded-full mr-2"></span>
              <Typography
                className="font-normal text-blue-gray-500"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Simplify the event planning process for users
              </Typography>
            </div>
            <div className="flex items-center mb-1">
              <span className="h-2 w-2 bg-pink-500 rounded-full mr-2"></span>
              <Typography
                className="font-normal text-blue-gray-500"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Create opportunities for users and vendors to connect and
                collaborate.
              </Typography>
            </div>
            <div className="flex items-center mb-1">
              <span className="h-2 w-2 bg-pink-500 rounded-full mr-2"></span>
              <Typography
                className="font-normal text-blue-gray-500"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Provide a wide selection of vendors and services for
                customizable events.
              </Typography>
            </div>
            <div className="flex items-center mb-1">
              <span className="h-2 w-2 bg-pink-500 rounded-full mr-2"></span>
              <Typography
                className="font-normal text-blue-gray-500"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Help vendors grow their businesses by showcasing their services
                effectively.
              </Typography>
            </div>
            <div className="flex items-center mb-1">
              <span className="h-2 w-2 bg-pink-500 rounded-full mr-2"></span>
              <Typography
                className="font-normal text-blue-gray-500"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Maintain high standards of quality and reliability for all
                services offered on the platform.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      {/* Section4 */}
      <section className="lg:my-20 -mt-20">
        <div className="lg:text-center lg:mb-8 mb-4 ml-20">
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "playfair display", fontSize: "30px" }}
          >
            Process
          </h2>
        </div>
        <div className="flex flex-wrap justify-center md:mx-18 mx-10 lg:mx-0">
          <div className="w-full md:w-1/2 lg:w-1/4 p-4 cursor-pointer">
            <div className="rounded-lg shadow-md p-6 flex items-center bg-[#fce9f1] transform transition-transform duration-300 hover:scale-105">
              <div className="bg-[#ffd3e5] rounded-full h-12 w-16 flex items-center justify-center mr-4">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Find
                </h3>
                <p className="text-gray-600">
                  Find vendors for your event needs
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4 cursor-pointer">
            <div className="bg-[#fce9f1] rounded-lg shadow-md p-6 flex items-center transform transition-transform duration-300 hover:scale-105">
              <div className="bg-[#ffd3e5] rounded-full h-12 w-18 flex items-center justify-center mr-4">
                <i className="fa-solid fa-handshake-simple"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Connect
                </h3>
                <p className="text-gray-600">
                  Contact vendors through the platform
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4 cursor-pointer">
            <div className="bg-[#fce9f1] rounded-lg shadow-md p-6 flex items-center transform transition-transform duration-300 hover:scale-105">
              <div className="bg-[#ffd3e5] rounded-full h-12 w-14 flex items-center justify-center mr-4">
                <i className="fa-solid fa-pen-to-square"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Plan
                </h3>
                <p className="text-gray-600">Simplify your event planning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lg:my-40 my-20">
      <div className="relative h-100 w-full" style={{ backgroundImage: "url('/imgs/about/ready-img.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative flex items-center justify-end h-full w-full p-8">
            <div className="bg-white bg-opacity-70 p-8 rounded-lg max-w-lg">
              <h2
                className="lg:text-3xl text-xl font-bold mb-4"
                style={{ fontFamily: "playfair display", fontSize: "30px" }}
              >
                Are you ready?
              </h2>
              <Typography
                className="font-normal text-blue-gray-600 mb-4"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Sure, here's another simplified version: --- Experience
                extraordinary events with ease. Our platform helps you create
                unforgettable moments, guiding you every step of the way. Ready
                to make something special? Use our tools and expertise to plan
                your event seamlessly.
              </Typography>
              <Link to={USER.VENDORS}>
                <button className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-700">
                  Explore
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
