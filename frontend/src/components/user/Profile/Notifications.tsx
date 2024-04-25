import { useSelector } from "react-redux";
import UserRootState from "../../../redux/rootstate/UserState";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/api/axiosinstance";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import { Notification } from "../../../types/commonTypes";


const Notifications = () => {
  const [notifications, setNotification] = useState<Notification[]>([]);
  const user = useSelector(
    (state: UserRootState) => state.user.userdata,
  );
  useEffect(() => {
    axiosInstance
      .get(`/user-notifications?userId=${user?._id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setNotification(response.data.notification);
        console.log(response.data.notification);
      })
      .catch((error) => {
        console.log('here', error);
      });
  }, [notifications]);


  const handleRead = async (e: React.MouseEvent<HTMLButtonElement>,id: string) => {
    e.preventDefault();
    axiosInstance
      .patch(`/toggle-read`,{id,recipient:user?._id}, {
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

  return (
    <div className="col-span-6 xl:col-span-4 mx-20">
      {notifications?.map((data, key) => (
        <div
          className="block rounded-sm border border-warning border-stroke bg-white mb-4 shadow-default dark:border-strokedark dark:bg-boxdark hover:shadow-lg"
          key={key}
        >
          <div className="p-6 bg-[#6d5f53] bg-opacity-30">
            <div className="flex items-center gap-5">
              <div className="relative flex flex-1 items-center justify-between">
                <div>
                  <h5 className="font-medium text-black dark:text-white">
                    {data?.message}
                  </h5>
                  <p>
                    {/* <span className="text-sm text-black dark:text-white">
                      {chat.text}
                    </span> */}
                    <span className="text-xs"> {format(data.createdAt)}</span>
                  </p>
                  {!data?.read ? (
                    <button className="absolute top-2 right-2 bg-black text-white text-sm px-3 py-2 rounded-full"
                    onClick={(e) => handleRead(e, data?._id)}>
                      Mark as read
                    </button>
                  ) : (
                    <button className="absolute top-2 right-2 bg-brown-400 text-white text-sm px-3 py-2 rounded-full"
                    onClick={(e) => handleRead(e, data?._id)}>
                      Mark as unread
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notifications