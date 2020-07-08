//might not need these routes with socket

const router = require("express").Router();
const User = require("../models/userSchema");
const Event = require("../models/eventSchema");
const Conversation = require("../models/conversationSchema");
const Message = require("../models/messageSchema");
const { request } = require("express");
const mongoose = require("mongoose");

//Set up routes

//possible route example:
router.get("/events", (request, response, next) => {
    //get all available events
    Event.find({}).exec((error, event) => {
        //send error
        if (error) return response.send(error.message);

        response.send(event);
    });
});

//test route
router.get("/test", (request, response) => {
    response.send("TEST ROUTE WORKING");
});

//login route (join event)
router.post("/users/:eventId", (request, response, next) => {
    // find user to see if user already exists
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
                    user.byLine = request.body.byLine;
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
                    response.send(user._id);
                }
            });
        }
    });
});

router.get("/events/:eventId", (request, response, next) => {
    if (!mongoose.Types.ObjectId.isValid(request.params.eventId)) {
        // if event id is not in the correct format, return an error
        response.writeHead(400, "Invalid Event ID Format");
        return response.end();
    }

    Event.findById({ _id: request.params.eventId })
        .populate("conversations")
        .exec((err, event) => {
            if (err) {
                return next(err);
            }
            //if the event is null (doesn't exist), return an error
            if (!event) {
                response.writeHead(404, "Event Not Found");
                return response.end();
            }

            response.send(event);
        });
});

router.delete("/events/:eventId/users/:userId", (request, response, next) => {
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
        .populate('conversations')
        .exec((err, user) => {
            if (err) return next(err)
            //if the user exists for that id,
            // loop through each conversation that user is in
            // and remove the user from that conersation
            if (user) {
                user.conversations.forEach(userConvo => {
                    console.log("ONE CONVO IN USER")
                    Conversation.updateOne(
                        { _id: userConvo.id },
                        { $pullAll: { users: [user.id] } }
                    ).exec((err, conbo) => {
                        if(err) return next(err)
                    })
                })
            } else {
                //if no user is found with that ID, return an error
                response.writeHead(404, "User Not Found")
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
                    response.writeHead(404, "Event Not Found")
                    response.end();
                }
                // find the user by id and delete from Users collection
                User.findByIdAndDelete(request.params.userId)
                    .exec((err, user) => {
                        if (err) return next(err)
                        // if no user is found, return an error
                        if(!user) {
                            response.writeHead(404, "User Not Found")
                            response.end();
                        }
                        response.send(user._id)
                    })
            });
        })
});

module.exports = router;
