import { Card, CardHeader, Typography } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import AdminRootState from '../../../redux/rootstate/AdminState';
import { axiosInstanceAdmin } from '../../../api/axiosinstance';
import { useEffect, useState } from 'react';
import { AdminData } from '../../../redux/slices/AdminSlice';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
}
interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: number;
  city: string;
  password: string;
  isActive: boolean;
  isVerified: boolean;
  verificationRequest: boolean;
  totalBooking: number;
  coverpicUrl: string;
  logoUrl: string;
}

interface booking {
  date: string;
  name: string;
  eventName: string;
  city: string;
  pin: number;
  mobile: number;
  createdAt: Date;
  vendorId: string;
  userId: string;
  status: string;
  payment_status: string;
  amount: number;
}

interface payment {
  _id: string;
  amount: number;
  vendorId: Vendor;
  userId: User;
  bookingId: booking;
  createdAt: Date;
}

function Wallet() {
  const admin = useSelector((state: AdminRootState) => state.admin.admindata);
  const [payments, setPayments] = useState<payment[]>([]);
  const [adminData,setAdminData]=useState<AdminData>({})

  const formatDate = (createdAt: Date) => {
    const date = new Date(createdAt);

    const formattedDate = date.toLocaleDateString('en-US');
    return formattedDate;
  };

  useEffect(() => {
    axiosInstanceAdmin
      .get(`/all-payment-details`, { withCredentials: true })
      .then((response) => {
        setPayments(response.data.payment);
        console.log(response.data.payment);
      })
      .catch((error) => {
        console.log('here', error);
      });

    axiosInstanceAdmin
      .get(`/load-admin-data?adminId=${admin?._id}`, { withCredentials: true })
      .then((response) => {
        setAdminData(response.data.adminData);
        console.log(response.data.adminData);
      })
      .catch((error) => {
        console.log('here', error);
      });
  }, []);

  return (
    <div className="mx-20">
      <Typography
        variant="h5"
        color="black"
        className="font-bold m-10"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Wallet
      </Typography>
      <Card
        color="gray"
        variant="gradient"
        className="max-w-[20rem] p-4 mx-auto mb-10"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-2 rounded-none border-b border-white/10 text-center"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            variant="small"
            color="white"
            className="font-normal uppercase"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Amount
          </Typography>
          <Typography
            variant="h5"
            color="white"
            className="mt-2 text-3xl font-normal"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            ₹{adminData?.wallet}
          </Typography>
        </CardHeader>
      </Card>

      <Card
        className="h-full w-full overflow-scroll"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Payment_ID
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  User
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Vendor
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Event
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Date
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Amount
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {item._id}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {item.userId.name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {item.vendorId.name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {item.bookingId.eventName}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {formatDate(item.createdAt)}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {item.amount}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default Wallet;
