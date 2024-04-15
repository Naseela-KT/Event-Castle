

import { Link } from 'react-router-dom'
import useVendorConversation from '../../../../zustand/useVendorConversation';
import useGetMessages from '../../../../hooks/useGetMessages';

interface conversationProps{
  _id:string;
  name:string;
  logoUrl:string;
}

const Conversation:React.FC<conversationProps>=({conversation}) => {
  const { selectedConversationV, setSelectedConversationV } = useVendorConversation();

	const isSelected = selectedConversationV?._id ===conversation._id;
  const { messagesV} = useGetMessages();
	// const { onlineUsers } = useSocketContext();
	// const isOnline = onlineUsers.includes(conversation._id);
  return (
    <div>
         <div className={`relative rounded-lg px-2 py-2 flex items-center space-x-3 mb-3 
      ${isSelected ? 'bg-gray-400' : 'bg-gray-200 hover:bg-gray-400'}`}
    onClick={() => setSelectedConversationV(conversation)}>
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={conversation.imageUrl}
            alt=""
          />
        </div>
        <div className="flex-1 min-w-0">
          <Link to="" className="focus:outline-none">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-red-600">{conversation.name}</p>
              <div className="text-gray-400 text-xs">12:34 AM</div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 truncate">{messagesV?messagesV[messagesV.length-1]?.message:""}</p>
              <div className="text-white text-xs bg-red-400 rounded-full px-1 py-0">
                2
              </div>
            </div>
          </Link>
        </div>
      </div>

   
    </div>
  )
}

export default Conversation