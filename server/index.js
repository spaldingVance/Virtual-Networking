const express = require("express");
const http = require("http");
const app = express();
const mongoose = require("mongoose");
const router = require("./router.js");
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

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router(app);

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

//for auto messages
const bot = {
  username: "Muze",
  role: "Bot",
};

// Run when client connects
io.on("connect", (socket) => {
  //on socket connection to chatbox, add socket id to conversation in db, set room to socket id
  socket.on("JOIN_CONVERSATION", function (data) {
    //send welcome message to user
    socket.emit("MESSAGE", {
      username: bot.username,
      role: bot.role,
      message: `Welcome to ${data.conversationName}!`,
      time: moment().format("h:mm a"),
    });

    //join socket to room
    socket.join(data.conversationId);

    //Let other users know that current user entered the conversation
    socket.in(data.conversationId).broadcast.emit("MESSAGE", {
      username: bot.username,
      role: bot.role,
      message: `${data.username} has joined ${data.conversationName}`,
      time: moment().format("h:mm a"),
    });

    //add user id to conversation in database
    Conversation.findOneAndUpdate(
      { _id: data.conversationId },
      { $push: { users: data.userId } }
    ).exec((error, conversationUpdated) => {
      if (error) throw error;
    });

    //add conversation id to user in database
    User.findOneAndUpdate(
      { _id: data.userId },
      { $push: { conversations: data.conversationId } }
    ).exec((error, userUpdated) => {
      if (error) throw error;
    });
  });

  //listen for chat messages
  socket.on("SEND_MESSAGE", (data) => {
    //when chat messages sent, display to room
    io.sockets.in(data.room).emit("MESSAGE", {
      username: data.username,
      message: data.message,
      role: data.role,
      time: moment().format("h:mm a"),
    });

    //add to messages in conversation db
    Conversation.findOneAndUpdate(
      { _id: data.room },
      { $push: { messages: { user: data.userId, text: data.message } } }
    ).exec((error, messageAdded) => {
      if (error) throw error;
    });
  });

  //handle user typing
  socket.on("USER_TYPING", (data) => {
    socket.in(data.room).broadcast.emit("OTHER_USERS_TYPING", {
      username: data.username,
    });
  });

  // //test socket
  //   socket.on("USER_TYPING", (data) => {
  //   io.in(data.room)
  //     .emit("OTHER_USERS_TYPING", {
  //       username: data.username
  //     })
  // })

  //handle user stop typing
  socket.on("USER_STOP_TYPING", (data) => {
    socket.in(data.room).broadcast.emit("OTHER_USERS_STOP_TYPING", {
      username: data.username,
    });
  });

  //test socket
  // socket.on("USER_STOP_TYPING", (data) => {
  //   io.in(data.room)
  //     .emit("OTHER_USERS_STOP_TYPING", {
  //       username: data.username
  //     })
  // })

  // Runs when client disconnects
  socket.on("LEAVE_CONVERSATION", (data) => {
    console.log("LEAVING CONVERSATION");
    //leave room
    socket.leave(data.room);

    //broadcast to room that user left
    socket.in(data.room).broadcast.emit("MESSAGE", {
      username: bot.username,
      role: bot.role,
      message: `${data.username} has left ${data.conversationName}`,
      time: moment().format("h:mm a"),
    });

    //remove conversation from user
    User.updateOne(
      { _id: data.userId },
      { $pullAll: { conversations: [data.room] } }
    ).exec((err, updatedUser) => {
      if (err) return next(err);
    });

    //remove user from conversation
    Conversation.updateOne(
      { _id: data.room },
      { $pullAll: { users: [data.userId] } }
    ).exec((err, updatedConvo) => {
      if (err) return next(err);
    });
  });
});

////////////////////////////////////////////////////////////
// GENERATE FAKE DATA FOR PRODUCTION
// uncomment the .save() lines to add this data to the database
// you can use this format to create new fake data and save it as well
// make sure to comment out the .save() lines when running the server multiple times
// to avoid duplicate data

// let event1 = new Event({
//   eventName: "Programmers of NC",
// });

// let event2 = new Event({
//   eventName: "Project Shift Meetup",
// });

// let event3 = new Event({
//   eventName: "Let's Talk About Angular",
// });

// let event4 = new Event({
//   eventName: "Python Devs Meetup",
// });

// let event5 = new Event({
//   eventName: "Diversity in Tech",
// });

// let conversation1 = new Conversation({
//   conversationName: "General",
//   active: true,
// });

// conversation1.save();

// let conversation2 = new Conversation({
//   conversationName: "General",
//   active: true,
// });

// conversation2.save();

// let conversation3 = new Conversation({
//   conversationName: "General",
//   active: true,
// });

// conversation3.save();

// let conversation4 = new Conversation({
//   conversationName: "General",
//   active: true,
// });

// conversation4.save();

// let conversation5 = new Conversation({
//   conversationName: "General",
//   active: true,
// });

// conversation5.save();

// event1.conversations.push(conversation1);
// event2.conversations.push(conversation2);
// event3.conversations.push(conversation3);
// event4.conversations.push(conversation4);
// event5.conversations.push(conversation5);

// event1.save();
// event2.save();
// event3.save();
// event4.save();
// event5.save();

// event1.save();

// user1.save();

/////////////////////////////////////////////////////////////////////////////////////

server.listen(port);
console.log("Server listening on:", port);
