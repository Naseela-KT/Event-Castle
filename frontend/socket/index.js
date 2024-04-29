// /* eslint-disable @typescript-eslint/no-var-requires */
// import { Server } from "socket.io";

// const io = new Server(8900, {
//   cors: {
//     origin: "http://localhost:5000",
//   },
// });

// let users = [];

// //methods

// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId, lastSeen: Date.now() });
// };

// const removeUser = (socketId) => {
//   users = users.filter((user) => {
//     return user.socketId !== socketId;
//   });
// };

// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };




// io.on("connection", (socket) => {
//   console.log("server started");

//   socket.on("adduser", (userId) => {
//     addUser(userId, socket.id);
//     io.emit("getUsers", users);
//   });

//   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//     const user = getUser(receiverId);
//     console.log(user);
//     if (user) {
//       io.to(user.socketId).emit("getMessage", {
//         senderId,
//         text,
//       });
//       console.log(senderId, text);
//     } else {
//       console.error("User not found:", receiverId);
//     }
//   });

//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//     io.emit("getUsers", users);
//   });

 
// });


