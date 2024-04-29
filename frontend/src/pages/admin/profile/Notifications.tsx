import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import AdminRootState from "../../../redux/rootstate/AdminState";
import { axiosInstanceAdmin } from "../../../config/api/axiosinstance";
import { Notification } from "../../../types/commonTypes";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ADMIN} from "../../../config/constants/constants";



const Notifications = () => {
  const [notifications, setNotification] = useState<Notification[]>([]);
  const admin = useSelector(
    (state: AdminRootState) => state.admin.admindata,
  );
  useEffect(() => {
    axiosInstanceAdmin
      .get(`/admin-notifications?recipient=${admin?._id}`, {
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

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    axiosInstanceAdmin
      .delete(
        `/notification?id=${id}&recipient=${admin?._id}`,{withCredentials:true}
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
    <Card
      className="m-20 pt-2 h-screen bg-gray-50"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 mx-10"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Unread Messages
        </Typography>
        <div className="col-span-6 xl:col-span-4 mx-10">
          {notifications?.map((data, key) => (
            <div
              className="block rounded-sm border border-warning border-stroke bg-white mb-4 shadow-default dark:border-strokedark dark:bg-boxdark hover:shadow-lg"
              key={key}
            >
              <div
                className={`${!data.read ? "bg-[#66615b] p-4  bg-opacity-30" : "bg-gray-300 p-4  bg-opacity-30"}`}
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
                        onClick={(e)=>handleDelete(e,data?._id)}
                      >
                        <i className="fa-solid fa-x text-xs"></i>
                      </button>
                      <Link to={`${data.type=="NEW_USER"?ADMIN.USERS:data.type=="NEW_VENDOR"?ADMIN.VENDORS:ADMIN.WALLET}`}>
                        <button className="absolute -mx-1 top-6 right-30 text-xs text-white px-2 py-1 rounded-full bg-blue-300">
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
      </CardBody>
    </Card>
     ) : (
      <Typography variant="h6" color="red" className="text-center mt-4"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        No notifications yet
      </Typography>
    )}
  </div>
);
}

export default Notifications