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
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { axiosInstanceVendor } from "../../api/axiosinstance";
import { toast } from "react-toastify";

interface VendorType {
  _id: string;
  type:string;
  status:boolean;
}

interface FormValues {
  name:string;
  vendor_type:string;
  email: string;
  password: string;
  city:string;
  phone:number;
}

const initialValues: FormValues = {
  name:'',
  vendor_type:'',
  email: '',
  password: '',
  city:'',
  phone:0
};

const VendorSignupForm=()=> {
  const [vendorTypes, setvendorTypes] = useState<VendorType[]>([]);

  const navigate = useNavigate();

  const [formValues,setFormValues]=useState<FormValues>(initialValues);

  useEffect(() => {
    axiosInstanceVendor.get("/vendor-types")
      .then((response) => {
        console.log(response)
        setvendorTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []); 


  const handleChange=(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string
  ) => {
    if (typeof e === "string") {
      setFormValues({ ...formValues, vendor_type: e });
    } else {
      const { name, value } = e.target as HTMLInputElement & HTMLSelectElement;
      setFormValues({ ...formValues, [name]: value });
    }
  }


  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(formValues)
    axiosInstanceVendor.post("/signup", formValues)
    .then((response) => {
      if(response.data){
        console.log(response.data)
        toast.warn(response.data.message);
        navigate("/vendor/verify")
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
          Vendor - Sign Up
        </Typography>
      </CardHeader>
      <form onSubmit={handleSubmit}>
      <CardBody className="flex flex-col gap-4"  placeholder={undefined}>
        <Input label="Name" value={formValues.name} onChange={handleChange} name="name" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50" />
        <Select
          label="Vendor Type"
          size="md"
          value={formValues.vendor_type} onChange={()=>handleChange} name="vendor_type"
          color="pink"
          className="bg-white bg-opacity-50"  placeholder={undefined}        >
          {vendorTypes.map((val,index)=>(
            <Option value={val._id} key={index}>{val.type}</Option>
          ))}
        </Select>
        <Input label="City" value={formValues.city} onChange={handleChange} name="city" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50" />
        <Input label="Email" value={formValues.email} onChange={handleChange} name="email" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
        <Input label="Mobile" value={formValues.phone} onChange={handleChange} name="phone" size="md" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
        <Input label="Password" type="password" size="md" value={formValues.password} onChange={handleChange} name="password" crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
        <Button variant="gradient" fullWidth  placeholder={undefined} type="submit">
          Sign Up
        </Button>
      </CardBody>
      
      </form>
      <CardFooter className="pt-0"  placeholder={undefined}>
        
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