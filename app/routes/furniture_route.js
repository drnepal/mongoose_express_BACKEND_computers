// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples 
// furniture is a subdocument 
const Home = require('../models/home')

// custom middleware
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// ROUTES

// POST -> create a HOme (and bring or throw away furiture from home)
// POST /furniture/:homeId
// anybody should be able to give a home a furniture
// so we wont requireToken
// our furniture schema, has some non-required fields, so let's use removeBlanks
router.post('/furnitures/:homeId', removeBlanks, (req, res, next) => {
    // isolate our furniture from the request, and save to variable
    const furniture = req.body.furniture
    // isolate and save our home's id for easy reference
    const homeId = req.params.homeId
    // find the home and push the new furniture into the home's array
    Home.findById(homeId)
        // first step is to use our custom 404 middleware
        .then(handle404)
        // handle adding furniture to home
        .then(home => {
            console.log('the home: ', home)
            console.log('the furniture: ', furniture)
            // add furniture to furnitures array
            home.furnitures.push(furniture)

            // save the home
            return home.save()
        })
        // send info after updating the home
        .then(home => res.status(201).json({ home: home }))
        // pass errors along to our error handler
        .catch(next)
})

// PATCH -> update a furniture
// PATCH /furnitures/:homeId/:furnitureId
router.patch('/furnitures/:homeId/:furnitureId', requireToken, removeBlanks, (req, res, next) => {
    // get and save the id's to variables
    const homeId = req.params.homeId
    const furnitureId = req.params.furnitureId

    // find our home
    Home.findById(homeId)
        .then(handle404)
        .then(home => {
            // single out the furniture
            const thefurniture = home.furnitures.id(furnitureId)
            // make sure the user is the home's owner
            requireOwnership(req, home)
            // update accordingly
            thefurniture.set(req.body.furniture)

            return home.save()
        })
        // send a status
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE -> destroy a furniture
// DELETE /furnitures/:homeId/:furnitureId
router.delete('/furnitures/:homeId/:furnitureId', requireToken, (req, res, next) => {
    const homeId = req.params.homeId
    const furnitureId = req.params.furnitureId

    // find the home
    Home.findById(homeId)
        .then(handle404)
        // grab the specific furniture using it's id
        .then(home => {
            // isolate the furniture
            const thefurniture = home.furnitures.id(furnitureId)
            // make sure the user is the owner of the home
            requireOwnership(req, home)
            // call remove on our furniture subdoc
            thefurniture.remove()
            // return the saved home
            return home.save()
        })
        // send a response
        .then(() => res.sendStatus(204))
        // pass errors to our error handler (using next)
        .catch(next)
})

// export our router
module.exports = router