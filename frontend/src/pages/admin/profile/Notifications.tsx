import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import AdminRootState from "../../../redux/rootstate/AdminState";
import { axiosInstanceAdmin } from "../../../api/axiosinstance";

interface chat {
  _id:string;
  message: string;
  read: boolean;
  createdAt: string;
}

const Notifications = () => {
  const [notifications, setNotification] = useState<chat[]>([]);
  const admin = useSelector(
    (state: AdminRootState) => state.admin.admindata,
  );
  useEffect(() => {
    axiosInstanceAdmin
      .get(`/admin-notifications?adminId=${admin?._id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setNotification(response.data.notification);
        console.log(response.data.notification);
      })
      .catch((error) => {
        console.log('here', error);
      });
  }, []);


  const handleRead = async (e: React.MouseEvent<HTMLButtonElement>,id: string) => {
    e.preventDefault();
    axiosInstanceAdmin
      .patch(`/toggle-read`,{id,recipient:admin?._id}, {
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
    <div className="col-span-6 xl:col-span-4 mx-50 mt-20">
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