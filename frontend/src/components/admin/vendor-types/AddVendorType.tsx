import React from "react";
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


export default function AddVendorType() {
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
        <form className="flex flex-row gap-4">
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
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            
          >
            <Option>Active</Option>
          
          </Select>
          </div>
          <div className="mt-11">
          
          <Button size="md" placeholder={undefined} >
            Add Type
          </Button>
          </div>
         
        </form>
      </CardBody>
    </Card>

  );
}
