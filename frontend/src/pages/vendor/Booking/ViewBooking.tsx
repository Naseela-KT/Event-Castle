import DefaultLayout from '../../../layout/vendor/VendorLayout';
import Breadcrumb from '../../../components/vendor/Breadcrumbs/Breadcrumb';
import {
  Card,
  CardBody,
  Typography,
  CardHeader,
} from '@material-tailwind/react';
import UpdateStatus from './UpdateStatus';
import { useEffect, useState } from 'react';
import { axiosInstanceVendor } from '../../../config/api/axiosinstance';
import { useLocation } from 'react-router-dom';
import { Booking } from '../../../types/commonTypes';


const ViewBooking = () => {
  const [bookings, setBookings] = useState<Booking>({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  useEffect(() => {
    axiosInstanceVendor
      .get(`/single-booking-details?bookingId=${id}`, { withCredentials: true })
      .then((response) => {
        setBookings(response.data.bookings[0]);
        console.log(response.data.bookings[0]);
      })
      .catch((error) => {
        console.log('here', error);
      });
  }, [id]);

  const handleStatusChange = (newStatus: string) => {
    setBookings((prevBookings) => ({
      ...prevBookings,
      status: newStatus,
    }));
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="View" folderName="Booking" />
      <div className="flex flex-col md:flex-row justify-between gap-4">
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
                  {bookings.eventName}
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
                  {bookings.city}
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
                  {bookings.date}
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
                    bookings.status === 'Accepted'
                      ? 'green'
                      : bookings.status === 'Rejected'
                        ? 'red'
                        : 'blue'
                  }
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {bookings.status}
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
                  Customer
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {bookings.name}
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
                  {bookings.mobile}
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
                  {bookings.city}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="mb-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {bookings.pin}
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>
        <UpdateStatus
          bookingId={bookings._id}
          onStatusChange={handleStatusChange}
        />
      </div>
      <Card
        className="mt-6 w-full mb-20"
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
            <span className="text-blue-200">{bookings.payment_status}</span>
          </Typography>
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
    </DefaultLayout>
  );
};

export default ViewBooking;
