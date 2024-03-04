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
const ResetPassword=()=> {
  return (
    <Card className="w-96 mt-50 m-auto bg-dark"  placeholder={undefined}  shadow={false}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="mt-10 rounded-none text-center"  placeholder={undefined} >
         <Typography variant="h4" color="white"  placeholder={undefined}>
          Reset Password
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4"  placeholder={undefined}>
        <Input label="New Password" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
        <Input label="Confirm Password" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
      
      </CardBody>
      <CardFooter className="pt-0"  placeholder={undefined}>
        <Button variant="gradient" fullWidth  placeholder={undefined}>
          Update Password
        </Button>
       
      </CardFooter>
    </Card>
  );
}


export default ResetPassword;