'use client';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
    Button,
} from "@material-tailwind/react";
import { useState,ChangeEvent ,FormEvent,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {axiosInstanceAdmin} from '../../api/axiosinstance';
import {  useSelector,useDispatch } from 'react-redux';
import { setAdminInfo } from "../../redux/slices/AdminSlice";
import AdminRootState from '../../redux/rootstate/AdminState';
import { validate } from "../../validations/loginVal";

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
  const [formErrors,setFormErrors]=useState({email:"",password:""})

  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target
    setFormValues({...formValues,[name]:value})
  }


  const admin = useSelector((state : AdminRootState) => state.admin.isAdminSignedIn);

  const navigate = useNavigate();
  const dispatch= useDispatch();

  useEffect(() => {
    if(admin) {
      navigate('/admin/dashboard');
    }
  }, []) 

  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const errors=validate(formValues)
    setFormErrors({ ...formErrors, ...errors });
    if(Object.values(errors).length===0){
    axiosInstanceAdmin.post("/login", formValues)
    .then((response) => {
      dispatch(setAdminInfo(response.data.adminData))
      navigate("/admin/dashboard")
    })
    .catch((error) => {
      console.log('here', error);
    });
  }
  }
  

  return (
    <div className="ml-auto">
    <Card className="w-96 mt-20 bg-gray-200"  placeholder={undefined} shadow={false}>
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
        <Input label="Email" size="md" crossOrigin={undefined} color="black" className="bg-white bg-opacity-50" value={formValues.email}
          onChange={handleChange} name="email"/>
           <p style={{color:'red', fontSize: '12px',marginTop:"-12px"}}>{formErrors.email}</p>
        <Input label="Password" size="md" crossOrigin={undefined} color="black" className="bg-white bg-opacity-50" value={formValues.password}
          onChange={handleChange} name="password" type="password"/>
          <p style={{color:'red', fontSize: '12px',marginTop:"-12px"}}>{formErrors.password}</p>
        <Button   fullWidth  placeholder={undefined} type='submit' className="bg-gray-700">
            Login
        </Button>
      </CardBody>
      </form>
    </Card>
    </div>
  );
}


export default AdminLogin;