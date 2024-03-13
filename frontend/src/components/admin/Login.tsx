import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstanceAdmin } from "../../api/axiosinstance";
import { useSelector, useDispatch } from "react-redux";
import { setAdminInfo } from "../../redux/slices/AdminSlice";
import AdminRootState from "../../redux/rootstate/AdminState";
import { validate } from "../../validations/loginVal";
import { useFormik } from "formik";
import {toast} from "react-toastify"

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};

const AdminLogin = () => {
  const admin = useSelector(
    (state: AdminRootState) => state.admin.isAdminSignedIn
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (admin) {
      navigate("/admin/dashboard");
    }
  }, []);

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      axiosInstanceAdmin
        .post("/login", values)
        .then((response) => {
          console.log(response);
          dispatch(setAdminInfo(response.data.adminData));
          navigate("/admin/dashboard");
        })
        .catch((error) => {
          toast.error(error.response.data.message)
          console.log("here", error);
        });
    },
  });

  return (
    <div className="ml-auto">
      <Card
        className="w-96 mt-20 bg-gray-200"
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
          <Typography variant="h4" color="black" placeholder={undefined}>
            Admin - Login
          </Typography>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardBody className="flex flex-col gap-4" placeholder={undefined}>
            <Input
              label="Email"
              size="md"
              crossOrigin={undefined}
              color="black"
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
              color="black"
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
            <Button
              fullWidth
              placeholder={undefined}
              type="submit"
              className="bg-gray-700"
            >
              Login
            </Button>
          </CardBody>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
