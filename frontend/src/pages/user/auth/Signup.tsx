import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link,useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserRootState from "../../../redux/rootstate/UserState";
import { axiosInstance } from "../../../config/api/axiosinstance";
import { toast } from "react-toastify";
import { validate } from "../../../validations/user/userRegisterVal";
import { GoogleOAuthProvider , GoogleLogin } from "@react-oauth/google";
import { USER,VENDOR } from "../../../config/constants/constants";

const client_id = import.meta.env.VITE_CLIENT_ID || '';


interface UserFormValues {
  email: string;
  password: string;
  name: string;
  phone: string;
  confirm_password: string;
}

const initialValues: UserFormValues = {
  email: "",
  password: "",
  name: "",
  phone: "",
  confirm_password: "",
};

const UserSignup= () => {
  const user = useSelector((state: UserRootState) => state.user.userdata);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState<UserFormValues>(initialValues);

  const navigate=useNavigate()

  useEffect(() => {
    if (user) {
      navigate(USER.HOME);
    }
  }, []);

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
      axiosInstance
        .post("/signup", formValues, { withCredentials: true })
        .then((response) => {
          console.log(response);
          if (response.data.email) {
            toast.warn(response.data.message);
            navigate(`${USER.VERIFY}`);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message)
          console.log("here", error.data.message);
        });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-start">
    <div className="w-full md:w-1/2 h-full object-cover" style={{backgroundImage:`url('/imgs/login.png')`,backgroundSize:"cover",backgroundRepeat:"no-repeat",backdropFilter:"revert-layer"}}>
      <h1 className="text-4xl md:text-4xl text-white font-bold mt-20 mx-4">Elevate Your Event Experience</h1>
      <p className="text-xl md:text-2xl text-white font-normal mt-5 mx-4">Find, Connect, and Collaborate with Top Event Planners</p>
    </div>
    <div className="w-full md:w-1/2 mt-10 md:mt-0">
      <GoogleOAuthProvider clientId={client_id}>
        <Card className="w-full md:w-96 m-auto bg-dark" shadow={false}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="mt-10 rounded-none text-center"
          placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <Typography variant="h4" color="black" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          User - Sign Up
        </Typography>
      </CardHeader>
      <form onSubmit={submitHandler}>
        <CardBody className="flex flex-col gap-4" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Input
              label="Name"
              onChange={handleChange}
              value={formValues.name}
              name="name"
              size="md"
              crossOrigin={undefined}
              color="black"
              className="bg-white bg-opacity-50" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          {formErrors.name ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.name}
            </p>
          ) : null}
          <Input
              label="Email"
              size="md"
              onChange={handleChange}
              value={formValues.email}
              name="email"
              crossOrigin={undefined}
              color="black"
              className="bg-white bg-opacity-50" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          {formErrors.email ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.email}
            </p>
          ) : null}
          <Input
              label="Phone"
              onChange={handleChange}
              value={formValues.phone}
              name="phone"
              size="md"
              crossOrigin={undefined}
              color="black"
              className="bg-white bg-opacity-50" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          {formErrors.phone ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.phone}
            </p>
          ) : null}
          <Input
              label="Password"
              type="password"
              onChange={handleChange}
              value={formValues.password}
              name="password"
              size="md"
              crossOrigin={undefined}
              color="black"
              className="bg-white bg-opacity-50" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          {formErrors.password ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.password}
            </p>
          ) : null}
          <Input
              label="Confirm Password"
              type="password"
              size="md"
              crossOrigin={undefined}
              color="black"
              onChange={handleChange}
              value={formValues.confirm_password}
              name="confirm_password"
              className="bg-white bg-opacity-50" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          {formErrors.confirm_password ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.confirm_password}
            </p>
          ) : null}
          <Button
              variant="gradient"
              fullWidth
              placeholder={undefined}
              type="submit"  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Sign Up
          </Button>
        </CardBody>
      </form>
      {/* //GOOGLE Authentication */}
      <div id="signUpButton" className="pl-20">
              <GoogleLogin
              type='standard'
              theme='filled_black'
              size='medium'
              ux_mode="popup"
              width={50}
              onSuccess={response => {
                axiosInstance.post('/google/register' , response).then((res) => {
                  console.log(res)
                  if(res.data.message) {
                    toast.success(res.data.message);
                    navigate(`${USER.LOGIN}`);
                  }
                })
                .catch((error) => {
                  console.log(error)
                  toast.error(error.response.data.error)
                })
              }}
              />
            </div>
      <CardFooter className="pt-0" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Typography
            variant="small"
            className="mt-6 flex justify-center"
            color="black"
            placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          Already have an account?
          <Link to={USER.LOGIN}>
            <Typography
                as="a"
                href="#"
                variant="small"
                color="black"
                className="ml-1 font-bold"
                placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Login
            </Typography>
          </Link>
        </Typography>
        <Typography
            variant="small"
            className="mt-3 flex justify-center"
            color="black"
            placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          Are you a vendor?
          <Link to={VENDOR.SIGNUP}>
            <Typography
                as="a"
                href="#signup"
                variant="small"
                color="black"
                className="ml-1 font-bold"
                placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Signup here
            </Typography>
          </Link>
        </Typography>
      </CardFooter>
    </Card>
    </GoogleOAuthProvider>
    </div>
    </div>
  );
};

export default UserSignup;
