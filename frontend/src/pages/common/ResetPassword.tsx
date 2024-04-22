import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { validate } from "../../validations/common/resetPassword";
import { axiosInstance, axiosInstanceVendor } from "../../api/axiosinstance";
import { useLocation,useNavigate } from 'react-router-dom';


interface FormValues {
  password: string;
  confirm_password: string;
}

const initialValues: FormValues = {
  password: "",
  confirm_password: "",
};

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values: unknown) => {
      console.log(values);
      {
        location.pathname === "/vendor/reset-password"
          ? axiosInstanceVendor
              .post("/reset-password", values, { withCredentials: true })
              .then((response) => {
                
                toast.success(response.data.message);
                navigate("/vendor/login");
              })
              .catch((error) => {
                toast.error(error.response.data.error);
                console.log("here", error);
              })
          : axiosInstance
              .post("/reset-password", values, { withCredentials: true })
              .then((response) => {
                console.log(response);
                toast.success(response.data.message);
                navigate("/login");
              })
              .catch((error) => {
                toast.error(error.response.data.error);
                console.log("here", error);
              });
      }
    },
  });

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-start">
<div className="w-full md:w-1/2 h-full object-cover" style={{backgroundImage: location.pathname === "/reset-password" ? `url('/public/imgs/login.png')` :location.pathname === "/vendor/reset-password"?`url('/public/imgs/vendor-bg.png')`: "", backgroundSize: "cover", backgroundRepeat: "no-repeat", backdropFilter: "revert-layer"}}>
    {location.pathname === "/reset-password"?(<><h1 className="text-4xl md:text-4xl text-white font-bold mt-20 mx-4">Elevate Your Event Experience</h1>
      <p className="text-xl md:text-2xl text-white font-normal mt-5 mx-4">Find, Connect, and Collaborate with Top Event Planners</p></>):(<>  <h1 className="text-4xl md:text-4xl text-white font-bold mt-20 mx-4">
          Unlock Your Potential with Us
        </h1>
        <p className="text-xl md:text-2xl text-white font-normal mt-5 mx-4">
          {" "}
          "Your vision, our canvas. Let's paint the future."
        </p></>)}
      
    </div>
    <div className="w-full md:w-1/2 mt-10 md:mt-20 md:mb-20 mb-20">
    <Card
      className="w-96 mt-50 m-auto bg-dark"
      placeholder={undefined}
      shadow={false}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="mt-10 rounded-none text-center"
        placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <Typography variant="h4" color="black" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Reset Password
        </Typography>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardBody className="flex flex-col gap-4" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Input
            label="New Password"
            size="md"
            type="password"
            crossOrigin={undefined}
            color="pink"
            className="bg-white bg-opacity-50"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          {formik.errors.password ? (
            <p
              className="text-sm"
              style={{ color: "red", padding: 0, marginTop: -10 ,marginBottom:-10}}
            >
              {formik.errors.password}
            </p>
          ) : null}
          <Input
            label="Confirm Password"
            size="md"
            type="password"
            crossOrigin={undefined}
            color="pink"
            className="bg-white bg-opacity-50"
            onChange={formik.handleChange}
            value={formik.values.confirm_password}
            name="confirm_password" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          {formik.errors.confirm_password ? (
            <p
              className="text-sm"
              style={{ color: "red", padding: 0, marginTop: -10 }}
            >
              {formik.errors.confirm_password}
            </p>
          ) : null}
          <Button variant="gradient" fullWidth placeholder={undefined} type="submit"  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Update Password
          </Button>
        </CardBody>
      </form>
    </Card>
    </div>
    </div>
  );
};

export default ResetPassword;
