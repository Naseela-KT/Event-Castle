import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Input,
    Button,
  } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import VendorRootState from "../../../redux/rootstate/VendorState";
import { axiosInstanceVendor } from "../../../api/axiosinstance";
import DefaultLayout from "../../../layout/DefaultLayout";
import Breadcrumb from "../../../components/vendor/Breadcrumbs/Breadcrumb";
  
  const CreatePost = () => {
    const vendor = useSelector(
      (state: VendorRootState) => state.vendor.vendordata
    );
  
    useEffect(() => {
      console.log(vendor?._id);
    }, []);
  
    const [caption, setCaption] = useState<string>("");
    const [file, setFile] = useState<File | undefined>(undefined);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!caption) {
        toast.error('Caption is required.', {
          style: {
            background: '#FF4136', // Red background
            color: '#FFFFFF', // White text
          },
          duration: 3000,
       });
         
         
        // toast.error("Caption is required.");
        return;
     }
     if (!file) {
        toast.error("Image is required.");
        return;
     }
  
      const formData = new FormData();
      formData.append("caption", caption);
      if (file) {
        formData.append("image", file, file.name);
      }
      axiosInstanceVendor
        .post(`/add-post?vendorid=${vendor?._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log(response);
          toast.success("Post added successfully...!");
          navigate("/Vendor/view-posts");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log("here", error);
        });
    };
  
    return (
        <DefaultLayout>
        <Breadcrumb pageName="Add Post" folderName="Posts"/>
      <div className="flex justify-center flex-wrap">
        <Card
          className="sm:w-96 md:w-1/2 lg:w-2/3 xl:w-96 mx-4 my-20"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-28 place-items-center bg-graydark"
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
                    const file = e.target.files[0];
                    setFile(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }}
                name="image"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <Button
              className="bg-graydark"
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
            <img alt="Selected Image" src={previewUrl?previewUrl:""} className="max-w-full h-auto" />
          </CardBody>
        </Card>
      </div>
      </DefaultLayout>
    );
  };
  
  export default CreatePost;