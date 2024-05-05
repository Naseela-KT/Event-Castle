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
import { axiosInstanceVendor } from "../../../config/api/axiosinstance";
import { toast } from "react-toastify";
import { validate } from "../../../validations/vendor/registerVal";
import { VENDOR } from "../../../config/constants/constants";
import { VendorType } from "../../../types/commonTypes";

interface VendorFormValues {
  name: string;
  vendor_type: string;
  email: string;
  password: string;
  city: string;
  phone: string;
}

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
      const updatedFormValues = { ...formValues, vendor_type: e };
      setFormValues({...updatedFormValues});
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
            navigate(VENDOR.VERIFY);
          }
        })
        .catch((error) => {
          console.log("here", error);
        });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-start">
      <div
        className="w-full md:w-1/2 h-full object-cover"
        style={{
          backgroundImage: `url('/imgs/vendor-bg.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backdropFilter: "revert-layer",
        }}
      >
        <h1 className="text-4xl md:text-4xl text-white font-bold mt-20 mx-4">
          Unlock Your Potential with Us
        </h1>
        <p className="text-xl md:text-2xl text-white font-normal mt-5 mx-4">
          {" "}
          "Your vision, our canvas. Let's paint the future."
        </p>
      </div>
      <div className="w-full md:w-1/2 mt-10 md:mt-0">
        <Card
          className="w-full md:w-96 m-auto bg-dark"
          shadow={false}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="mt-10 rounded-none text-center"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Typography
              variant="h4"
              color="black"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Vendor - Sign Up
            </Typography>
          </CardHeader>
          <form onSubmit={submitHandler}>
            <CardBody
              className="flex flex-col gap-4"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Input
                label="Name"
                onChange={handleChange}
                value={formValues.name}
                name="name"
                size="md"
                crossOrigin={undefined}
                color="black"
                className="bg-white bg-opacity-50"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
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
                value={formValues.vendor_type}
                name="vendor_type"
                onChange={(e) => {
                  if (typeof e === "string") {
                    handleChange(e);
                  }
                }}
                className="bg-white bg-opacity-50"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {vendorTypes.map((val, index) =>
                  val.status ? (
                    <Option value={val.type} key={index}>
                      {val.type}
                    </Option>
                  ) : (
                    ""
                  )
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
                color="black"
                className="bg-white bg-opacity-50"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
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
                color="black"
                className="bg-white bg-opacity-50"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
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
                color="black"
                className="bg-white bg-opacity-50"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
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
                color="black"
                className="bg-white bg-opacity-50"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
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
                className="bg-black"
                variant="gradient"
                fullWidth
                placeholder={undefined}
                type="submit"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Sign Up
              </Button>
            </CardBody>
          </form>
          <CardFooter
            className="pt-0"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Typography
              variant="small"
              className="mt-6 flex justify-center"
              color="black"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Already have an account?
              <Link to={VENDOR.LOGIN}>
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="black"
                  className="ml-1 font-bold"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Login
                </Typography>
              </Link>
            </Typography>
            <Typography
              variant="small"
              className="mt-3 flex justify-center"
              color="black"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Are you a user?
              <Link to={VENDOR.SIGNUP}>
                <Typography
                  as="a"
                  href="#signup"
                  variant="small"
                  color="black"
                  className="ml-1 font-bold"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Signup here
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VendorSignupForm;
