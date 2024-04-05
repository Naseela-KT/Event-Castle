import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
  Alert,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../api/axiosinstance';
import UserRootState from '../../../redux/rootstate/UserState';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  isActive: boolean;
  totalBooking: number;
  coverpic: string;
  logo: string;
  logoUrl: string;
  coverpicUrl: string;
  about: string;
}

interface Booking {
  _id:string;
  date: string;
  name: string;
  eventName: string;
  city: string;
  pin: number;
  mobile: number;
  vendorId: Vendor;
  status: string;
  payment_status: string;
}

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}

const SingleBooking = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const user = useSelector((state: UserRootState) => state.user.userdata);
  const [booking, setBooking] = useState<Booking>({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  useEffect(() => {
    console.log(id);
    axiosInstance
      .get(`/single-booking?bookingId=${id}`, { withCredentials: true })
      .then((response) => {
        setBooking(response.data.bookings[0]);
        console.log(response.data.bookings[0]);
      })
      .catch((error) => {
        console.log('here', error);
      });
  }, [id]);

  const handleClick = async () => {
  
    axiosInstance
      .post(
        `/create-checkout-session`,
        { userId: user?._id, ...booking?.vendorId,bookingId:booking._id},
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response)
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((error) => {
        console.log('here', error);
      });
  };

  return (
    <>
      {booking.payment_status === 'Pending'&& booking.status==="Accepted" ? (
        <div className="mx-20 w-150">
          <Alert icon={<Icon />} color="red">
          Please complete your payment to confirm your booking.
          </Alert>
        </div>
      ) : (
        ''
      )}

      <div className="flex flex-col md:flex-row justify-between gap-4 mx-20">
        <Card
          className="mt-6 w-full px-5"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb-1 rounded-none border-b border-white/10 text-left p-5"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <div className="flex justify-between">
              <div>
                <Typography
                  variant="h5"
                  color="gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Event
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {booking?.eventName}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="h5"
                  color="gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Venue
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {booking?.city}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="h5"
                  color="gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Date
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {booking?.date}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="h5"
                  color="gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Status
                </Typography>
                <Typography
                  variant="small"
                  color={
                    booking?.status === 'Accepted'
                      ? 'green'
                      : booking?.status === 'Rejected'
                        ? 'red'
                        : 'blue'
                  }
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {booking?.status}
                </Typography>
              </div>
            </div>
          </CardHeader>
          <hr />
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <Typography
                  variant="h6"
                  color="gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Vendor
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {booking && booking.vendorId && booking.vendorId.name}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="h6"
                  color="gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Contact
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {booking && booking.vendorId && booking.vendorId.phone}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {booking && booking.vendorId && booking.vendorId.email}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="h6"
                  color="gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Address
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {booking && booking.vendorId && booking.vendorId.city}
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <Card
        className="mt-6 mb-20 mx-20"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-1 rounded-none border-b border-white/10 text-left p-5"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex justify-between">
            <div>
              <Typography
                variant="h5"
                color="gray"
                className="mb-2"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Payment Details
              </Typography>
              <Typography
                variant="h6"
                color="gray"
                className="mb-2"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Status :{' '}
                <span className={booking?.payment_status=="Completed"?"text-green-500":"text-blue-400"}>{booking?.payment_status}</span>
              </Typography>
            </div>
            <div>
              {booking.status==="Accepted" && booking.payment_status==="Pending"?<Button
                onClick={handleOpen}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Make Payment
              </Button>:""}
              
            </div>
          </div>
        </CardHeader>

        <CardBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex flex-col md:flex-row justify-between">
            <div></div>
            <div></div>
          </div>
        </CardBody>
      </Card>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Confirm Payment
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
           <Typography
            variant="small"
            color="red"
            className="mb-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Please note that the token amount is non-refundable in case of cancellation.
          </Typography>
          <Typography
            variant="h6"
            color="gray"
            className="mb-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Token Amount : 1000
          </Typography>
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleClick}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Proceed</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default SingleBooking;
