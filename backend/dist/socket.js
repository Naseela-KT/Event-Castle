"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const initializeSocket = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: ["http://localhost:5000", "http://localhost:3000"],
        },
    });
    let users = [];
    // methods
    const addUser = (userId, socketId) => {
        if (!users.some((user) => user.userId === userId)) {
            users.push({ userId, socketId, lastSeen: Date.now() });
        }
    };
    const removeUser = (socketId) => {
        users = users.filter((user) => user.socketId !== socketId);
    };
    const getUser = (userId) => {
        return users.find((user) => user.userId === userId);
    };
    io.on("connection", (socket) => {
        console.log("server started");
        socket.on("adduser", (userId) => {
            addUser(userId, socket.id);
            io.emit("getUsers", users);
        });
        socket.on("sendMessage", (message) => {
            const user = getUser(message.receiverId);
            if (user) {
                io.to(user.socketId).emit("getMessage", {
                    senderId: message.senderId,
                    text: message.text,
                    imageName: message.imageName,
                    imageUrl: message.imageUrl,
                });
                console.log(message.receiverId, message.text);
            }
            else {
                console.error("User not found:", message.receiverId);
            }
        });
        socket.on("disconnect", () => {
            removeUser(socket.id);
            io.emit("getUsers", users);
        });
    });
};
exports.default = initializeSocket;
