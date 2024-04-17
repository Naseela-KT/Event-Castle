import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link} from 'react-router-dom';
import { axiosInstanceChat } from '../../../api/axiosinstance';
import { useNavigate } from 'react-router-dom';

interface ProfileButtonsProps {
  vendorId: string | undefined; 
  bookedDates:Array<string> | undefined;
  userId:string | undefined; 
}

const ProfileButtons: React.FC<ProfileButtonsProps> = ({ vendorId,bookedDates,userId }) => {
  const [open, setOpen] = useState(false);
  const navigate=useNavigate()


  const handleOpen = () => setOpen((cur) => !cur);

  const handleChat =async()=>{
    const body ={
      senderId :userId,
      receiverId:vendorId
    }
    try {
      await axiosInstanceChat.post('/' , body).then((res)=>{
        navigate('/chat')
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <div className="flex md:flex-row flex-col justify-start py-4 pt-8 lg:pt-4">
      <div className="mr-1 p-3 text-center">
          <Button
            className="w-fit"
            onClick={handleOpen}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Check Availability
          </Button>
        </div>
        <div className="mr-1 p-3 text-center">
          <Link to={`/book-event?id=${vendorId}`}>
          <Button
            className="w-fit"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Book Now
          </Button>
          </Link>
        </div>
        <div className="mr-1 p-3 text-center">
          <Button
            className="w-fit"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={handleChat}
          >
            Chat with us
          </Button>
        </div>
      </div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          className="justify-between"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div>
            <Typography
              variant="h5"
              color="blue-gray"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Available Dates
            </Typography>
            
          </div>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody
          className="flex justify-center !px-5"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
         <DatePicker
            selected={null}
            onChange={() => {}}
            inline
            minDate={new Date()}
            excludeDates={bookedDates?.map(date => new Date(date))}
            dayClassName={(date) => {const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
              return bookedDates?.includes(utcDate.toISOString().split('T')[0]) ? 'bg-red-500' : 'bg-green-500';}}
          />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ProfileButtons;
