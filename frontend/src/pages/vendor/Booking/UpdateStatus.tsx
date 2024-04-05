import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Typography,
  Select,
  CardFooter,
  Button,
  Option,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from '@material-tailwind/react';
import { axiosInstanceVendor } from '../../../api/axiosinstance';
import { toast } from 'react-toastify';


interface UpdateStatusProps {
  bookingId: string | undefined;
  onStatusChange: (newStatus: string) => void;
}

const UpdateStatus: React.FC<UpdateStatusProps> = ({ bookingId,onStatusChange  }) => {
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>('');
  const [errorStatus, setErrorStatus] = useState<string>('');
  const [open, setOpen] = useState(false);


  const handleOpen = () => {
    if (!selectedStatus) {
      setErrorStatus('Please select a status');
      return;
    }
    setOpen(true);
  };

  const handleUpdate = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    axiosInstanceVendor
      .put(
        `/update-booking-status?bookingId=${bookingId}`,
        { status: selectedStatus },
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response.data);
        setOpen(false); 
        toast.success("Status Changed Successfully!")
        onStatusChange(selectedStatus || '');
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  return (
    <>
     
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
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e);
                setErrorStatus('');
              }}
              placeholder="Select status"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Option value="Pending">Pending</Option>
              <Option value="Accepted">Accepted</Option>
              <Option value="Rejected">Rejected</Option>
            </Select>
            {errorStatus ? <p className="text-red-500">{errorStatus}</p> : ''}
          </CardBody>
          <CardFooter
            className="pt-0"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Button
              variant="gradient"
              onClick={() => handleOpen()}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Update
            </Button>
          </CardFooter>
        </Card>
        <Dialog
          size="xs"
          open={open}
          handler={() => setOpen(!open)}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <DialogHeader
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Update Status
          </DialogHeader>
          <DialogBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="mb-2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Are you sure you want to update the status?
            </Typography>
          </DialogBody>
          <DialogFooter
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
             <form onSubmit={handleUpdate}>
            <Button
              variant="text"
              color="red"
              onClick={() => setOpen(false)}
              className="mr-1"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              color="green"
              type="submit"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
             
            >
            Change
            </Button>
            </form>
          </DialogFooter>
        </Dialog>
   
    </>
  );
};

export default UpdateStatus;
