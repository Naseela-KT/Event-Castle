import { Server, Socket} from "socket.io";

// User type definition
interface User {
  userId: string;
  socketId: string;
  lastSeen: number;
}

const initializeSocket = (httpServer: any) => {

  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5000", "http://localhost:3000"],
    },
  });

  let users: User[] = [];

  // methods

  const addUser = (userId: string, socketId: string): void => {
    if (!users.some((user) => user.userId === userId)) {
      users.push({ userId, socketId, lastSeen: Date.now() });
    }
  };

  const removeUser = (socketId: string): void => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId: string): User | undefined => {
    return users.find((user) => user.userId === userId);
  };

  io.on("connection", (socket: Socket) => {
    console.log("server started");

    socket.on("adduser", (userId: string) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
 
    });

    socket.on(
      "sendMessage",
      (message: {
        senderId: string;
        receiverId: string;
        text: string;
        imageName: string;
        imageUrl: string;
      }) => {
        const user = getUser(message.receiverId);
        if (user) {
  
          io.to(user.socketId).emit("getMessage", {
            senderId: message.senderId,
            text: message.text,
            imageName: message.imageName,
            imageUrl: message.imageUrl,
          });

          console.log(message.receiverId, message.text);
        } else {
          console.error("User not found:", message.receiverId);
        }
      }
    );

    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });

};

export default initializeSocket;
