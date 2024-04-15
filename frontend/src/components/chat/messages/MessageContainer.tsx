
import useConversation from "../../../zustand/useConversation";
import MessageInput from "./MessageInput"
import Messages from "./Messages"

const MessageContainer = () => {
  const { selectedConversation} = useConversation();
  return (
    <div className="flex-1 p-2 sm:pb-6 justify-between  flex-col h-screen hidden xl:flex">
    <div className="flex sm:items-center  justify-between py-3 border-b border-gray-200 p-3">
      <div className="flex items-center space-x-4">
        <img
          src={selectedConversation?selectedConversation.logoUrl:""}
          alt=""
          className="w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor pointer"
        />
        <div className="flex flex-col leading-tight">
          <div className="text-1xl mt-1 flex items-center">
            <span className="text-gray-700 mr-3">{selectedConversation?selectedConversation.name:""}</span>
            <span className="text-green-500">
              <svg width={10} height={10}>
                <circle
                  cx={5}
                  cy={5}
                  r={5}
                  fill="currentColor"
                ></circle>
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button className="inline-flex items-center justify-center rounded-full h-1@ w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>

    {/* message */}
   <Messages/>
    {/*message ends here*/}
    <div className="border-t-2 border-gray-200 px-4 pt-4">
      <MessageInput/>
    </div>
  </div>
  )
}

export default MessageContainer