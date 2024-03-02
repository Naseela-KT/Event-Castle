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
const UserSignupForm=()=> {
  return (
    <Card className="w-96 mt-50 m-auto"  placeholder={undefined}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="mt-10 rounded-none text-center"  placeholder={undefined}      >
         <Typography variant="h3" color="black"  placeholder={undefined}>
          Sign Up
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4"  placeholder={undefined}>
        <Input label="Name" size="md" crossOrigin={undefined} />
        <Input label="Email" size="md" crossOrigin={undefined} />
        <Input label="Password" size="md" crossOrigin={undefined} />
        <Input label="Confirm Password" size="md" crossOrigin={undefined} />
      </CardBody>
      <CardFooter className="pt-0"  placeholder={undefined}>
        <Button variant="gradient" fullWidth  placeholder={undefined}>
        Sign Up
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center"  placeholder={undefined}>
          Already have an account?
          <Typography
            as="a"
            href="/user/login"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"  placeholder={undefined}          >
            Login
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
            Signup here
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
}


export default UserSignupForm;