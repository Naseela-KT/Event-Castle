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
import UserRootState from "../../redux/rootstate/UserState";
import { axiosInstance } from "../../api/axiosinstance";
import { toast } from "react-toastify";
import { validate } from "../../validations/user/userRegisterVal";


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

const UserSignupForm = () => {
  const user = useSelector((state: UserRootState) => state.user.userdata);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState<UserFormValues>(initialValues);

  const navigate=useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/");
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
            navigate("/verify");
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message)
          console.log("here", error.data.message);
        });
    }
  };

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
          User - Sign Up
        </Typography>
      </CardHeader>
      <form onSubmit={submitHandler}>
        <CardBody className="flex flex-col gap-4" placeholder={undefined}>
          <Input
            label="Name"
            onChange={handleChange}
            value={formValues.name}
            name="name"
            size="md"
            crossOrigin={undefined}
            color="pink"
            className="bg-white bg-opacity-50"
          />
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
            color="pink"
            className="bg-white bg-opacity-50"
          />
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
            color="pink"
            className="bg-white bg-opacity-50"
          />
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
            color="pink"
            className="bg-white bg-opacity-50"
          />
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
            color="pink"
            onChange={handleChange}
            value={formValues.confirm_password}
            name="confirm_password"
            className="bg-white bg-opacity-50"
          />
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
            type="submit"
          >
            Sign Up
          </Button>
        </CardBody>
      </form>
      <CardFooter className="pt-0" placeholder={undefined}>
        <Typography
          variant="small"
          className="mt-6 flex justify-center"
          color="white"
          placeholder={undefined}
        >
          Already have an account?
          <Link to="/login">
            <Typography
              as="a"
              href="#"
              variant="small"
              color="white"
              className="ml-1 font-bold"
              placeholder={undefined}
            >
              Login
            </Typography>
          </Link>
        </Typography>
        <Typography
          variant="small"
          className="mt-3 flex justify-center"
          color="white"
          placeholder={undefined}
        >
          Are you a vendor?
          <Link to="/vendor/signup">
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="white"
              className="ml-1 font-bold"
              placeholder={undefined}
            >
              Signup here
            </Typography>
          </Link>
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default UserSignupForm;
