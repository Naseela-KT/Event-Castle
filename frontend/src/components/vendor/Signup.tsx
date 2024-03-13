"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstanceVendor } from "../../api/axiosinstance";
import { toast } from "react-toastify";
import { validate } from "../../validations/vendor/registerVal";

interface VendorType {
  _id: string;
  type: string;
  status: boolean;
}

interface VendorFormValues {
  name: string;
  vendor_type: string;
  email: string;
  password: string;
  city: string;
  phone: string;
}

// interface VendorFormErrors {
//   name: string;
//   email: string;
//   password: string;
//   city: string;
//   phone: string;
// }

const initialValues: VendorFormValues = {
  name: "",
  vendor_type: "",
  email: "",
  password: "",
  city: "",
  phone: "",
};

const VendorSignupForm = () => {
  const [vendorTypes, setvendorTypes] = useState<VendorType[]>([]);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState<VendorFormValues>({
    name: "",
    email: "",
    password: "",
    city: "",
    phone: "",
    vendor_type: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string
  ) => {
    if (typeof e === "string") {
      setFormValues({ ...formValues, vendor_type: e });
    } else {
      const { name, value } = e.target as HTMLInputElement & HTMLSelectElement;
      setFormValues({ ...formValues, [name]: value });
      const errors = validate({ ...formValues, [name]: value });
      setFormErrors((prevErrors) => ({ ...prevErrors, ...errors }));
    }
  };

  useEffect(() => {
    axiosInstanceVendor
      .get("/vendor-types")
      .then((response) => {
        console.log(response);
        setvendorTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    console.log(errors);
    console.log(Object.values(errors));
    if (Object.values(errors).every((error) => error === "")) {
      console.log(formValues);
      axiosInstanceVendor
        .post("/signup", formValues, { withCredentials: true })
        .then((response) => {
          console.log(response);
          if (response.data.email) {
            toast.warn(response.data.message);
            navigate("/vendor/verify");
          }
        })
        .catch((error) => {
          console.log("here", error);
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
          Vendor - Sign Up
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

          <Select
            label="Vendor Type"
            size="md"
            onChange={(e) => {
              if (e) {
                handleChange(e);
              }
            }}
            value={formValues.vendor_type}
            name="vendor_type"
            color="pink"
            className="bg-white bg-opacity-50"
            placeholder={undefined}
          >
            {vendorTypes.map((val, index) =>
              val.status ? (
                <Option value={val.type} key={index}>
                  {val.type}
                </Option>
              ) :''
            )}
          </Select>
          {formErrors.vendor_type ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.vendor_type}
            </p>
          ) : null}
          <Input
            label="City"
            onChange={handleChange}
            value={formValues.city}
            name="city"
            size="md"
            crossOrigin={undefined}
            color="pink"
            className="bg-white bg-opacity-50"
          />
          {formErrors.city ? (
            <p
              className="text-sm"
              style={{ color: "red", marginBottom: -10, marginTop: -10 }}
            >
              {formErrors.city}
            </p>
          ) : null}
          <Input
            label="Email"
            onChange={handleChange}
            value={formValues.email}
            name="email"
            size="md"
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
            label="Mobile"
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
            size="md"
            onChange={handleChange}
            value={formValues.password}
            name="password"
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
          <Link to="/vendor/login">
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
          Are you a user?
          <Link to="/signup">
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

export default VendorSignupForm;
