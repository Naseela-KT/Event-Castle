import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosinstance";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/slices/UserSlice";
import UserRootState from "../../redux/rootstate/UserState";
import { validate } from "../../validations/loginVal";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {GoogleLogin , GoogleOAuthProvider} from '@react-oauth/google';


const client_id = import.meta.env.VITE_CLIENT_ID || '';

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};

const UserLogin = () => {

  const user = useSelector((state: UserRootState) => state.user.userdata);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);



  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      console.log(values)
      axiosInstance
        .post("/login", values)
        .then((response) => {
          console.log(response);
          dispatch(setUserInfo(response.data.userData));
          navigate("/home");
        })
        .catch((error) => {
          toast.error(error.response)
          console.log("here", error);
        });
    },
  });


 

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-start">
    <div className="w-full md:w-1/2 h-full object-cover" style={{backgroundImage:`url('/public/imgs/login.png')`,backgroundSize:"cover",backgroundRepeat:"no-repeat",backdropFilter:"revert-layer"}}>
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
          className="mt-20 rounded-none text-center"
          placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <Typography variant="h4" color="black" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          User - Sign In
        </Typography>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardBody className="flex flex-col gap-4" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Input
              label="Email"
              size="md"
              crossOrigin={undefined}
              color="black"
              className="bg-white bg-opacity-50"
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          {formik.errors.email ? <p className="text-sm" style={{color:"red",marginBottom:-10,marginTop:-10}}>{formik.errors.email}</p> : null}
          <Input
              label="Password"
              size="md"
              crossOrigin={undefined}
              color="black"
              className="bg-white bg-opacity-50"
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              type="password" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          {formik.errors.password ? <p className="text-sm" style={{color:"red",padding:0,marginTop:-10}}>{formik.errors.password}</p> : null}
          <div className="ml-2.5">
            <Link to="/forgot-password">
              <Typography
                  variant="small"
                  color="black"
                  placeholder={undefined}
                  className="text-left"  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Forgot password?
              </Typography>
            </Link>
          </div>
          <Button
              variant="gradient"
              fullWidth
              placeholder={undefined}
              type="submit"  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Sign In
          </Button>
        </CardBody>
      </form>
      <div id="signInButton" className="pl-20">
        <GoogleLogin
        type='standard'
        theme='filled_black'
        size='medium'
        width={50}
        onSuccess={response => {
          axiosInstance.post('/google/login' , response).then((res) => {
            console.log(res , 'google @')
            if(res.data) {
              console.log(res.data)
              // localStorage.setItem("studentToken",res.data.token)//for setting token in local storage
              dispatch(setUserInfo(res.data.userData));
              toast.success(res.data.message);
              navigate('/');
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
            color="black"
            className="mt-6 flex justify-center "
            placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          Don&apos;t have an account?
          <Link to="/signup">
            <Typography
                as="a"
                href="#signup"
                variant="small"
                color="black"
                className="ml-1 font-bold"
                placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Sign up
            </Typography>
          </Link>
         
        </Typography>
        <Typography
            variant="small"
            color="black"
            className="mt-3 flex justify-center"
            placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          Are you a vendor?
          <Link to="/vendor/login">
            <Typography
                as="a"
                href="#signup"
                variant="small"
                color="black"
                className="ml-1 font-bold"
                placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Login here
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

export default UserLogin;
