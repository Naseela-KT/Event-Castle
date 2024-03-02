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
const UserLoginForm=()=> {
  return (
    <Card className="w-96 mt-50 m-auto"  placeholder={undefined}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="mt-10 rounded-none text-center"  placeholder={undefined}      >
         <Typography variant="h3" color="black"  placeholder={undefined}>
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4"  placeholder={undefined}>
       
        <Input label="Email" size="lg" crossOrigin={undefined} />
        <Input label="Password" size="lg" crossOrigin={undefined} />
        <div className="ml-2.5">
        <Typography variant="small" color="black"  placeholder={undefined}>
          Forgot password?
        </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0"  placeholder={undefined}>
        <Button variant="gradient" fullWidth  placeholder={undefined}>
          Sign In
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center"  placeholder={undefined}>
          Don&apos;t have an account?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"  placeholder={undefined}          >
            Sign up
          </Typography>
        </Typography>
        <Typography variant="small" className="mt-3 flex justify-center"  placeholder={undefined}>
          Are you a vendor?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"  placeholder={undefined}          >
            Login here
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
}


export default UserLoginForm;