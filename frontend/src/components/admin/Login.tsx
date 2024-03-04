'use client';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
    Button,
} from "@material-tailwind/react";
import { useState,ChangeEvent ,FormEvent} from 'react';
import {Link } from "react-router-dom"


interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

const AdminLogin=()=> {

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
        className="mt-10 rounded-none text-center"  placeholder={undefined}>
         <Typography variant="h4" color="black"  placeholder={undefined}>
          Admin - Login
        </Typography>
      </CardHeader>
      <form onSubmit={handleSubmit}>
      <CardBody className="flex flex-col gap-4"  placeholder={undefined}>
        <Input label="Email" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50" value={formValues.email}
          onChange={handleChange} name="email"/>
        <Input label="Password" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50" value={formValues.password}
          onChange={handleChange} name="password"/>
        <Button variant="gradient"  fullWidth  placeholder={undefined} type='submit'>
            <Link to="admin/login">
          Sign In
          </Link>
        </Button>
     
      </CardBody>
      </form>
    </Card>
  );
}


export default AdminLogin;