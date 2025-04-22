const express= require('express')
const { SendNotification } = require('../controller/SendNotification.controller')
const route = express.Router()




route.post("/notification",SendNotification)

module.exports=route