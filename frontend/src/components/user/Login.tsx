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
import { useState,ChangeEvent ,FormEvent,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import {axiosInstance} from '../../api/axiosinstance';
import {  useSelector,useDispatch } from 'react-redux';
import { setUserInfo } from "../../redux/slices/UserSlice";
import UserRootState from '../../redux/rootstate/UserState';
import { validate } from "../../validations/loginVal";

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

const UserLoginForm=()=> {

  const [formValues,setFormValues]=useState<FormValues>(initialValues);
  const [formErrors,setFormErrors]=useState({email:"",password:""})

  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target
    setFormValues({...formValues,[name]:value})
  }

  
  const user = useSelector((state : UserRootState) => state.user.userdata);

  const navigate = useNavigate();
  const dispatch= useDispatch();

  useEffect(() => {
    if(user) {
      navigate('/');
    }
  }, []) 

  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(formValues)
    const errors=validate(formValues)
    setFormErrors({ ...formErrors, ...errors });
    if(Object.values(errors).length===0){
      axiosInstance.post("/login", formValues)
      .then((response) => {
        console.log(response);
        dispatch(setUserInfo(response.data.userData))
        navigate("/")
      })
      .catch((error) => {
        console.log('here', error);
      });
    }
    
  }
  return (
    <Card className="w-96 mt-50 bg-dark m-auto"  placeholder={undefined} shadow={false}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="mt-10 rounded-none text-center"  placeholder={undefined}      >
         <Typography variant="h4" color="white"  placeholder={undefined}>
          User - Sign In
        </Typography>
      </CardHeader>
      <form onSubmit={handleSubmit}>
      <CardBody className="flex flex-col gap-4"  placeholder={undefined}>
        <Input label="Email" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50" value={formValues.email}
          onChange={handleChange} name="email"/>
           <p style={{color:'red', fontSize: '12px',marginTop:"-10px"}}>{formErrors.email}</p>
        <Input label="Password" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50" value={formValues.password}
          onChange={handleChange} name="password" type="password"/>
           <p style={{color:'red', fontSize: '12px',marginTop:"-10px"}}>{formErrors.password}</p>
        <div className="ml-2.5">
          <Link to="/forgot-password">
        <Typography variant="small" color="white"  placeholder={undefined} className='text-left'>
          Forgot password?
        </Typography>
        </Link>
       
        </div>
        <Button variant="gradient"  fullWidth  placeholder={undefined} type='submit'>
          Sign In
        </Button>
     
      </CardBody>
      </form>
      <CardFooter className="pt-0"  placeholder={undefined}>
        
        <Typography variant="small" color="white" className="mt-6 flex justify-center "  placeholder={undefined}>
          Don&apos;t have an account?
          <Link to="/signup">
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="white"
            className="ml-1 font-bold"  placeholder={undefined}          >
            Sign up
          </Typography>
          </Link>
        </Typography>
        <Typography variant="small" color="white" className="mt-3 flex justify-center"  placeholder={undefined}>
          Are you a vendor?
          <Link to="/vendor/login">
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="white"
            className="ml-1 font-bold"  placeholder={undefined}          >
            Login here
          </Typography>
          </Link>
        </Typography>
      </CardFooter>
    </Card>
  );
}


export default UserLoginForm;