import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
    Button,
} from "@material-tailwind/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserRootState from "../redux/rootstate/UserState";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosinstance";
import { setUserInfo } from "../redux/slices/UserSlice";
import {toast} from "react-toastify"

interface FormValues {
  otp: string;
}

const initialValues: FormValues = {
  otp:""
};

const VerifyEmail=()=> {
  
  const [formValues,setFormValues]=useState<FormValues>(initialValues);

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
    axiosInstance.post("/verifyOtp", formValues)
    .then((response) => {
      console.log(response);
      dispatch(setUserInfo(response.data.user))
      toast.success("Successfully registered..!");
      navigate("/")
    })
    .catch((error) => {
      toast.error(error.message);
      console.log('here', error);
    });
  }

  return (
    <Card className="w-96 mt-50 m-auto bg-dark"  placeholder={undefined} shadow={false}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="mt-10 rounded-none text-center"  placeholder={undefined}      >
         <Typography variant="h4" color="white"  placeholder={undefined}>
          Verify OTP
        </Typography>
      </CardHeader>
      <form onSubmit={handleSubmit}>
      <CardBody className="flex flex-col gap-4"  placeholder={undefined}>
       
        <Input label="Enter OTP" size="md" name="otp" value={formValues.otp} onChange={handleChange} crossOrigin={undefined} color="pink" className="bg-white bg-opacity-50"/>
        <Button variant="gradient" fullWidth  placeholder={undefined} type="submit">
          Verify and Login
        </Button>
      </CardBody>
      </form>
    
    </Card>
  );
}


export default VerifyEmail;