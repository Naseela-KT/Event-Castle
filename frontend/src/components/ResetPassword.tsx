"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useFormik } from "formik";
// import { toast } from "react-toastify";
import { validate } from "../validations/resetPassword";
// import { axiosInstance } from "../api/axiosinstance";
// import { useNavigate } from "react-router-dom";

interface FormValues {
  password: string;
  confirm_password: string;
}

const initialValues: FormValues = {
  password: "",
  confirm_password: "",
};

const ResetPassword = () => {
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      console.log(values);
      // axiosInstance
      //   .post("/reset-password", values, { withCredentials: true })
      //   .then((response) => {
      //     console.log(response);
      //     navigate("/");
      //   })
      //   .catch((error) => {
      //     toast.error(error.response.data.message);
      //     console.log("here", error);
      //   });
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
          Reset Password
        </Typography>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardBody className="flex flex-col gap-4" placeholder={undefined}>
          <Input
            label="New Password"
            size="md"
            type="password"
            crossOrigin={undefined}
            color="pink"
            className="bg-white bg-opacity-50"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
          />
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
            name="confirm_password"
          />
          {formik.errors.confirm_password ? (
            <p
              className="text-sm"
              style={{ color: "red", padding: 0, marginTop: -10 }}
            >
              {formik.errors.confirm_password}
            </p>
          ) : null}
          <Button variant="gradient" fullWidth placeholder={undefined} type="submit">
            Update Password
          </Button>
        </CardBody>
      </form>
    </Card>
  );
};

export default ResetPassword;
