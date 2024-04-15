import { useSelector } from "react-redux";
import UserRootState from "../../../redux/rootstate/UserState";

const Message = ({message}) => {
  const user = useSelector((state: UserRootState) => state.user.userdata);
  return (
    <>
     {/* <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
              {message.message}
            </span>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80"
          className="v-6 h-6 rounded-full order-1"
        />
      </div>
    </div> */}
    <div className="chat-message mb-0">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs mfx-w-xs mx-2 order-2 items-end">
          <div>
            <span className="px-4 py-2 rounded-1g inline-block rounded-bl-none bg-red-500 text-white">
            {message.message}
            </span>
          </div>
        </div>
        <img
          src={user?.imageUrl}
          className="w-6 h-6 rounded-full order-2"
        />
      </div> 
    </div>
    </>
  )
}

export default Message