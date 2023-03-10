const {
  createRoom,
  newMessage,
  generateRoomId,
  seenChat,
  getCount,
  addCount,
} = require("../utils/chats");
const userSerivces = require("../services/userServices");
const { getUserSocket } = require("../utils/userSocketId");
//const exceptionErrorsModel = require("../models/exceptionErrorsModel");

module.exports = (socket, io) => {
  socket.on("chat", (data, callback) => {
    try {
      // data = decryptData(JSON.parse(data).cipher);
      const { sender, receiver } = data;
      // console.log(data);
      const room = generateRoomId(sender, receiver);
      console.log("room", room);
      // console.log(room);
      socket.join(room);
      // console.log(socket.rooms);
      const chat = createRoom(sender, receiver);
      console.log("chat", chat);
      // console.log(chat);
      socket.emit("chat", { chat });
      //callback({ msg: "Chat", chat });
    } catch (error) {
      try {
        const err = new exceptionErrorsModel({ error });
        err.save();
      } catch {}
      console.log(error);
      socket.emit("error", { msg: error.message });
    }
  });
  socket.on("sendMessage", async (data, callback) => {
    try {
      //data = decryptData(JSON.parse(data).cipher);
      const { userId, name, message, receiver } = data;
      console.log(data);
      const sendMessage = newMessage(userId, name, message, receiver);
      const room = generateRoomId(userId, receiver);
      var sendToReciver = false;
      const receiverSocket = getUserSocket(receiver);
      // const rooms = io.sockets.adapter.rooms;
      // console.log(rooms)
      // console.log(rooms);
      // chatRoom = rooms.get(room);
      // chatRoom.forEach((item) => {
      //   if (item == receiverSocket.socketId) {
      //     console.log("in chat");
      //     sendToReciver = true;
      //   }
      // });
      // const sockets = io.sockets.adapter.rooms.get(room);
      // for (let i = 0; i < sockets.length; i++) {
      //   if (sockets[i][receiverSocket.socketId]) {
      //     sendToReciver = true;
      //     break;
      //   }
      // }
      // if (sendToReciver) {
      io.to(room).emit("newMessage", {
        userId,
        name,
        message,
        receiver,
      });
      // } else {
      const count = addCount(userId, receiver);
      console.log(count);
      if (receiverSocket)
        io.to(receiverSocket.socketId).emit("newMessageReceived", {
          userId: receiver,
          count,
          sender: userId,
        });
      // }
      // const user = await userSerivces.getUserById(receiver);
      // user.fcmToken &&
      //   (await notificationServices.newNotification(
      //     message,
      //     "You have a new message",
      //     user.fcmToken,
      //     {}
      //   ));
    } catch (error) {
      //   try {
      //     const err = new exceptionErrorsModel({ error });
      //     err.save();
      //   } catch {}
      console.log(error);
      socket.emit("error", { msg: error.message });
    }
  });

  socket.on("leaveChatRoom", (data, callback) => {
    try {
      // data = decryptData(JSON.parse(data).cipher);
      const { sender, receiver } = data;
      const roomId = generateRoomId(sender, receiver);
      socket.leave(roomId);
      // console.log(socket.rooms);
    } catch (error) {
      try {
        const err = new exceptionErrorsModel({ error });
        err.save();
      } catch {}
      console.log(error);
      socket.emit("error", { msg: error.message });
    }
  });

  // socket.on("markSeen", (data, callback) => {
  //   const { user, other } = data;
  //   seenChat(user, other);
  // });

  // socket.on("chatCount", (data, callback) => {
  //   const { user, other } = data;
  //   const count = getCount(user, other);
  //   callback({ count });
  // });
  // socket.on('deleteChat',JSON.stringify(//))
};
