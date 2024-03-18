import { Card, CardBody, Typography } from "@material-tailwind/react";

export default function VendorAbout() {
  return (
    <Card
      className="mt-6 w-96 ml-20 w-200 mr-20 mb-20 shadow-md bg-gray"
      placeholder={undefined}
      style={{backgroundColor:"#EFF1FF"}}
    >
      <CardBody placeholder={undefined}>
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2"
          placeholder={undefined}
        >
          About
        </Typography>
        <hr className="my-4 border-t border-gray-300" />
        <Typography placeholder={undefined}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dui
          augue, ornare ut eros eu, accumsan accumsan ligula. Aliquam erat
          volutpat. Nulla et pretium metus. Ut at imperdiet augue. Quisque
          commodo maximus ante sed malesuada. Integer eu iaculis elit. In sed
          erat lorem. Suspendisse suscipit felis nibh, et cursus est porta sit
          amet.
        </Typography>
      </CardBody>
    </Card>
  );
}
