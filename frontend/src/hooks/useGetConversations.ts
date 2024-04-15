import { useEffect, useState } from 'react';
import UserRootState from '../redux/rootstate/UserState';
import { useSelector } from 'react-redux';
import VendorRootState from '../redux/rootstate/VendorState';
import { useLocation } from 'react-router-dom';

// import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const user = useSelector((state: UserRootState) => state.user.userdata);
  const vendor=useSelector((state: VendorRootState) => state.vendor.vendordata)
  const location = useLocation();
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

    const getVendorConversations=async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/message/get-vendor-conversations?vendorId=${vendor?._id}`);
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


    if(location.pathname==="/vendor/chat"){
        getVendorConversations();
    }else{
        getConversations();
    }
    
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
