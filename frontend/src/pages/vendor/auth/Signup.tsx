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
import { USER, VENDOR } from "../../../config/constants/constants";
import { VendorType } from "../../../types/commonTypes";
import { useSelector } from "react-redux";
import VendorRootState from "../../../redux/rootstate/VendorState";

interface VendorFormValues {
  name: string;
  email: string;
  password: string;
  city: string;
  phone: string;
  confirm_password: string;
}

const initialValues: VendorFormValues = {
  name: "",
  email: "",
  password: "",
  city: "",
  phone: "",
  confirm_password: "",
};

const VendorSignupForm = () => {
  const vendor = useSelector(
    (state: VendorRootState) => state.vendor.vendordata
  );
  const [vendorTypes, setvendorTypes] = useState<VendorType[]>([]);
  const [formValues, setFormValues] = useState(initialValues);
  const [vendor_type, setVendorType] = useState<string>("");
  const [vendorTypeError,setVendorTypeError]=useState("")
  const [formErrors, setFormErrors] = useState<VendorFormValues>({
    name: "",
    email: "",
    password: "",
    city: "",
    phone: "",
    confirm_password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const errors = validate({ ...formValues, [name]: value });
    setFormErrors((prevErrors) => ({ ...prevErrors, ...errors }));
  };



  useEffect(() => {
    if (vendor) {
      navigate(`${VENDOR.DASHBOARD}`);
    }
  }, []);

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
    if(vendor_type.length==0){
      setVendorTypeError("Choose Type")
      return
    }
    if (Object.values(errors).every((error) => error === "")) {
      console.log(formValues);
      axiosInstanceVendor
        .post("/signup", {...formValues,vendor_type}, { withCredentials: true })
        .then((response) => {
          console.log(response);
          if (response.data.email) {
            toast.success(response.data.message);
            navigate(`${VENDOR.VERIFY}`);
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
      <div className="w-full md:w-1/2 mt-10 md:mt-0 h-screen overflow-auto">
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
                name="vendor_type"
                value={vendor_type}
                onChange={(e)=>{
                  setVendorType(e!);
                  setVendorTypeError("")
                }}
                className="bg-white bg-opacity-50"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                key={vendor_type} // Add this line
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
              {vendorTypeError ? (
                <p
                  className="text-sm"
                  style={{ color: "red", marginBottom: -10, marginTop: -10 }}
                >
                  {vendorTypeError}
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
              <Input
                label="Confirm Password"
                type="password"
                size="md"
                onChange={handleChange}
                value={formValues.confirm_password}
                name="confirm_password"
                crossOrigin={undefined}
                color="black"
                className="bg-white bg-opacity-50"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
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
              <Link to={USER.SIGNUP}>
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
