import {
    Card,
    CardHeader,
    CardBody,
    Typography,

  } from "@material-tailwind/react";
import { Link } from "react-router-dom";

  
  interface VendorCardProps {
    name: string;
    email: string;
    phone: string;
    city: string;
    _id:string;
    logoUrl:string;
  }
   
  const VendorCard: React.FC<VendorCardProps> = ({
    name,city,_id,logoUrl})=> {
    return (
      <Card className="w-60 mr-10" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <CardHeader floated={false} className="h-40" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
         <Link to={`/view-vendor?id=${_id}`}>
          <img src={logoUrl?logoUrl:'/imgs/vendor1.png'} alt="profile-picture" />
          </Link>
        </CardHeader>
        <CardBody className="text-center" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Typography variant="h4" color="blue-gray" className="mb-2" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {name}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {city}
          </Typography>
        </CardBody>
        
      </Card>
    );
  }


  export default VendorCard;