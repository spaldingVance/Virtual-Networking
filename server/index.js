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

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(mainRoutes);

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

  socket.on("test", (data) => {
    console.log(data.testMessage);
    console.log("SERVER ROOM NAME", data.room)
    io.emit(`MESSAGE_TO_${data.room}`, {
      socketid: socket.id,
      username: botName,
      text: `${data.testMessage}`,
      time: moment().format("h:mm a"),
    });
  });

  socket.on('SEND_MESSAGE', data => {
    console.log('Inside SEND_MESSAGE on server index.js, data= ', data)
    console.log('Next step will be io.emit RECEIVE_MESSAGE')
    //do we need the functionality to store the message and user here?
    //what is RECEIVE_MESSAGE doing?
    io.emit(`MESSAGE_TO_${data.room}`, { 
      socketid: socket.id,
      username: data.username, 
      message: data.message,
      time: moment().format('h:mm a')})
  })

  
  socket.on("joinEvent", ({ username, byline, eventId }) => {
    //create instance of user model in mongo (set _id as socket.id)
    //add user to users array in selected event
    //add person to a room
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
    socket.broadcast
      .to(conversationId) 
      .emit("MESSAGE", {
        username: botName,
        text: `${username} has joined the chat`,
        time: moment().format("h:mm a"),
      });

    // Send users and room info
    io.to(conversationId)
      .emit('CONVERSATION_PARTICIPANTS', {
      room: conversationName,
      users: usersInConversation
    });
  });

  // Listen for chatMessage
  socket.on("CHAT_MESSAGE", (message) => {
    //find user
    //add message to conversation in mongodb

    //diplay message in chat window
    io.to(/*userConversation*/).emit(
      "MESSAGE",
      formatMessage(user.username, msg)
    );
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    // const user = userLeave(socket.id);
    //find user and remove from conversation in mongodb
    //remove socketid

    // if (user) {
    io.to(/*conversation*/).emit(
      "message",
      formatMessage(botName, `${user.username} has left the chat`)
    );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
    // }
  });
});



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
  active: true
});

let user1 = new User({
  userName: "Robert",
  byLine: "Socket.io Wizard",
  event: event1._id,
});

conversation1.messages.push({
  user: user1._id,
  text: "Hellooooo",
});

conversation1.users.push(user1);

// conversation1.save();

event1.users.push(user1);
event1.conversations.push(conversation1);

user1.conversations.push(conversation1);

// event1.save();

// user1.save();

server.listen(port);
console.log("Server listening on:", port);
