import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Badge,
  } from "@material-tailwind/react";

  interface VendorCardProps {
    name: string;
    email: string;
    phone: number;
    city: string;
    coverpicUrl:string;
    logoUrl:string;
    verificationRequest:boolean;
  }

  const VendorCard: React.FC<VendorCardProps> = ({
    name,
    coverpicUrl,
    logoUrl,
    verificationRequest,
  }) => {
    return (
      <>
    {verificationRequest && (
    <Badge
      content={<i className="text-lg leading-none fas fa-bell"></i>}
      color="red" 
      className="mt-2 ml-2 z-10 -mr-55" 
    />
  )}
      <Card
        shadow={false}
        className="relative grid h-[18rem] w-full max-w-[15rem] items-end justify-center overflow-hidden text-center" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          style={{ backgroundImage: `url(${coverpicUrl?coverpicUrl:"/imgs/vendor/cover-default.jpg"})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
          className="absolute inset-0 m-0 h-full w-full rounded-none" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
        </CardHeader>
        <CardBody className="relative py-14 px-6 md:px-12" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
         
          <Typography variant="h5" className="mb-4 text-gray-400" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {name}
          </Typography>
          <Avatar
            size="md"
            variant="circular"
            alt="tania andrew"
            className="border-2 border-white"
            src={logoUrl?logoUrl:"/imgs/vendor/logo-default.jpeg"} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
        </CardBody>
      </Card>
      

      </>
    );
  }


  export default VendorCard