import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
// import { axiosInstanceVendor } from "../../api/axiosinstance";

const CreatePost = () => {
  interface PostValues {
    caption: string;
    image: string;
  }

  const initialValues: PostValues = {
    caption: "",
    image: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      // axiosInstanceVendor
      //   .post("/login", values)
      //   .then((response) => {
      //     console.log(response);
      //     dispatch(setVendorInfo(response.data.vendorData));
      //     navigate("/Vendor");
      //   })
      //   .catch((error) => {
      //     toast.error(error.response.data.message);
      //     console.log("here", error);
      //   });
    },
  });

  return (
    <div className="flex justify-center flex-wrap">
      <Card
        className="sm:w-96 md:w-1/2 lg:w-2/3 xl:w-96 mx-4 my-20"
        placeholder={undefined}
      >
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
          placeholder={undefined}
        >
          <Typography variant="h3" color="white" placeholder={undefined}>
            Add Post
          </Typography>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardBody className="flex flex-col gap-4" placeholder={undefined}>
            <Input
              label="Caption"
              size="lg"
              crossOrigin={undefined}
              onChange={formik.handleChange}
              value={formik.values.caption}
              name="caption"
            />
            <Input
              type="file"
              size="lg"
              crossOrigin={undefined}
              onChange={formik.handleChange}
              value={formik.values.image}
              name="image"
            />
            <Button variant="gradient" fullWidth placeholder={undefined}>
              Add
            </Button>
          </CardBody>
        </form>
        <CardFooter className="pt-0" placeholder={undefined}>
          <Typography
            variant="small"
            className="mt-6 flex justify-center"
            placeholder={undefined}
          >
            <Link to="/vendor/profile">
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                placeholder={undefined}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>

      {/* Preview Image Card */}
      <Card
        className="sm:w-96 md:w-1/2 lg:w-1/3 xl:w-96 mx-4 my-20"
        placeholder={undefined}
      >
        <CardBody className="flex flex-col gap-4" placeholder={undefined}>
          <Typography variant="h3" placeholder={undefined}>
            Image Preview
          </Typography>
          <img alt="Selected Image" className="max-w-full h-auto" />
        </CardBody>
      </Card>
    </div>
  );
};

export default CreatePost;
