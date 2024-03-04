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
import { useState,ChangeEvent ,FormEvent} from 'react';
import {Link} from 'react-router-dom'


interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

const VendorLoginForm=()=> {

  const [formValues,setFormValues]=useState<FormValues>(initialValues);

  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target
    setFormValues({...formValues,[name]:value})
  }

  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(formValues)
  }
  return (
    <Card className="w-96 mt-50 m-auto bg-dark"  placeholder={undefined} shadow={false}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="mt-10 rounded-none text-center"  placeholder={undefined}      >
         <Typography variant="h4" color="white"  placeholder={undefined}>
          Vendor - Sign In
        </Typography>
      </CardHeader>
      <form onSubmit={handleSubmit}>
      <CardBody className="flex flex-col gap-4"  placeholder={undefined}>
     
        <Input label="Email" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50" value={formValues.email}
          onChange={handleChange} name="email"/>
        <Input label="Password" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50" value={formValues.password}
          onChange={handleChange} name="password"/>
        <div className="ml-2.5">
          <Link to="/vendor/forgot-password">
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
          <Link to="/vendor/signup">
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
          Are you a user?
          <Link to="/login">
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


export default VendorLoginForm;