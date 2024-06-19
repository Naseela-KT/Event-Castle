import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { axiosInstanceAdmin } from "../../../config/api/axiosinstance";
import { useNavigate } from "react-router-dom";
import { validate } from "../../../validations/admin/vendorTypeValidation";
import { toast } from "react-toastify";
import { ADMIN } from "../../../config/constants/constants";

interface FormValues {
  type: string;
  status: string;
}

const initialValues: FormValues = {
  type: "",
  status: "",
};

export default function AddVendorType() {
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [image, setImage] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<FormValues>({
    type: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string
  ) => {
    if (typeof e === "string") {
      setFormValues({ ...formValues, status: e });
    } else {
      const { name, value } = e.target as HTMLInputElement & HTMLSelectElement;
      setFormValues({ ...formValues, [name]: value });
      const errors = validate({ ...formValues, [name]: value });
      setFormErrors((prevErrors) => ({ ...prevErrors, ...errors }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setImage(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.values(errors).every((error) => error === "")) {
      const formData = new FormData();
      formData.append("type", formValues.type);
      formData.append("status", formValues.status);
      if (image) {
        formData.append("image", image);
      }


      axiosInstanceAdmin
        .post("/add-type", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          setFormValues(initialValues);
          setImage(null);
          navigate(`${ADMIN.VENDOR_TYPES}`, { replace: true });
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log("here", error);
        });
    }
  };

  return (
    <Card
      className="w-full mx-auto"
      placeholder={undefined}
      shadow={true}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="mt-2 grid place-items-center px-4 text-center bg-white"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography
          variant="h5"
          color="black"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add Vendor-Type
        </Typography>
      </CardHeader>
      <CardBody
        placeholder={undefined}
        className="ml-20"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col flex-1">
              <Typography
                variant="small"
                color="blue-gray"
                className="mt-4 mb-0 font-medium"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Vendor Type
              </Typography>
              <Input
                placeholder="Vendor Type"
                className="focus:!border-t-gray-900"
                color="black"
                value={formValues.type}
                onChange={handleChange}
                name="type"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                containerProps={{ className: "mt-2" }}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              {formErrors.type && (
                <p className="text-sm text-red-500">{formErrors.type}</p>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <Typography
                variant="small"
                color="blue-gray"
                className="mt-4 mb-2 font-medium"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Status
              </Typography>
              <Select
                placeholder="Active"
                className="focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={formValues.status}
                name="status"
                onChange={(e) => handleChange(e!)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Option value="Active">Active</Option>
                <Option value="Non-Active">Non-Active</Option>
              </Select>
              {formErrors.status && (
                <p className="text-sm text-red-500">{formErrors.status}</p>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <Typography
                variant="small"
                color="blue-gray"
                className="mt-4 mb-2 font-medium"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Image
              </Typography>
              <Input
                type="file"
                size="lg"
                name="image"
                onChange={handleImageChange}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
          </div>
          <div className="mt-4 text-center">
            <Button
              color="pink"
              size="md"
              type="submit"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Add Type
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
