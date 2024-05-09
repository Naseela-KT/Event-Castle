import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import VendorRootState from '../../../redux/rootstate/VendorState';
import { axiosInstanceVendor } from '../../../config/api/axiosinstance';
import { format } from 'timeago.js';
import { toast } from 'react-toastify';
import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { Notification } from '../../../types/commonTypes';
import { VENDOR } from '../../../config/constants/constants';
import Pagination from '../../common/Pagination';




const ChatCard = () => {
  const [notifications, setNotification] = useState<Notification[]>([]);
  const vendor = useSelector(
    (state: VendorRootState) => state.vendor.vendordata,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchNotification(currentPage);
  }, [currentPage]);


  const fetchNotification = async (page: number) => {
    axiosInstanceVendor
      .get(`/vendor-notifications?recipient=${vendor?._id}&page=${page}`, {
        withCredentials: true,
      })
      .then((response) => {
        setNotification(response.data.notification);
        const totalPagesFromResponse = response.data.totalPages;
        setTotalPages(totalPagesFromResponse);
        console.log(response.data.notification);
      })
      .catch((error) => {
        console.log('here', error);
      });
  };


  const handleRead = async (e: React.MouseEvent<HTMLButtonElement>,id: string) => {
    e.preventDefault();
    axiosInstanceVendor
      .patch(`/toggle-read`,{id,recipient:vendor?._id}, {
        withCredentials: true,
      })
      .then((response) => {
        setNotification(response.data.notification);
        toast.success("Status changed Successfully!")
        console.log(response.data.notification);
      })
      .catch((error) => {
        console.log('here', error);
      });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    axiosInstanceVendor
      .delete(
        `/notification?id=${id}&recipient=${vendor?._id}`,{withCredentials:true}
      )
      .then((response) => {
        setNotification(response.data.notification);
        toast.success("Deleted Successfully!");
        console.log(response.data.notification);
      })
      .catch((error) => {
        console.log("here", error);
      });
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
    {notifications?.length > 0 ? (
      <div className="col-span-6 xl:col-span-4 mx-10 lg:mx-20">
       
        {notifications?.map((data, key) => (
          <div
            className="block rounded-sm border border-warning border-stroke bg-white mb-4 shadow-default dark:border-strokedark dark:bg-boxdark hover:shadow-lg"
            key={key}
          >
            <div
              className={`${!data.read ? "bg-gray-400 p-4  bg-opacity-30" : "bg-gray-100 p-4  bg-opacity-30"}`}
            >
              <div className="flex items-center gap-5">
                <div className="relative flex flex-1 items-center justify-between">
                  <div>
                    <h5 className="font-medium text-black dark:text-white">
                      {data?.message}
                    </h5>
                    <p>
                      <span className="text-xs">
                        {" "}
                        {format(data.createdAt)}
                      </span>
                    </p>
                    {!data?.read ? (
                      <button
                        className="absolute top-6 right-1 bg-pink-400 text-white text-xs px-2 py-1 rounded-full"
                        onClick={(e) => handleRead(e, data?._id)}
                      >
                        Mark as read
                      </button>
                    ) : (
                      <button
                        className="absolute top-6 right-1 bg-gray-900 text-white text-xs px-2 py-1 rounded-full"
                        onClick={(e) => handleRead(e, data?._id)}
                      >
                        Mark as unread
                      </button>
                    )}
                    <button
                      className="absolute -top-2 right-0"
                      onClick={(e) => handleDelete(e, data?._id)}
                    >
                      <i className="fa-solid fa-x text-xs"></i>
                    </button>
                    <Link to={`${data.type=="BOOKING" || data.type=="PAYMENT"?VENDOR.BOOKING_HISTORY:""}`}>
                    <button className={`absolute top-6  text-xs text-white bg-blue-300 px-2 py-1 rounded-full ${!data?.read? 'right-24':'right-28'}`}>
                            View
                          </button>
                      </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
         {notifications.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          isTable={false}
        />
      )}
      </div>
    ) : (
      <Typography
        variant="h6"
        color="red"
        className="text-center mt-4"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        No notifications yet
      </Typography>
    )}
     
  </div>
);

};

export default ChatCard;
