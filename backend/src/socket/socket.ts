import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5000"],
		methods: ["GET", "POST"],
		credentials:true
	},
});
interface UserSocketMap {
    [userId: string]: string; // Assuming socket IDs are strings
}

const userSocketMap: UserSocketMap = {};

export const getReceiverSocketId = (receiverId: string): string | undefined => {
    return userSocketMap[receiverId];
};
// {userId: socketId}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (typeof userId === "string") { // Check if userId is a string
        userSocketMap[userId] = socket.id;

        // io.emit() is used to send events to all the connected clients
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        // socket.on() is used to listen to the events. can be used both on client and server side
        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    } else {
        console.log("Invalid userId:", userId);
    }
});

export { app, io, server };