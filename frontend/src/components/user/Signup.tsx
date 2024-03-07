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
import { ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {  useSelector } from 'react-redux';
import UserRootState from '../../redux/rootstate/UserState';
import { axiosInstance } from "../../api/axiosinstance";
import {toast} from "react-toastify"

interface FormValues {
  email: string;
  password: string;
  name:string;
  phone:number;
}

const initialValues: FormValues = {
  email: '',
  password: '',
  name:'',
  phone:0
};

const UserSignupForm=()=> {
  const user = useSelector((state : UserRootState) => state.user.userdata);
  const navigate = useNavigate();

  const [formValues,setFormValues]=useState<FormValues>(initialValues);

  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target
    setFormValues({...formValues,[name]:value})
  }

  
  useEffect(() => {
    if(user) {
      navigate('/');
    }
  }, []) 

  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(formValues)
    axiosInstance.post("/signup", formValues)
    .then((response) => {
      if(response.data.email){
        toast.warn(response.data.message);
        navigate("/verify")
      }
    })
    .catch((error) => {
      console.log('here', error);
    });
  }

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
      <form onSubmit={handleSubmit}>
      <CardBody className="flex flex-col gap-4"  placeholder={undefined}>
        <Input label="Name" value={formValues.name} onChange={handleChange} name="name" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50" />
        <Input label="Email" value={formValues.email} onChange={handleChange} name="email" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
        <Input label="Phone" value={formValues.phone} onChange={handleChange} name="phone" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
        <Input label="Password" type="password" value={formValues.password} onChange={handleChange} name="password" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
        <Input label="Confirm Password" type="password" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
        <Button variant="gradient" fullWidth  placeholder={undefined} type="submit">
          Sign Up
        </Button>
      </CardBody>
      </form>
      <CardFooter className="pt-0"  placeholder={undefined}>
        
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