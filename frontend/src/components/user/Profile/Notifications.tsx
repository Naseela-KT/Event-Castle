import { useSelector } from "react-redux";
import UserRootState from "../../../redux/rootstate/UserState";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/api/axiosinstance";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import { Notification } from "../../../types/commonTypes";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { USER } from "../../../config/constants/constants";

const Notifications = () => {
  const [notifications, setNotification] = useState<Notification[]>([]);
  const user = useSelector((state: UserRootState) => state.user.userdata);
  useEffect(() => {
    axiosInstance
      .get(`/user-notifications?recipient=${user?._id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setNotification(response.data.notification);
        console.log(response.data.notification);
      })
      .catch((error) => {
        console.log("here", error);
      });
  }, []);

  const handleRead = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    axiosInstance
      .patch(
        `/toggle-read`,
        { id, recipient: user?._id },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setNotification(response.data.notification);
        toast.success("Status changed Successfully!");
        console.log(response.data.notification);
      })
      .catch((error) => {
        console.log("here", error);
      });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    axiosInstance
      .delete(
        `/notification?id=${id}&recipient=${user?._id}`,{withCredentials:true}
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

  return (
    <div>
    {notifications?.length > 0 ? (
      <div className="col-span-6 xl:col-span-4 mx-10 lg:mx-20">
        <Typography
          variant="h4"
          color="black"
          className="mt-4 mb-3"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Notifications
        </Typography>
        {notifications?.map((data, key) => (
          <div
            className="block rounded-sm border border-warning border-stroke bg-white mb-4 shadow-default dark:border-strokedark dark:bg-boxdark hover:shadow-lg"
            key={key}
          >
            <div
              className={`${!data.read ? "bg-[#66615b] p-4  bg-opacity-30" : "bg-gray-400 p-4  bg-opacity-30"}`}
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
                        className="absolute top-6 right-1 bg-black text-white text-xs px-2 py-1 rounded-full"
                        onClick={(e) => handleRead(e, data?._id)}
                      >
                        Mark as read
                      </button>
                    ) : (
                      <button
                        className="absolute top-6 right-1 bg-brown-400 text-white text-xs px-2 py-1 rounded-full"
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
                    <Link to={`${USER.PROFILE}${USER.BOOKING_DETAILS}`}>
                          <button className="absolute top-6 right-25 text-xs text-white bg-blue-300 px-2 py-1 rounded-full">
                            View
                          </button>
                        </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
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

export default Notifications;
