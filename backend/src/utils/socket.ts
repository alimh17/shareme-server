const socket = (io: any) => {
  let users: any[] = [];

  const addUser = (userId: string, socketId: string) => {
    !users.some((user: any) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId: string) => {
    users = users.filter((user: any) => user.socketId !== socketId);
  };

  const getUser = (userId: string) => {
    return users.find((user: any) => user.userId === userId);
  };

  io.on("connection", (socket: any) => {
    socket.on("addUser", (userId: string) => {
      addUser(userId, socket.id);
    });

    socket.on("sendMessage", (data: any) => {
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

export default socket;
