import {
  Card,
  CardBody,
  Typography,
  Select,
  CardFooter,
  Button,
  Option,
} from '@material-tailwind/react';

interface updateStatusProps {
  bookingId: string | undefined;
}

const UpdateStatus: React.FC<updateStatusProps> = ({ bookingId }) => {
  return (
    <Card
      className="w-80 mt-6"
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
          variant="h6"
          color="blue-gray"
          className="mb-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Change Status
        </Typography>
        <Select
          placeholder="USA"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Option>Pending</Option>
          <Option>Accepted</Option>
          <Option>Rejected</Option>
        </Select>
      </CardBody>
      <CardFooter
        className="pt-0"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Button
          variant="gradient"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Update
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdateStatus;
