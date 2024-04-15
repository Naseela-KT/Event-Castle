import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useLocation } from "react-router-dom";
import useVendorConversation from "../zustand/useVendorConversation";


const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();
	const { messagesV, setMessagesV } = useVendorConversation();
	const location=useLocation()

	useEffect(() => {
		if(location.pathname=="/vendor/chat"){
			socket?.on("newMessage", (newMessage: { shouldShake: boolean; }) => {
				newMessage.shouldShake = true;
				setMessagesV([...messagesV, newMessage]);
			});
	
			return () => socket?.off("newMessage");
		}else{
			socket?.on("newMessage", (newMessage: { shouldShake: boolean; }) => {
				newMessage.shouldShake = true;
				setMessages([...messages, newMessage]);
			});
	
			return () => socket?.off("newMessage");
		}
		
	}, [socket, setMessages, messages,setMessagesV,messagesV]);
};
export default useListenMessages;