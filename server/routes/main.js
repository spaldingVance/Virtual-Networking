//might not need these routes with socket

/*

const router = require('express').Router();
const User = require('../models/user');
const Event = require('../models/event');
const Convo = require('../models/convo');

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


module.exports = router;

*/