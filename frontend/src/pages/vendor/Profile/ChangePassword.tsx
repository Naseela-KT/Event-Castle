import {
    Card,
    CardBody,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { toast } from "react-toastify";
  import { useNavigate } from "react-router-dom";
  import { useSelector } from "react-redux";
  import { useState } from "react";
import VendorRootState from "../../../redux/rootstate/VendorState";
import { validate } from "../../../validations/common/changePwdValidation";
import { axiosInstanceVendor } from "../../../config/api/axiosinstance";
import Breadcrumb from "../../../components/vendor/Breadcrumbs/Breadcrumb";
import { VENDOR } from "../../../config/constants/constants";
import Layout from "../../../layout/vendor/Layout";

  
  interface FormValues {
    current_password: string;
    new_password: string;
    confirm_password: string;
  }
  
  const initialValues: FormValues = {
    current_password:"",
    new_password: "",
    confirm_password: "",
   
  };
  
  
  
  const ChangePassword = () => {
    const vendor = useSelector(
        (state: VendorRootState) => state.vendor.vendordata
      );
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState<FormValues>(initialValues);
    
    const navigate = useNavigate();
  
    const handleChange = (e: { target: { name: string; value: string; }; }) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
      const errors = validate({ ...formValues, [name]: value });
      setFormErrors((prevErrors) => ({ ...prevErrors, ...errors }));
    };
  
  
  
  
    const submitHandler = async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      const errors = validate(formValues);
      setFormErrors(errors)
      console.log(Object.values(errors))
      if (Object.values(errors).every((error) => error === "")) {
        axiosInstanceVendor
          .patch(`/update-password?vendorid=${vendor?._id}`, formValues,{withCredentials:true})
          .then((response) => {
            console.log(response);
            toast.success("Password updated Successfully!")
            navigate(`${VENDOR.VIEW_PROFILE}`);
          })
          .catch((error) => {
            // localStorage.removeItem("userToken");
            toast.error(error.response)
            console.log("here", error);
          });
      }
    };
  
    return (
      <Layout>
         <Breadcrumb pageName="Change-Password" folderName="Profile"/>
         <Card
           className="w-full sm:w-96 mx-auto m-auto" // Adjusted width and margin for responsiveness
           placeholder={undefined}
           onPointerEnterCapture={undefined}
           onPointerLeaveCapture={undefined}
         >
           <form onSubmit={submitHandler}>
             <CardBody
               className="flex flex-col gap-4"
               placeholder={undefined}
               onPointerEnterCapture={undefined}
               onPointerLeaveCapture={undefined}
             >
               <Typography variant="h4" className="text-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                 Change Password
               </Typography>
               <Input
                 type="password"
                 color="black"
                 variant="standard"
                 label="Current Password"
                 size="md"
                 name="current_password"
                 onChange={handleChange}
                 value={formValues.current_password}
                 crossOrigin={undefined}
                 onPointerEnterCapture={undefined}
                 onPointerLeaveCapture={undefined}
               />
               {formErrors.current_password ? <p className="text-sm" style={{color:"red",marginBottom:-10,marginTop:-10}}>{formErrors.current_password}</p> : null}
               <Input
                 type="password"
                 color="black"
                 variant="standard"
                 label="New Password"
                 size="md"
                 name="new_password"
                 onChange={handleChange}
                 value={formValues.new_password}
                 crossOrigin={undefined}
                 onPointerEnterCapture={undefined}
                 onPointerLeaveCapture={undefined}
               />
               {formErrors.new_password ? <p className="text-sm" style={{color:"red",marginBottom:-10,marginTop:-10}}>{formErrors.new_password}</p> : null}
               <Input
                 type="password"
                 color="black"
                 variant="standard"
                 label="Confirm Password"
                 size="md"
                 name="confirm_password"
                 onChange={handleChange}
                 value={formValues.confirm_password}
                 crossOrigin={undefined}
                 onPointerEnterCapture={undefined}
                 onPointerLeaveCapture={undefined}
               />
               {formErrors.confirm_password ? <p className="text-sm" style={{color:"red",marginBottom:-10,marginTop:-10}}>{formErrors.confirm_password}</p> : null}
               <Button
                 variant="gradient"
                 className="justify-center bg-graydark"
                 placeholder={undefined}
                 onPointerEnterCapture={undefined}
                 onPointerLeaveCapture={undefined}
                 type="submit"
               >
                 Update
               </Button>
             </CardBody>
           </form>
         </Card>
      </Layout>
     );
     
  };
  
  
  export default ChangePassword
  
  
  