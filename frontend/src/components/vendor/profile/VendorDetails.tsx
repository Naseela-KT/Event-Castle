import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";

   
  export default function VendorDetails() {
    return (
      <Card className=" ml-60 mr-60 lg:w-400 mb-20 mt-[-20]" placeholder={undefined} style={{ backgroundColor: "#EFF1FF", marginTop: "-30px" }}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <CardBody  placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div className="flex flex-row justify-between">
                <div>
          <Typography variant="h5" color="blue-gray" className="mb-2" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Vendor Name
          </Typography>
          <Typography  placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            City
          </Typography>
          </div>
          <div>
          <Button color="green" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>4.7</Button>
          </div>
          </div>
        </CardBody>
        <CardFooter className="pt-0 flex justify-center " placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
        </CardFooter>
      </Card>
    );
  }