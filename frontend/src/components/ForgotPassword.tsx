'use client';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
    Button,
} from "@material-tailwind/react";
const ForgotPassword=()=> {
  return (
    <Card className="w-96 mt-50 m-auto bg-dark"  placeholder={undefined} shadow={false}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="mt-10 rounded-none text-center"  placeholder={undefined}      >
         <Typography variant="h4" color="white"  placeholder={undefined}>
          Forgot Password
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4"  placeholder={undefined}>
        <Input label="Email" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
        <Input label="Enter OTP" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
      
      </CardBody>
      <CardFooter className="pt-0"  placeholder={undefined}>
        <Button variant="gradient" fullWidth  placeholder={undefined}>
          Verify OTP
        </Button>
       
      </CardFooter>
    </Card>
  );
}


export default ForgotPassword;