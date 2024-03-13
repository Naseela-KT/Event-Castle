
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
import { axiosInstanceVendor } from "../../api/axiosinstance";
import { useSelector, useDispatch } from "react-redux";
import { setVendorInfo } from "../../redux/slices/VendorSlice";
import VendorRootState from "../../redux/rootstate/VendorState";
import { useFormik } from "formik";
import { validate } from "../../validations/loginVal";
import { toast } from "react-toastify";

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};

const VendorLoginForm = () => {
  const vendor = useSelector(
    (state: VendorRootState) => state.vendor.vendordata
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (vendor) {
      navigate("/vendor");
    }
  }, []);

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      axiosInstanceVendor
        .post("/login", values)
        .then((response) => {
          console.log(response);
          dispatch(setVendorInfo(response.data.vendorData));
          navigate("/Vendor");
        })
        .catch((error) => {
          toast.error(error.response.data.message)
          console.log("here", error);
        });
    },
  });

  return (
    <Card
      className="w-96 mt-50 m-auto bg-dark"
      placeholder={undefined}
      shadow={false}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="mt-10 rounded-none text-center"
        placeholder={undefined}
      >
        <Typography variant="h4" color="white" placeholder={undefined}>
          Vendor - Sign In
        </Typography>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardBody className="flex flex-col gap-4" placeholder={undefined}>
          <Input
            label="Email"
            size="md"
            crossOrigin={undefined}
            color="pink"
            className="bg-white bg-opacity-50"
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
          />
          {formik.errors.email ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formik.errors.email}
            </p>
          ) : null}
          <Input
            label="Password"
            size="md"
            crossOrigin={undefined}
            color="pink"
            className="bg-white bg-opacity-50"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            type="password"
          />
          {formik.errors.password ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formik.errors.password}
            </p>
          ) : null}
          <div className="ml-2.5">
            <Link to="/vendor/forgot-password">
              <Typography
                variant="small"
                color="white"
                placeholder={undefined}
                className="text-left"
              >
                Forgot password?
              </Typography>
            </Link>
          </div>
          <Button
            variant="gradient"
            fullWidth
            placeholder={undefined}
            type="submit"
          >
            Sign In
          </Button>
        </CardBody>
      </form>
      <CardFooter className="pt-0" placeholder={undefined}>
        <Typography
          variant="small"
          color="white"
          className="mt-6 flex justify-center "
          placeholder={undefined}
        >
          Don&apos;t have an account?
          <Link to="/vendor/signup">
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="white"
              className="ml-1 font-bold"
              placeholder={undefined}
            >
              Sign up
            </Typography>
          </Link>
        </Typography>
        <Typography
          variant="small"
          color="white"
          className="mt-3 flex justify-center"
          placeholder={undefined}
        >
          Are you a user?
          <Link to="/login">
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="white"
              className="ml-1 font-bold"
              placeholder={undefined}
            >
              Login here
            </Typography>
          </Link>
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default VendorLoginForm;
