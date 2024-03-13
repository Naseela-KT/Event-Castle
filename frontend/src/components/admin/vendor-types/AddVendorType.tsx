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
import { axiosInstanceAdmin } from "../../../api/axiosinstance";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string
  ) => {
    if (typeof e === "string") {
      setFormValues({ ...formValues, status: e });
    } else {
      const { name, value } = e.target as HTMLInputElement & HTMLSelectElement;
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues)
    axiosInstanceAdmin.post("/add-type", formValues)
    .then((response) => {
      console.log(response);
      setFormValues({type:"",status:""});
      navigate("/admin/vendor-types")
    })
    .catch((error) => {
      console.log('here', error);
    });
  };

  return (
    <Card className="w-full mx-auto" placeholder={undefined} shadow={true}>
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="mt-2 grid place-items-center px-4 text-center bg-white"
        placeholder={undefined}
      >
        <Typography variant="h5" color="black" placeholder={undefined}>
          Add Vendor-Type
        </Typography>
      </CardHeader>
      <CardBody placeholder={undefined} className="ml-20">
        <form className="flex flex-row gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="mt-4 -mb-2 font-medium"
              placeholder={undefined}
            >
              Vendor Type
            </Typography>
            <Input
              placeholder="Vendor Type"
              className=" focus:!border-t-gray-900"
              color="black"
              value={formValues.type}
              onChange={handleChange}
              name="type"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              containerProps={{ className: "mt-4" }}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 mt-4 font-medium"
              placeholder={undefined}
            >
              Status
            </Typography>
            <Select
              placeholder="Active"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={formValues.status}
              name="status"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange(e)}
            >
              <Option value="Active">Active</Option>
              <Option value="Non-Active">Non-Active</Option>
            </Select>
          </div>
          <div className="mt-11">
            <Button size="md" placeholder={undefined} type="submit">
              Add Type
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
