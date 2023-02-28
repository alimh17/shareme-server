"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket = (io) => {
    let users = [];
    const addUser = (userId, socketId) => {
        !users.some((user) => user.userId === userId) &&
            users.push({ userId, socketId });
    };
    const removeUser = (socketId) => {
        users = users.filter((user) => user.socketId !== socketId);
    };
    const getUser = (userId) => {
        return users.find((user) => user.userId === userId);
    };
    io.on("connection", (socket) => {
        socket.on("addUser", (userId) => {
            addUser(userId, socket.id);
        });
        socket.on("users", (data) => {
            const user = users.find((user) => user.userId === data);
            io.emit("status", user);
        });
        socket.on("sendMessage", (data) => {
            const user = getUser(data?.receiverId);
            io.to(user?.socketId).emit("getMessage", {
                senderId: data?.senderId,
                text: data?.text,
                time: data?.time,
            });
        });
        socket.on("disconnect", () => {
            removeUser(socket.id);
        });
    });
};
exports.default = socket;
