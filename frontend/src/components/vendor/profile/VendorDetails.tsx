import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    IconButton,
  } from "@material-tailwind/react";
import { useState } from "react";
import { Link ,useLocation} from "react-router-dom";
import { axiosInstance } from "../../../api/axiosinstance";
import { toast } from "react-toastify";
import UserRootState from "../../../redux/rootstate/UserState";
import { useSelector } from "react-redux";

interface VendorDetailsProps {
  name: string  | undefined;
  city: string | undefined;
  id:string | undefined;
}
const VendorDetails: React.FC<VendorDetailsProps> = ({ name, city,id }) => {
  const user = useSelector((state: UserRootState) => state.user.userdata);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleIsFavorite=()=>{
    axiosInstance.post(`/add-Favorite-Vendor?vendorId=${id}&&userId=${user?._id}`,
    {withCredentials:true})
    .then((response)=>{
      console.log(response)
      toast.success("vendor added to favorites.");
      setIsFavorite((cur) => !cur)
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  }
  
 
    const location = useLocation();
    const path=location.pathname;
    return (
      <Card className=" ml-60 mr-60 lg:w-400 mb-20 mt-[-20]" placeholder={undefined} style={{ backgroundColor: "#EFF1FF", marginTop: "-30px" }}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <CardBody  placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div className="flex flex-row justify-between">
                <div>
          <Typography variant="h5" color="blue-gray" className="mb-2" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {name}
          </Typography>
          <Typography  placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {city}
          </Typography>
          </div>
          <div>
            {path==="/view-vendor"?
            <IconButton
            variant="text"
            size="lg"
            color={isFavorite ? "red" : "blue-gray"}
            onClick={handleIsFavorite}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
          <i className="fas fa-heart" />
        </IconButton>
            :""}
          
          <Button color="green" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>4.7</Button>
          
          </div>
          </div>
        </CardBody>
        {path==="/view-vendor"? <CardFooter className="pt-0 flex justify-center " placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Button  placeholder={undefined} color="pink" size="lg" className="mr-3"  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Chat with Us</Button>
          <Link to="/vendor/create-post">
          <Button  placeholder={undefined} color="pink" size="lg" className="mr-3"  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Contact Us</Button>
          </Link>
          <Link to="/vendor/edit-profile">
          <Button  placeholder={undefined} color="pink" size="lg" className="mr-3" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Check Availability</Button>
          </Link>
       
        </CardFooter>: <CardFooter className="pt-0 flex justify-center " placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Button  placeholder={undefined} color="pink" size="lg" className="mr-3"  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Booking Details</Button>
          <Link to="/vendor/create-post">
          <Button  placeholder={undefined} color="pink" size="lg" className="mr-3"  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Create Post</Button>
          </Link>
          <Link to="/vendor/edit-profile">
          <Button  placeholder={undefined} color="pink" size="lg" className="mr-3" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Edit Profile</Button>
          </Link>
          <Link to="/vendor/change-password">
          <Button  placeholder={undefined} color="pink" size="lg"  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Change Password</Button>
          </Link>
        </CardFooter>}
      
      </Card>
    );
  }


  export default VendorDetails