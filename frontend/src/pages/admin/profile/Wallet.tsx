import { Card, CardHeader, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import AdminRootState from "../../../redux/rootstate/AdminState";
import { axiosInstanceAdmin } from "../../../config/api/axiosinstance";
import { useEffect, useState } from "react";
import { AdminData } from "../../../types/adminTypes";
import { Payment } from "../../../types/commonTypes";
import Pagination from "../../../components/common/Pagination";

function Wallet() {
  const admin = useSelector((state: AdminRootState) => state.admin.admindata);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [adminData, setAdminData] = useState<AdminData>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchPayments(currentPage);
  }, [currentPage]);

  const formatDate = (createdAt: Date) => {
    const date = new Date(createdAt);

    const formattedDate = date.toLocaleDateString("en-US");
    return formattedDate;
  };

  const fetchPayments = async (page: number) => {
    axiosInstanceAdmin
      .get(`/all-payment-details?page=${page}`, { withCredentials: true })
      .then((response) => {
        setPayments(response.data.payment);
        setTotalPages(response.data.totalPages);
        console.log(response.data.payment);
      })
      .catch((error) => {
        console.log("here", error);
      });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    axiosInstanceAdmin
      .get(`/load-admin-data?adminId=${admin?._id}`, { withCredentials: true })
      .then((response) => {
        setAdminData(response.data.adminData);
        console.log(response.data.adminData);
      })
      .catch((error) => {
        console.log("here", error);
      });
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 overflow-x-auto">
      <Typography
        variant="h5"
        color="black"
        className="font-bold my-4 md:my-10"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Wallet
      </Typography>
      <Card
        color="gray"
        variant="gradient"
        className="max-w-xs md:max-w-md lg:max-w-lg p-4 mx-auto mb-6"
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
        className="h-full w-full overflow-x-auto"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <table className="w-full min-w-max table-auto text-left overflow-x-auto">
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
                    {item?.userId?.name}
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
        {payments.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                  isTable={true}
                />
              )}
      </Card>
    </div>
  );
}

export default Wallet;
