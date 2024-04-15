import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import UserRootState from "../redux/rootstate/UserState";
import { useSelector } from "react-redux";
import VendorRootState from "../redux/rootstate/VendorState";

const SocketContext = createContext('light');

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const user = useSelector((state: UserRootState) => state.user.userdata);
	const vendor = useSelector((state: VendorRootState) => state.vendor.vendordata);
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	

	useEffect(()=>{
		if (user || vendor) {
			let userId;
			if(user){
				userId=user?._id
			}
			if(vendor){
				userId=vendor?._id
			}
			const socket = io("http://localhost:3000", {
				
				query: {
					userId: userId,
				},
			});

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [user,vendor]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};