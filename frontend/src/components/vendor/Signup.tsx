'use client';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
    Button,
    Select,
    Option
} from "@material-tailwind/react";
import {Link} from 'react-router-dom'


const VendorSignupForm=()=> {
  return (
    <Card className="w-96 mt-50 m-auto bg-dark"  placeholder={undefined}  shadow={false}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="mt-10 rounded-none text-center"  placeholder={undefined}      >
         <Typography variant="h4" color="white"  placeholder={undefined}>
          Vendor - Sign Up
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4"  placeholder={undefined}>
        <Input label="Name" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50" />
        <Select
          label="Vendor Type"
          size="md"

          color="pink"
          className="bg-white bg-opacity-50"  placeholder={undefined}        >
          
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
        
        </Select>
        <Input label="City" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50" />
        <Input label="Email" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
        <Input label="Password" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
        <Input label="Mobile" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
      </CardBody>
      <CardFooter className="pt-0"  placeholder={undefined}>
        <Button variant="gradient" fullWidth  placeholder={undefined}>
          Sign Up
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center" color="white" placeholder={undefined}>
          Already have an account?
          <Link to="/vendor/login">
          <Typography
            as="a"
            href="#"
            variant="small"
            color="white"
            className="ml-1 font-bold"  placeholder={undefined}          >
            Login
          </Typography>
          </Link>
        </Typography>
        <Typography variant="small" className="mt-3 flex justify-center" color="white" placeholder={undefined}>
          Are you a user?
          <Link to="/signup">
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="white"
            className="ml-1 font-bold"  placeholder={undefined}          >
            Signup here
          </Typography>
          </Link>
        </Typography>
      </CardFooter>
    </Card>
  );
}


export default VendorSignupForm;