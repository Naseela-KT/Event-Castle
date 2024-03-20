import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstanceVendor } from "../../api/axiosinstance";

// import { axiosInstanceVendor } from "../../api/axiosinstance";

const CreatePost = () => {
  const [caption, setCaption] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("caption", caption);
    if (file) {
      formData.append("image", file, file.name);
    }
    await axiosInstanceVendor.post("/add-post", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    <div className="flex justify-center flex-wrap">
      <Card
        className="sm:w-96 md:w-1/2 lg:w-2/3 xl:w-96 mx-4 my-20"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            variant="h3"
            color="white"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Add Post
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody
            className="flex flex-col gap-4"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Input
              label="Caption"
              size="lg"
              crossOrigin={undefined}
              onChange={(e) => {
                setCaption(e.target.value);
              }}
              value={caption}
              name="caption"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            <Input
              type="file"
              size="lg"
              crossOrigin={undefined}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
              name="image"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            <Button
              variant="gradient"
              type="submit"
              fullWidth
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Add
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
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Link to="/vendor/profile">
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
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
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardBody
          className="flex flex-col gap-4"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            variant="h3"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Image Preview
          </Typography>
          <img alt="Selected Image" className="max-w-full h-auto" />
        </CardBody>
      </Card>
    </div>
  );
};

export default CreatePost;
