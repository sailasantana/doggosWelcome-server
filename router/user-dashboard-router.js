require('dotenv').config()
const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../winston-logger')
const users = require('../db/user-store')
const dashboard = require('../db/user-board-store')


const userRouter = express.Router()
const bodyParser = express.json()

//a successful login should route a user here - I'm not sure I even
//need this router or if I should consolidate inside login-router.js
userRouter.route('/:userName')
    .get((req, res) => {
        const { userName } = req.params

        const dashboard = dashboard.find(d => d.userName === dashboard.userName)

        if (!dashboard){
            logger.error(`User not found`)
            return res.status(404).send(`User not found`)
        }
        res.json(dashboard.reviews)
        res.json(dashboard.saved)
    })
    .delete
