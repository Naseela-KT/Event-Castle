
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { axiosInstance, axiosInstanceVendor } from "../../config/api/axiosinstance";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { validateEmailValue, validateOTP } from "../../validations/common/forgotPassword";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { USER,VENDOR } from "../../config/constants/constants";

interface EmailValue {
  email: string;
}

const emailInitialValues: EmailValue = {
  email: "",
};

interface OTPValue {
  otp: string;
}

const otpInitialValues: OTPValue = {
  otp: "",
};

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [otpTimer, setOtpTimer] = useState(0);

  const [otpButtonClicked, setOtpButtonClicked] = useState(false);

  const startOtpTimer = () => {
    setOtpTimer(60);

    const countdown = setInterval(() => {
      setOtpTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    setTimeout(() => {
      clearInterval(countdown);
      setOtpTimer(0);
    }, 60000);
  };

  const formik = useFormik({
    initialValues: emailInitialValues,
    validate: validateEmailValue,
    onSubmit: (values) => {
      {
        location.pathname === VENDOR.FORGOT_PWD
          ? axiosInstanceVendor
              .post("/vendor-getotp", values, { withCredentials: true })
              .then((response) => {
                startOtpTimer();
                setOtpButtonClicked(true);
                console.log(response);
                toast.success(response.data.message);
              })
              .catch((error) => {
                toast.error(error.response.data.error);
                console.log("here", error);
              })
          : axiosInstance
              .post("/getotp", values, { withCredentials: true })
              .then((response) => {
                console.log(response);
                startOtpTimer();
                setOtpButtonClicked(true);
                toast.success(response.data.message);
              })
              .catch((error) => {
                toast.error(error.response.data.error);
                console.log("here", error);
              });
      }
    },
  });

  const otpFormik = useFormik({
    initialValues: otpInitialValues,
    validate: validateOTP,
    onSubmit: (values) => {
      {
        location.pathname === VENDOR.FORGOT_PWD
          ? axiosInstanceVendor
              .post("/verifyVendorotp", values, { withCredentials: true })
              .then((response) => {
                console.log(response);
                toast.success(response.data.message);
                navigate(VENDOR.RESET_PWD);
              })
              .catch((error) => {
                toast.error(error.response.data.error);
                console.log("here", error);
              })
          : axiosInstance
              .post("/verify-otp", values, { withCredentials: true })
              .then((response) => {
                console.log(response);
                toast.success(response.data.message);
                navigate(USER.RESET_PWD);
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
              .get("/pwd-resendOtp",{ withCredentials: true })
              .then((response) => {
                startOtpTimer();
                console.log(response);
                toast.warn(response.data.message);
                
              })
              .catch((error) => {
                toast.error(error.response.data.message);
                console.log("here", error);
              })
          : axiosInstance
              .get("/pwd-resendOtp", { withCredentials: true })
              .then((response) => {
                startOtpTimer();
                console.log(response);
                toast.warn(response.data.message);
              })
              .catch((error) => {
                toast.error(error.response.data.message);
                console.log("here", error);
              });
  }

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-start">
    <div className="w-full md:w-1/2 h-full object-cover" style={{backgroundImage: location.pathname === "/forgot-password" ? `url('/public/imgs/login.png')` :location.pathname === "/vendor/forgot-password"?`url('/public/imgs/vendor-bg.png')`: "", backgroundSize: "cover", backgroundRepeat: "no-repeat", backdropFilter: "revert-layer"}}>
        {location.pathname === "/forgot-password"?(<><h1 className="text-4xl md:text-4xl text-white font-bold mt-20 mx-4">Elevate Your Event Experience</h1>
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
          Forgot Password
        </Typography>
      </CardHeader>

      <CardBody className="flex flex-col gap-4" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center">
            <Input
              label="Email"
              size="md"
              onChange={formik.handleChange}
              name="email"
              crossOrigin={undefined}
              color="pink"
              className="bg-white bg-opacity-50" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            />
            <Button
              variant="gradient"
              placeholder={undefined}
              size="md"
              type="submit"
              disabled={!!(otpButtonClicked && !otpTimer)}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              OTP
            </Button>
          </div>
          {formik.errors.email ? (
            <p className="text-sm" style={{ color: "red", marginBottom: -10 }}>
              {formik.errors.email}
            </p>
          ) : null}
          {otpButtonClicked && otpTimer > 0 ? (
            <p className="text-sm" style={{ color: "red" }}>
              Resend OTP in {otpTimer}s
            </p>
          ) : null}
          {otpButtonClicked && otpTimer === 0 && (
            <Button
              variant="text"
              className="text-center"
              placeholder={undefined}
              type="button"
              size="sm"
              onClick={handleResendOtp}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Resend OTP
            </Button>
          )}
        </form>
        <form onSubmit={otpFormik.handleSubmit}>
          <Input
            label="Enter OTP"
            size="md"
            crossOrigin={undefined}
            color="pink"
            className="bg-white bg-opacity-50"
            onChange={otpFormik.handleChange}
            name="otp" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          {otpFormik.errors.otp ? (
            <p className="text-sm" style={{ color: "red", marginBottom: -10 }}>
              {otpFormik.errors.otp}
            </p>
          ) : null}

          <Button
            variant="gradient"
            fullWidth
            placeholder={undefined}
            type="submit"
            className="mt-3"  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Verify OTP
          </Button>
        </form>
      </CardBody>
    </Card>
    </div>
    </div>
  );
};

export default ForgotPassword;
