import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { axiosInstanceAdmin } from "../../../api/axiosinstance";
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";

interface Vendor {
    _id: string;
    name: string;
    email: string;
    phone: string;
    city:string;
    isActive: boolean;
    totalBooking:number;
  }

const VendorProfile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Id = queryParams.get('Id');
    const [vendor,setVendor]=useState<Vendor>()

    useEffect(()=>{
        axiosInstanceAdmin
      .get(`/getvendor?Id=${Id}`,{withCredentials:true})
      .then((response) => {
        console.log(response.data.data)
        setVendor(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
    },[vendor])

    const handleBlock = () => {
      axiosInstanceAdmin
        .patch(`/vendorblock-unblock?VendorId=${Id}`)
        .then((response) => {
          console.log(response);
          toast.success(response.data.message);
         
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    };


  return (
    <div className="w-85 m-10">
      <Card
        className="mt-6"
        placeholder={undefined}
        style={{
          backgroundColor: "#E7E3E0",
          backgroundImage: `url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80")`,
        }}
      >
        <CardBody placeholder={undefined} className="h-40" children={undefined}>
          {/* <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="ui/ux review check"
        /> */}
        </CardBody>
      </Card>
      <Card className="" placeholder={undefined}>
        <CardHeader
          color="gray"
          className="mb-4 grid h-28 place-items-center w-40"
          placeholder={undefined}
        >
          Logo
          {/* <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="ui/ux review check"
        /> */}
        </CardHeader>

        <CardBody className="flex flex-col gap-4" placeholder={undefined}>
          <Typography
            variant="h4"
            style={{ marginTop: "-90px", marginLeft: "170px" }}
            color="blue-gray"
            placeholder={undefined}
          >
            {vendor?.name}
          </Typography>
          <div
            className="mt-5"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap:"wrap",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-2"
                placeholder={undefined}
              >
                VENDOR-TYPE
              </Typography>
              <Typography
                textGradient
                color="blue-gray"
                className="mb-2"
                placeholder={undefined}
              >
                 {vendor?.name}
              </Typography>
            </div>
            <div>
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-2"
                placeholder={undefined}
              >
                CITY
              </Typography>
              <Typography
                textGradient
                color="blue-gray"
                className="mb-2"
                placeholder={undefined}
              >
                {vendor?.city}
              </Typography>
            </div>
            <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2"
              //   textGradient
              placeholder={undefined}
            >
              TOTAL WORKS
            </Typography>
            <Typography
                textGradient
                color="blue-gray"
                className="mb-2"
                placeholder={undefined}
              >
                 {vendor?.totalBooking}
              </Typography>
            </div>
            <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2"
              //   textGradient
              placeholder={undefined}
            >
              CONTACTS
            </Typography>
            <Typography
                textGradient
                color="blue-gray"
                className="mb-2"
                placeholder={undefined}
              >
                +91{vendor?.phone}
              </Typography>
            </div>
          </div>
          <div className="m-0">
          {vendor?.isActive ? (
            <Button variant="gradient" onClick={() => handleBlock()} size="sm" color="red" className="hidden lg:inline-block" placeholder={undefined}>
              <span>Block Vendor</span>
            </Button>
          ) : (
            <Button variant="gradient" onClick={() => handleBlock()} size="sm" className="hidden lg:inline-block" placeholder={undefined}>
              <span>Unblock vendor</span>
            </Button>
          )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default VendorProfile;
