import { Link } from "react-router-dom";
import { axiosInstanceVendor } from "../../../../config/api/axiosinstance";
import { useEffect, useState } from "react";
import { Chats } from "../../../../types/commonTypes";
import { UserData } from "../../../../types/userTypes";
import { VendorData } from "../../../../types/vendorTypes";
import {  parseISO } from 'date-fns';


interface ConversationsProps {
  conversation: Chats;
  currentUser: Partial<UserData | null>;
  active:boolean;
  currentchat:Chats | null
}
const formatMessageTime = (updatedAt:Date ) => {
  const createdAtDate = parseISO(updatedAt.toString());
  const now = new Date();
  const differenceInDays = Math.floor((now.getTime() - createdAtDate.getTime()) / (1000 * 60 * 60 * 24));

  if (differenceInDays === 0) {
    return new Date(createdAtDate).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } else if (differenceInDays === 1) {
    return "yesterday";
  } else {
    return new Date(createdAtDate).toLocaleDateString();
  }
};

const Conversation:React.FC<ConversationsProps>=({ conversation, currentUser, active, currentchat }) => {
  const [vendor, setVendor] = useState<VendorData>();
  const friendId = conversation.members.find((m) => m !== currentUser?._id);
  useEffect(() => {
    

    const getUser = async () => {
      try {
        await axiosInstanceVendor
          .get(`/getvendor?vendorid=${friendId}`)
          .then((res) => {
            setVendor(res.data.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation, active, currentchat,friendId]);



  return (
    <div>
      <div
        className={`relative rounded-lg px-2 py-2 flex items-center space-x-3 mb-3 ${currentchat?._id === conversation._id ? "bg-gray-300" : "bg-gray-50"}`}
      >
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={vendor?.logoUrl ? vendor.logoUrl : ""}
            alt=""
          />
        </div>
        <div className="flex-1 min-w-0">
          <Link to="" className="focus:outline-none">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-700">{vendor?.name}</p>
              <div className="text-gray-400 text-xs">{formatMessageTime(conversation?.updatedAt)}</div>
            </div>
            <div className="flex items-center justify-start">
              <p className="text-sm text-gray-500 truncate">{conversation?.recentMessage?.slice(0,10)}</p>
              {/* <div className="text-white text-xs bg-red-400 rounded-full px-1 py-0">
                2
              </div> */}
              {active ? (
                <span className="text-green-500">
                  <svg width={10} height={10}>
                    <circle cx={5} cy={5} r={5} fill="currentColor"></circle>
                  </svg>
                </span>
              ) : (
                ""
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
