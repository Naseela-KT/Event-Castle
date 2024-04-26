import { Carousel} from '@material-tailwind/react';

export default function VendorTypesCarousels() {
  return (
    <Carousel
          className="rounded-xl"
          color="black"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
      <div className="relative flex justify-between flex-wrap">
        <img
          className="bg-gray-400 relative md:bg-gray-400 h-50 w-20 md:w-50 rounded-full object-cover object-center"
          src=""
          alt=""
        />
        <img
          className="bg-gray-400  md:bg-gray-400 h-50 w-20 md:w-50 rounded-full object-cover object-center"
          src=""
          alt=""
        />
        <img
          className="bg-gray-400  md:bg-gray-400 h-50 w-20 md:w-50 rounded-full object-cover object-center"
          src=""
          alt=""
        />
        <img
          className="bg-gray-400  md:bg-gray-400 h-50 w-20 md:w-50 rounded-full object-cover object-center"
          src=""
          alt=""
        />
      </div>
      <div className="relative flex justify-between">
        <img
          className="bg-gray-400  md:bg-gray-400 h-50  w-20 md:w-50 rounded-full object-cover object-center"
          src=""
          alt=""
        />
       
        <img
          className="bg-gray-400  md:bg-gray-400 h-50 w-20 md:w-50 rounded-full object-cover object-center"
          src=""
          alt=""
        />
        <img
          className="bg-gray-400  md:bg-gray-400 h-50 w-20 md:w-50 rounded-full object-cover object-center"
          src=""
          alt=""
        />
        <img
          className="bg-gray-400  md:bg-gray-400 h-50 w-20 md:w-50 rounded-full object-cover object-center"
          src=""
          alt=""
        />
      </div>
    </Carousel>
  );
}
