import { UserData } from "../../../../types/userTypes";

interface ChatProfileProps {
  user?: UserData;
}
const ChatProfile: React.FC<ChatProfileProps> = ({user}) => {
  
  return (
    <div className="h-full relative">
    <div className="m-auto text-center mb-10">
      <img
        className="w-36 h-36 rounded-full m-auto"
        src={user?.imageUrl?user?.imageUrl:"/imgs/vendor/user-default.svg"}
        alt=""
      />
      <h2 className="m-auto text-2xl mt-2">{user?.name}</h2>
    </div>
   
  </div>
  )
}

export default ChatProfile