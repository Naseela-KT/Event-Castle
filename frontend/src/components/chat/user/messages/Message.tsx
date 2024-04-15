import { useSelector } from "react-redux";
import UserRootState from "../../../../redux/rootstate/UserState";
import {format} from 'timeago.js'

const Message = ({message}) => {
  const user = useSelector((state: UserRootState) => state.user.userdata);
  const fromMe = message.senderId === user?._id;
  return (
    <>
    {fromMe?<div className="chat-message mb-0 flex flex-col">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs mfx-w-xs mx-2 order-2 items-end">
          <div>
            <span className="px-4 py-2 rounded-1g inline-block rounded-bl-none bg-red-500 text-white">
            {message.message}
            </span>
          </div>
        </div>
        {/* <img
          src={user?.imageUrl}
          className="w-6 h-6 rounded-full order-2"
        /> */}
       
      </div> 
   
      <p className="flex items-end justify-end text-xs text-gray-500 mr-2">{format(message.createdAt)}</p>
    </div>: <div className="chat-message flex flex-col">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
              {message.message}
            </span>
          </div>
        </div>
        {/* <img
          src={user?.imageUrl}
          className="v-6 h-6 rounded-full order-1"
        /> */}
      </div>
      <p className="text-xs text-gray-500 ml-2">{format(message.createdAt)}</p>
    </div> }
  
    </>
  )
}

export default Message