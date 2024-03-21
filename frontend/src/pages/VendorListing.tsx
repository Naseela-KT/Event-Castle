import { useEffect, useState } from "react"
import VendorListingCard from "../components/Home/VendorListingCard"
import { axiosInstance } from "../api/axiosinstance";


interface Vendors {
    _id: string;
    name: string;
    email: string;
    phone: string;
    city:string;
    isActive: boolean;
    totalBooking:number;
  }

function VendorListing() {

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
    <div className="m-10 flex flex-row flex-wrap gap-4">
         {vendors.map((vendor, index) => (
            <VendorListingCard {...vendor} key={index}/>
        ))}    </div>
  )
}

export default VendorListing
