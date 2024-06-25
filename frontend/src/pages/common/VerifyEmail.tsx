import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance, axiosInstanceVendor } from "../../config/api/axiosinstance";
import { setUserInfo } from "../../redux/slices/UserSlice";
import { setVendorInfo } from "../../redux/slices/VendorSlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { validate } from "../../validations/common/otpValidation";
import { USER, VENDOR } from "../../config/constants/constants";

interface FormValues {
  otp: string;
}

const initialValues: FormValues = {
  otp: "",
};

const VerifyEmail = () => {
  const location = useLocation();
  const [timer, setTimer] = useState(120); 
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (isTimerActive) {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [isTimerActive]);

  useEffect(() => {
    startTimer();
  }, []);

  const startTimer = () => {
    setTimer(120);
    setIsTimerActive(true);
  };


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      {
        location.pathname === VENDOR.VERIFY
          ? axiosInstanceVendor
              .post("/verify", values, { withCredentials: true })
              .then((response) => {
                console.log(response.data);
                dispatch(setVendorInfo(response.data.vendor));
                toast.success("Successfully registered..!");
                navigate(`${VENDOR.DASHBOARD}`);
              })
              .catch((error) => {
                toast.error(error.response.data.message);
                console.log("here", error);
              })
          : axiosInstance
              .post("/verify", values, { withCredentials: true })
              .then((response) => {
                console.log(response);
                dispatch(setUserInfo(response.data.user));
                toast.success("Successfully registered..!");
                navigate(`${USER.HOME}`);
              })
              .catch((error) => {
                toast.error(error.response.data.message);
                console.log("here", error);
              });
      }
    },
  });


  const handleResendOtp=async()=>{
    location.pathname === VENDOR.VERIFY
          ? axiosInstanceVendor
              .get("/resendOtp",{ withCredentials: true })
              .then((response) => {
                startTimer();
                console.log(response);
                
                toast.success(response.data.message);
                
              })
              .catch((error) => {
                toast.error(error.response.data.error);
                console.log("here", error);
              })
          : axiosInstance
              .get("/resendOtp", { withCredentials: true })
              .then((response) => {
                startTimer();
                console.log(response);
                toast.success(response.data.message);
              })
              .catch((error) => {
                toast.error(error.response.data.error);
                console.log("here", error);
              });
  }

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-start">
<div className="w-full md:w-1/2 h-full object-cover" style={{backgroundImage: location.pathname === "/verify" ? `url('/imgs/login.png')` :location.pathname === "/vendor/verify"?`url('/imgs/vendor-bg.png')`: "", backgroundSize: "cover", backgroundRepeat: "no-repeat", backdropFilter: "revert-layer"}}>
    {location.pathname === "/verify"?(<><h1 className="text-4xl md:text-4xl text-white font-bold mt-20 mx-4">Elevate Your Event Experience</h1>
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
      className="w-full md:w-96 mt-50 m-auto"
      placeholder={undefined}
      shadow={false}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="mt-10 rounded-none text-center"
        placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <Typography variant="h4" color="black" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Verify OTP
        </Typography>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardBody className="flex flex-col gap-4" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Input
            label="Enter OTP"
            size="md"
            name="otp"
            value={formik.values.otp}
            onChange={formik.handleChange}
            crossOrigin={undefined}
            color="black"
            className="bg-white bg-opacity-50" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          {formik.errors.otp ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formik.errors.otp}
            </p>
          ) : null}

          {timer > 0 ? (
            <p className="text-sm" style={{ color: "red" ,marginTop:-10}}>
              Resend OTP in {timer}s
            </p>
          ) : (
            <Button
                variant="text"
                className="text-center"
                placeholder={undefined}
                type="button"
                size="sm"
                onClick={handleResendOtp}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Resend OTP
          </Button>
          )}

          <Button
            variant="gradient"
            fullWidth
            placeholder={undefined}
            type="submit"  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Verify and Login
          </Button>
        </CardBody>
      </form>
    </Card>
    </div>
    </div>
  );
};

export default VerifyEmail;
