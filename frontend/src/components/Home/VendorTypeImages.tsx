import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/api/axiosinstance";


const VendorTypeImages = () => {
  const [vendorTypeData, setVendorTypeData] = useState([]);

  useEffect(()=>{
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
    fetchVendorTypes()
  })
  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {vendorTypeData.map(({imageUrl,type}) => (
          <>
            <div className="text-center">
              <img
                className="h-50 w-50  rounded-full object-cover object-center"
                src={imageUrl}
                alt={type}
              />
              <Typography
                variant="h6"
                color="black"
                className="mt-2 -ml-20"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {type}
              </Typography>
            </div>
          </>
        ))}
      </div>
      {vendorTypeData.length > 4 && (
        <div className="flex justify-center items-center mt-10">
          <Button
            variant="outlined"
            placeholder={undefined}
            color="pink"
            size="lg"
            className="mr-3 mt-5 text-center"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            View More Images
          </Button>
        </div>
      )}
    </div>
  );
};

export default VendorTypeImages;
