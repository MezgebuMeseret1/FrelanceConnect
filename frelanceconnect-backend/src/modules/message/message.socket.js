let onlineUsers = new Map();

export const initMessageSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("sendMessage", (data) => {
      const receiverSocket = onlineUsers.get(data.receiverId);

      if (receiverSocket) {
        io.to(receiverSocket).emit("newMessage", data);
      }
    });

    socket.on("disconnect", () => {
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });
};