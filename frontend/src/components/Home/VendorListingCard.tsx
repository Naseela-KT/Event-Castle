import {
    Card,
    CardHeader,
    CardBody,
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
  }

const VendorListingCard:React.FC<VendorCardProps> = ({name,city,_id})=> {
  return (
    <>
    <Card className="w-full max-w-[35rem] shadow-lg flex flex-row justify-center p-5 m-0"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <CardHeader floated={false} color="transparent" className="w-2/5 bg-transparent" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      
    <img
      src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      alt="ui/ux review check" className=""/>

        <div className="to-bg-black-20 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/70 " />
       
      </CardHeader>
      <CardBody  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="mb-3 flex justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
           {name}
          </Typography>
          <Typography
                          color="blue-gray"
                          className="flex items-center gap-1.5 font-normal"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
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
        <Link to={`/view-vendor?id=${_id}`}>
        <Button size="md" fullWidth={true}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          View Profile
        </Button>
        </Link>
      </CardBody>

      
    </Card>
    </>
  )
}

export default VendorListingCard