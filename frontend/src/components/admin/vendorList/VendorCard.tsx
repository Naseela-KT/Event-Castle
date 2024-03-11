import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
  } from "@material-tailwind/react";

  interface VendorCardProps {
    name: string;
    email: string;
    phone: number;
    city: string;
    
  }

  const VendorCard: React.FC<VendorCardProps> = ({
    name
    
  }) => {
    return (
      <Card
            shadow={false}
            className="relative grid h-[18rem] w-full max-w-[16rem] m-3 items-end justify-center overflow-hidden text-center"  placeholder={undefined}      >
        <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('/imgs/vendor1.png')] bg-cover bg-center"  placeholder={undefined}        >
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
        </CardHeader>
        <CardBody className="relative py-14 px-6 md:px-12"  placeholder={undefined}>
         
          <Typography variant="h5" className="mb-4 text-gray-400"  placeholder={undefined}>
            {name}
          </Typography>
          <Avatar
                    size="md"
                    variant="circular"
                    alt="tania andrew"
                    className="border-2 border-white"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" placeholder={undefined}          />
        </CardBody>
      </Card>
    );
  }


  export default VendorCard