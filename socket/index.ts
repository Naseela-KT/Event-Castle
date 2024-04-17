import { Server, Socket } from 'socket.io';

const io = new Server(8900, {
    cors: {
        origin: "http://localhost:5000",
        
    }
});

interface User {
    userId: string;
    socketId: string;
    lastSeen: number;
}

let users: User[] = [];

const addUser = (userId: string, socketId: string) => {
    if (!users.some((user) => user.userId === userId)) {
        users.push({ userId, socketId, lastSeen: Date.now() });
    } else {
        console.error("User with ID already exists:", userId);
    }
}

const removeUser = (socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId);
}

const getUser = (userId: string) => {
    return users.find((user) => user.userId === userId);
}

const updateUserLastSeen = (socketId: string) => {
    const user = users.find(user => user.socketId === socketId);
    if (user) {
        user.lastSeen = Date.now();
    }
};

const isUserActive = (lastSeen: number) => {
    const heartbeatInterval = 60000; // 1 minute interval for heartbeat
    return Date.now() - lastSeen <= heartbeatInterval;
};

const emitActiveStatus = () => {
    const activeUsers = users.map(user => ({
        userId: user.userId,
        active: isUserActive(user.lastSeen)
    }));
    io.emit("activeStatus", activeUsers);
    console.log("active user from socket", activeUsers)
};

io.on("connection", (socket: Socket) => {
    console.log("user connected to socket");

    socket.on("adduser", (userId: string) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }: { senderId: string, receiverId: string, text: string }) => {
        const user = getUser(receiverId);
        if (user) {
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text
            });
        } else {
            io.to(socket.id).emit("error", { message: "User not found" });
        }
    });

    socket.on("typing", ({ receiverId }: { receiverId: string }) => {
        const user = getUser(receiverId);
        if (user) {
            console.log(user);
            io.to(user.socketId).emit("typingsent", {
                senderId: socket.id,
            });
        } else {
            console.error('User not found:', receiverId);
            console.log(users)
        }
    });

    socket.on("stopTyping", ({ receiverId }: { receiverId: string }) => {
        const user = getUser(receiverId);
        if (user) {
            console.log(user);
            io.to(user.socketId).emit("stopTypingsent", {
                senderId: socket.id,
            });
        } else {
            console.error('User not found:', receiverId);
        }
    });

    //when disconnect 
    socket.on("disconnect", () => {
        removeUser(socket.id);
        io.emit("getUsers", users);
    });

    socket.on("heartbeat", () => {
        updateUserLastSeen(socket.id);
    });
});
const HEARTBEAT_INTERVAL = 60000;

setInterval(emitActiveStatus, HEARTBEAT_INTERVAL);
