const express = require("express");
const http = require("http");
const app = express();
const mongoose = require("mongoose");
const mainRoutes = require("./routes/main");
const keys = require("./config/keys");
const socketio = require("socket.io");
const moment = require("moment");
const User = require("./models/userSchema");
const Event = require("./models/eventSchema");
const Conversation = require("./models/conversationSchema");
const Message = require("./models/messageSchema");
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.connect(keys.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mainRoutes(app);

//for formatting responses?
const formatMessage = (username, text) => {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
};
//for auto messages
const botName = "Muze Bot";

// Run when client connects
io.on("connection", (socket) => {
  //on socket connection to chatbox, add socket id to conversation in db, set room to socket id
  socket.on("room", function (room) {
    Conversation.findOneAndUpdate(
      { conversationName: room.conversationName },
      { socketId: room.id }
    ).exec((error, updatedConversation) => {
      if (error) {
        console.log(error);
      }

      console.log(updatedConversation);
    });
    socket.join(room.id);
  });

  socket.on("SEND_MESSAGE", (data) => {
    console.log("Inside SEND_MESSAGE on server index.js, data= ", data);
    console.log("Next step will be io.emit RECEIVE_MESSAGE");
    //do we need the functionality to store the message and user here?
    //what is RECEIVE_MESSAGE doing?
    io.emit(`MESSAGE_TO_${data.room}`, {
      socketid: socket.id,
      username: data.username,
      message: data.message,
      role: data.role,
      time: moment().format("h:mm a"),
    });
  });

  //listen for chat messages
  socket.on("SEND_MESSAGE", (data) => {
    console.log("SENT MESSAGE DATA", data);
    //when chat messages sent, display to room
    io.sockets.in(socket.id).emit("MESSAGE", {
      socketid: socket.id,
      username: data.username || "Anonymous",
      message: data.message,
      time: moment().format("h:mm a"),
    });

    //add to messages in conversation db
    Conversation.findOneAndUpdate(
      { socketId: socket.id },
      { $push: { messages: { user: data.userId, text: data.message } } }
    ).exec((error, messageAdded) => {
      if (error) throw error;
    });
  });

  socket.on("JOIN_CONVERSATION", ({ userId, conversationId }) => {
    //not sure about variables
    //add user to users array in conversation mongodb collection
    //query mongo for username and conversation name
    // const username;
    // const conversationName;
    // const usersInConversation;
    // Welcome current user
    socket.emit("MESSAGE", {
      username: botName,
      text: `Welcome to ${conversation}!`,
      time: moment().format("h:mm a"),
    });

    // Broadcast when a user connects
    socket.broadcast.to(conversationId).emit("MESSAGE", {
      username: botName,
      text: `${username} has joined the chat`,
      time: moment().format("h:mm a"),
    });

    // Send users and room info
    io.to(conversationId).emit("CONVERSATION_PARTICIPANTS", {
      room: conversationName,
      users: usersInConversation,
    });
  });
});

// Runs when client disconnects
// socket.on("disconnect", () => {
//   // const user = userLeave(socket.id);
//   //find user and remove from conversation in mongodb
//   //remove socketid

//   if (user) {
//   io.to(/*conversation*/).emit(
//     "message",
//     formatMessage(botName, `${user.username} has left the chat`)
//   );

//   // Send users and room info
//   io.to(user.room).emit("roomUsers", {
//     room: user.room,
//     users: getRoomUsers(user.room),
//   });
//    }
// });
// });

////////////////////////////////////////////////////////////
// GENERATE FAKE DATA
// uncomment the .save() lines to add this data to the database
// you can use this format to create new fake data and save it as well
// make sure to comment out the .save() lines when running the server multiple times
// to avoid duplicate data

let event1 = new Event({
  eventName: "Cool Generic Event 3",
});

let conversation1 = new Conversation({
  conversationName: "Neat Conversation 3",
  active: true,
});

let user1 = new User({
  userName: "Robert",
  role: "Socket.io Wizard",
  event: event1._id,
});

conversation1.messages.push({
  user: user1._id,
  text: "Hellooooo",
});

let conversation2 = new Conversation({
  conversationName: "room1",
  active: true,
});

let conversation3 = new Conversation({
  conversationName: "room2",
  active: true,
});

conversation1.users.push(user1);

// conversation1.save();

// conversation2.save();
// conversation3.save();

event1.users.push(user1);
event1.conversations.push(conversation1);

user1.conversations.push(conversation1);

// event1.save();

// user1.save();

server.listen(port);
console.log("Server listening on:", port);
