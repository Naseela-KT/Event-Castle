import { useEffect, useState } from 'react';
import UserRootState from '../redux/rootstate/UserState';
import { useSelector } from 'react-redux';

// import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const user = useSelector((state: UserRootState) => state.user.userdata);
  useEffect(() => {
    const getConversations = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/message/get-user-conversations?userId=${user?._id}`);
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setConversations(data);
        } catch (error) {
            // toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
