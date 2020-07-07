//might not need these routes with socket



const router = require('express').Router();
const User = require('../models/userSchema');
const Event = require('../models/eventSchema');
const Conversation = require('../models/conversationSchema');
const Message = require('../models/messageSchema');

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
router.post('/users', (request, response, next) => {
    User.findOne({userName: request.body.userName})
        .exec((err, user) => {
            if (err) {
                return next(error)
            } else if (user) {
                return response.send("User Name Already Taken")
            }
        })
    Event.findOne({ _id: request.body.event })
        .exec((err, event) => {
            if (err) {
                return next(error)
            }
            let user = new User();
            user.userName = request.body.userName;
            user.byLine = request.body.byLine;
            user.save();
            console.log(event)
            console.log(user._id)
            event.users.push(user._id)
            event.save();
            response.send(user);
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

