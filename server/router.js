//might not need these routes with socket

// const router = require("express").Router();
const User = require("./models/userSchema");
const Event = require("./models/eventSchema");
const Conversation = require("./models/conversationSchema");
const Message = require("./models/messageSchema");
const { request } = require("express");
const mongoose = require("mongoose");

//Set up routes

//possible route example:
module.exports = function (router) {
  router.get("/api/events", (request, response, next) => {
    //get all available events
    Event.find({}).exec((error, event) => {
      //send error
      if (error) return response.send(error.message);

      response.send(event);
    });
  });

  //This endpoint adds a user to mongo DB, and adds a user to a selected event
  //Requirements: UserName (in body), Role (in body), Event ID (in Path)
  router.post("/api/users/:eventId", (request, response, next) => {
    // find user to see if user already exists
    if (request.body.userName === "" || !request.body.userName) {
      response.writeHead(400, "Invalid Username");
      return response.end();
    } else if (request.body.role === "" || !request.body.role) {
      response.writeHead(400, "Invalid User Role");
      return response.end();
    } else {
      User.findOne({ userName: request.body.userName }).exec((err, user) => {
        if (err) {
          return next(error);
        } else if (user) {
          // if username exists in the database, return an error
          response.writeHead(400, "username Already Taken");
          return response.end();
        } else if (!mongoose.Types.ObjectId.isValid(request.params.eventId)) {
          // if event id is not in the correct format, return an error
          response.writeHead(400, "Invalid Event ID Format");
          return response.end();
        } else {
          // find event by the ID
          Event.findById(request.params.eventId).exec((err, event) => {
            if (err) return next(err);
            // if no event exists for that id (but the id is valid), return an error
            if (!event) {
              response.writeHead(404, "Event Not Found");
              return response.end();
            } else {
              // create a new user and add in values from request body
              let user = new User();
              user.userName = request.body.userName;
              user.role = request.body.role;
              // save the user to the database
              user.save((err) => {
                if (err) return next(err);
              });
              //push the new user to the event
              event.users.push(user._id);
              // save the event to the database (to update the users array within)
              event.save((err) => {
                if (err) return next(err);
              });
              response.send(user);
            }
          });
        }
      });
    }
  });

  //This endpoint returns an array of conversations for a selected event
  //Requirements: Event ID (in path)
  router.get("/api/events/:eventId", (request, response, next) => {
    if (!mongoose.Types.ObjectId.isValid(request.params.eventId)) {
      // if event id is not in the correct format, return an error
      response.writeHead(400, "Invalid Event ID Format");
      return response.end();
    }

    Event.findById({ _id: request.params.eventId })
      .populate("conversations", "-messages")
      .exec((err, event) => {
        if (err) {
          return next(err);
        }
        //if the event is null (doesn't exist), return an error
        if (!event) {
          response.writeHead(404, "Event Not Found");
          return response.end();
        }

        // we want to send the event without the messages array on conversations
        // to help w/ memory

        response.send(event);
      });
  });

  //This endpoint removes user from event array and from user collection
  //Requirements: User ID (in path), Event ID (in path)
  router.delete(
    "/api/events/:eventId/users/:userId",
    (request, response, next) => {
      //check if eventId and userId are valid
      if (!mongoose.Types.ObjectId.isValid(request.params.eventId)) {
        // if event id is not in the correct format, return an error
        response.writeHead(400, "Invalid Event ID Format");
        return response.end();
      } else if (!mongoose.Types.ObjectId.isValid(request.params.userId)) {
        // if user id is not in the correct format, return an error
        response.writeHead(400, "Invalid User ID Format");
        return response.end();
      }
      // find User by ID to get conversations that user is in
      User.findById(request.params.userId)
        //populate conversations so we can get the IDs from them
        .populate("conversations")
        .exec((err, user) => {
          if (err) return next(err);
          //if the user exists for that id,
          // loop through each conversation that user is in
          // and remove the user from that conersation
          if (user) {
            user.conversations.forEach((userConvo) => {
              Conversation.updateOne(
                { _id: userConvo.id },
                { $pullAll: { users: [user.id] } }
              ).exec((err, conbo) => {
                if (err) return next(err);
              });
            });
          } else {
            //if no user is found with that ID, return an error
            response.writeHead(404, "User Not Found");
            response.end();
          }

          //remove the user from the event
          Event.updateOne(
            { _id: request.params.eventId },
            { $pullAll: { users: [request.params.userId] } }
          ).exec((err, event) => {
            if (err) {
              return next(err);
            }
            // if there is no event with that id, return an error
            if (!event) {
              response.writeHead(404, "Event Not Found");
              response.end();
            }
            // find the user by id and delete from Users collection
            User.findByIdAndDelete(request.params.userId).exec((err, user) => {
              if (err) return next(err);
              // if no user is found, return an error
              if (!user) {
                response.writeHead(404, "User Not Found");
                response.end();
              }
              response.send(user._id);
            });
          });
        });
    }
  );

  //This endpoint Disables conversation by toggling "active" from true to false (still present in database)
  //Requirements: Conversation ID (in body), Event ID (in path)
  router.put("/api/conversations/:convoId", (request, response, next) => {
    if (!mongoose.Types.ObjectId.isValid(request.params.convoId)) {
      // if event id is not in the correct format, return an error
      response.writeHead(400, "Invalid Conversation ID Format");
      return response.end();
    }
    Conversation.findById({ _id: request.params.convoId }).exec(
      (err, convo) => {
        if (err) {
          return next(err);
        }
        if (!convo) {
          response.writeHead(404, "Conversation Not Found");
          return response.end();
        }

        //if the "active" property is set to true, toggle it to false
        //there is currently no need to toggle false to true
        if (convo.active === true) {
          convo.active = false;
          convo.save((err) => {
            if (err) return next(err);
          });
          response.send(convo);
        } else {
          response.writeHead(
            409,
            "Conversation.active is already set to false"
          );
          return response.end();
        }
      }
    );
  });

  //This endpoint creates a conversation and adds it to the database
  //Requirements: Conversation ID (in body), Event ID (in path)
  router.post(
    "/api/events/:eventId/conversation",
    (request, response, next) => {
      if (!mongoose.Types.ObjectId.isValid(request.params.eventId)) {
        // if event id is not in the correct format, return an error
        response.writeHead(400, "Invalid Event ID Format");
        return response.end();
      } else if (
        request.body.conversationName === "" ||
        !request.body.conversationName
      ) {
        // if coversation name is empty or doesn't exist, return an error
        response.writeHead(400, "Invalid Conversation Name");
        return response.end();
      }
      // create a conversation with the name and active set to true
      let conversation = new Conversation({
        conversationName: request.body.conversationName,
        active: true,
      });

      Event.findById(request.params.eventId)
        //populate the conversations so that we can access their names and check if the name is taken
        .populate("conversations")
        .exec((err, event) => {
          if (err) return next(err);
          //if the event doesn't exist, return an error
          if (!event) {
            response.writeHead(404, "Event Not Found");
            return response.end();
          } else {
            //variable for future if statement to prevent trying to send multiple responses
            let nameTaken = false;
            //loop through the conversations in the event
            event.conversations.forEach((convo) => {
              //if the event has a conversation with the same name, return an error
              if (convo.conversationName === request.body.conversationName) {
                nameTaken = true;
                response.writeHead(400, "Conversation Name Already Taken");
                return response.end();
              }
            });
            // if the name is available, save the conversation and add it to the event
            if (!nameTaken) {
              conversation.save((err) => {
                if (err) return next(err);
              });
              event.conversations.push(conversation._id);
              event.save((err) => {
                if (err) return next(err);
              });
              response.send(event);
            }
          }
        });
    }
  );

  //This endpoint creates a conversation and adds it to the database
  //Requirements: Event Name (in body)
  router.post("/api/events", (request, response, next) => {
    let newEvent = new Event({ eventName: request.body.eventName });
    Event.findOne({ eventName: request.body.eventName }).exec((err, event) => {
      console.log(event);
      if (err) return next(err);
      if (!event) {
        console.log("not event");
        newEvent.save((err) => {
          if (err) return next(err);
        });
        response.send(newEvent);
      } else {
        response.writeHead(400, "Event Name Already Taken");
        return response.end();
      }
    });
  });
};
