import { axiosInstance } from "../../api/axiosinstance";
import {useState ,useEffect} from "react"
import VendorCard from "./VendorCard";
import {
    Typography,
  } from "@material-tailwind/react";

interface Vendors {
    _id: string;
    name: string;
    email: string;
    phone: string;
    city:string;
    isActive: boolean;
    totalBooking:number;
  }


const VendorList=()=> {

    const [vendors,setVendors]=useState<Vendors[]>([])

    useEffect(()=>{
        axiosInstance
      .get('/getvendors',{withCredentials:true})
      .then((response) => {
        console.log(response.data)
        setVendors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
    },[])
    return (
        <>
        <div style={{ padding:"40px"}} className="bg-white">
        <Typography
                  variant="h4"
                  color="black"
                  className="mx-5 w-full leading-snug !text-3xl lg:max-w-xl lg:!text-3xl mb-5"
                  placeholder={undefined}
                >
                  Vendors
                </Typography>
        <div style={{ display: 'flex',flexWrap:"wrap"}}>
        {vendors.map((vendor, index) => (
        //   <Link key={index} to={`/admin/vendor?Id=${vendor._id}`} className="m-3">
          <VendorCard {...vendor} key={index}/>
        // </Link>
        ))}
         </div>
        </div>
        </>
    );
  }


  export default VendorList;



