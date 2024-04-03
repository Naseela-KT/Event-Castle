import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
   
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";

  interface VendorCardProps {
    name: string;
    email: string;
    phone: string;
    city: string;
    _id:string;
    coverpicUrl:string;
  }
   
  const VendorCard:React.FC<VendorCardProps>=({name,city,_id,coverpicUrl}) =>{
    return (
      <Card className="w-full max-w-[20rem] shadow-lg"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <CardHeader floated={false} color="blue-gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <img
            src={coverpicUrl}
            alt="ui/ux review check"
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
         
        </CardHeader>
        <CardBody  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              {name}
            </Typography>
            <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-0.5 h-5 w-5 text-yellow-700"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              5.0
            </Typography>
          </div>
          <Typography color="gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {city}
          </Typography>
        </CardBody>
        <CardFooter className="pt-3 -mt-5"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Link to={`/view-vendor?id=${_id}`}>
          <Button size="md" fullWidth={true}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            View Profile
          </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }


  export default VendorCard;