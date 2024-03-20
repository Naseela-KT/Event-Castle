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
      <Card className=" ml-60 mr-60 lg:w-400 mb-20 mt-[-20]"  placeholder={undefined} style={{backgroundColor:"#EFF1FF",marginTop:"-30px"}}>
        <CardBody  placeholder={undefined}>
            <div className="flex flex-row justify-between">
                <div>
          <Typography variant="h5" color="blue-gray" className="mb-2"  placeholder={undefined}>
            Vendor Name
          </Typography>
          <Typography  placeholder={undefined}>
            City
          </Typography>
          </div>
          <div>
          <Button color="green"  placeholder={undefined}>4.7</Button>
          </div>
          </div>
        </CardBody>
        <CardFooter className="pt-0 flex justify-center "  placeholder={undefined}>
          <Button  placeholder={undefined} color="pink" size="lg" className="mr-3">Booking Details</Button>
          <Link to="/vendor/create-post">
          <Button  placeholder={undefined} color="pink" size="lg" className="mr-3">Create Post</Button>
          </Link>
          <Button  placeholder={undefined} color="pink" size="lg">Edit Profile</Button>
        </CardFooter>
      </Card>
    );
  }