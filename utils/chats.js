const { default: mongoose } = require("mongoose");
const chatModel = require("../model/chatModel");

let chats = [];

//creating room for chat service
const createRoom = (user1, user2) => {
  const roomId = generateRoomId(user1, user2);
  //check if room already created or not
  const anyChat = getChat(user1, user2);
  //if room is already created then
  if (anyChat) {
    console.log("room already exist!");
    // console.log(anyChat);
    seenChat(user1, user2);
    return anyChat;
  }
  //if room is not created then create a room and send chat array
  else {
    const newRoom = {
      roomId,
      chat: [],
      seen: {
        user1: {
          user: user1,
          count: 0,
        },
        user2: {
          user: user2,
          count: 0,
        },
      },
    };
    chats.push(newRoom);
    console.log("room created", chats);
    return newRoom.chat;
  }
};

//new message service to add message in room's chat
const newMessage = (userId, name, message, receiver) => {
  //create a room id
  const roomId = generateRoomId(userId, receiver);
  // console.log({ userId, receiver });
  //find the room and update chat array of the room
  chats.forEach((item, index) => {
    if (item.roomId === roomId) {
      chats[index].chat.push({
        userId,
        name,
        // profileImage,
        message,
        receiver,
        // date,
      });
      // chats[index].seen.user1 == userId
      //   ? (chats[index].seen.user2.status = false)
      //   : (chats[index].seen.user1.status = false);
    }
    // console.log(chats[index].chat);
  });
};

const seenChat = (user1, user2) => {
  //create a room id
  const roomId = generateRoomId(user1, user2);
  //find the room and update chat array of the room
  chats.forEach((item, index) => {
    if (item.roomId === roomId) {
      chats[index].seen.user1.user == user1
        ? (chats[index].seen.user1.count = 0)
        : (chats[index].seen.user2.count = 0);
    }
    // console.log(chats[index]);
  });
};

const addCount = (user1, user2) => {
  console.log("user1", user1, "user2", user2);
  const roomId = generateRoomId(user1, user2);
  //find the room and update chat array of the room
  for (var i = 0; i < chats.length; i++) {
    if (chats[i].roomId === roomId) {
      if (chats[i].seen.user1.user == user1) {
        ++chats[i].seen.user2.count;
        // console.log(chats[i].seen);
        return chats[i].seen.user2.count;
      } else {
        ++chats[i].seen.user1.count;
        // console.log(chats[i].seen);
        return chats[i].seen.user1.count;
      }
    }
  }
};

const getCount = (user1, user2) => {
  // console.log({ user1, user2 });
  const roomId = generateRoomId(user1, user2);
  let count = 0;
  //find the room and update chat array of the room
  for (var i = 0; i < chats.length; i++) {
    if (chats[i].roomId === roomId) {
      if (chats[i].seen.user1.user == user1) {
        count = chats[i].seen.user1.count;
        break;
      } else {
        count = chats[i].seen.user2.count;
        break;
      }
    }
  }
  return count;
};
//get chat between users
const getChat = (user1, user2) => {
  const roomId = generateRoomId(user1, user2);
  var chat = null;
  //find and set chat if any
  for (var i = 0; i < chats.length; i++) {
    if (chats[i].roomId == roomId) {
      chat = chats[i];
      break;
    }
  }
  //   const chat = chats.find((item) => {
  //     console.log(item.roomId == roomId);
  //     return item.roomId == roomId;
  //   });
  return chat;
};

//delete a chat from chats array user1 must be passenger and user2 must be driver
const deleteChat = (user1, user2, schedule, route) => {
  console.log("delete chat");
  const roomId = generateRoomId(user1, user2);

  chats = chats.filter((item) => {
    if (item.roomId == roomId) {
      const newChat = new chatModel({
        roomId,
        passenger: mongoose.Types.ObjectId(user1),
        driver: mongoose.Types.ObjectId(user2),
        schedule: mongoose.Types.ObjectId(schedule),
        route: mongoose.Types.ObjectId(route),
        chat: item.chat,
      });
      newChat.save();
    }
    return item.roomId != roomId;
  });
};

//room id generator
const generateRoomId = (sender, receiver) => {
  if (sender < receiver) return sender + receiver;
  else return receiver + sender;
};

module.exports = {
  createRoom,
  newMessage,
  getChat,
  deleteChat,
  generateRoomId,
  getCount,
  seenChat,
  addCount,
};
