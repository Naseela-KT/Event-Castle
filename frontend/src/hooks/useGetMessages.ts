import { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import UserRootState from '../redux/rootstate/UserState';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import VendorRootState from '../redux/rootstate/VendorState';
import useVendorConversation from '../zustand/useVendorConversation';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { messagesV, setMessagesV, selectedConversationV } =
    useVendorConversation();
  const user = useSelector((state: UserRootState) => state.user.userdata);
  const vendor = useSelector(
    (state: VendorRootState) => state.vendor.vendordata,
  );
  const location = useLocation();
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        if (location.pathname === '/vendor/chat') {
          const res = await fetch(
            `/api/message/get-messages?receiverId=${selectedConversationV._id}&userId=${vendor?._id}`,
          );
          const data = await res.json();
          if (data.error) throw new Error(data.error);
          setMessagesV(data);
        } else {
          const res = await fetch(
            `/api/message/get-messages?receiverId=${selectedConversation._id}&userId=${user?._id}`,
          );
          const data = await res.json();
          setMessages(data);
          if (data.error) throw new Error(data.error);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id || selectedConversationV?._id) getMessages();
  }, [
    selectedConversation?._id,
    selectedConversationV?._id,
    setMessages,
    setMessagesV,
  ]);

  return { messages, loading, messagesV };
};
export default useGetMessages;
