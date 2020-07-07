//might not need these routes with socket



const router = require('express').Router();
const User = require('../models/userSchema');
const Event = require('../models/eventSchema');
const Conversation = require('../models/conversationSchema');
const Message = require('../models/messageSchema');
const mongoose = require('mongoose');

//Set up routes 

//possible route example: 
router.get('/events', (request, response, next) => {

    //get all available events
    Event
        .find({})
        .exec((error, event) => {
            //send error
            if (error) return response.send(error.message);

            response.send(event)
        });
});

//test route
router.get('/test', (request, response) => {
    response.send("TEST ROUTE WORKING")
});

//login route (join event)
router.post('/users/:eventId', (request, response, next) => {
    // find user to see if user already exists
    User.findOne({ userName: request.body.userName })
        .exec((err, user) => {
            if (err) {
                return next(error)
            } else if (user) {
                // if username exists in the database, return an error
                return response.send("User Name Already Taken")
            } else if (!mongoose.Types.ObjectId.isValid(request.params.eventId)) {
                // if event id is not in the correct format, return an error
                return response.send("Invalid Event ID Format")
            } else {
                // find event by the ID
                Event.findById(request.params.eventId)
                    .exec((err, event) => {
                        if (err) return next(err)
                        // if no event exists for that id (but the id is valid), return an error
                        if (!event) {
                            response.send("Event Not Found")
                        } else {
                            // create a new user and add in values from request body
                            let user = new User();
                            user.userName = request.body.userName;
                            user.byLine = request.body.byLine;
                            // save the user to the database
                            user.save((err) => {
                                if (err) return next(err)
                            });
                            //push the new user to the event
                            event.users.push(user._id)
                            // save the event to the database (to update the users array within)
                            event.save((err) => {
                                if (err) return next(err)
                            });
                            response.send(user._id);
                        }
                    })
            }
        })
})

router.get('/events/:eventId', (request, response, next) => {
    
    if(!request.params.eventId) {
        response.writeHead(404, "Unable to find event");
        return response.end()
    }
    
    Event.findById({ _id: request.params.eventId })
        .populate("conversations")
        .exec((err, event) => {
            if (err) {
                return next(err)
            }

            response.send(event)
        })
})


module.exports = router;

