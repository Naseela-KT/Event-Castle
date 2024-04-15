import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import UserRootState from "../redux/rootstate/UserState";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import VendorRootState from "../redux/rootstate/VendorState";
import useVendorConversation from "../zustand/useVendorConversation";

const useSendMessage = () => {
	const user = useSelector((state: UserRootState) => state.user.userdata);
	const [loading, setLoading] = useState(false);
	const vendor=useSelector((state: VendorRootState) => state.vendor.vendordata)
	const location = useLocation();
	const { messages, setMessages, selectedConversation } = useConversation();
	const { messagesV, setMessagesV, selectedConversationV } = useVendorConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			let data
			if(location.pathname==="/vendor/chat"){
				const res = await fetch(`/api/message/send/${selectedConversationV._id}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ message,senderId:vendor?._id}),
				});
				data = await res.json();
				setMessagesV([...messagesV, data]);
			}else{
				const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ message,senderId:user?._id}),
				});
				data = await res.json();
				setMessages([...messages, data]);
				
			}
				
			
			if (data.error) throw new Error(data.error);

			
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;