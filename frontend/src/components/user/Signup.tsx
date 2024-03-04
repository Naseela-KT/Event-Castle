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
import {Link,useNavigate} from 'react-router-dom'
import { useEffect} from 'react';
import {  useSelector } from 'react-redux';
import UserRootState from '../../redux/rootstate/UserState';

const UserSignupForm=()=> {
  const user = useSelector((state : UserRootState) => state.user.userdata);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(user) {
      navigate('/');
    }
  }, []) 

  return (
    <Card className="w-96 mt-50 m-auto bg-dark"  placeholder={undefined}  shadow={false}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="mt-10 rounded-none text-center"  placeholder={undefined}      >
         <Typography variant="h4" color="white"  placeholder={undefined}>
          User - Sign Up
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4"  placeholder={undefined}>
        <Input label="Name" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50" />
        <Input label="Email" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
        <Input label="Password" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
        <Input label="Confirm Password" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
      </CardBody>
      <CardFooter className="pt-0"  placeholder={undefined}>
        <Button variant="gradient" fullWidth  placeholder={undefined}>
          Sign Up
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center" color="white" placeholder={undefined}>
          Already have an account?
          <Link to="/login">
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
          Are you a vendor?
          <Link to="/vendor/signup">
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


export default UserSignupForm;