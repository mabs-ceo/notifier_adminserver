const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    providerName: {
        type: String,        
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    postal: {
        type: Number,
       
    },
    address: {
        type: String,
       
    },
    contact: {
        type: Number,
       
    },
    dueDate: {
        type: Date,
        required:true
       
    },
    isShow:{
        type:Boolean,
        default:false
    }
    })

    const Notification = mongoose.model("Notification", notificationSchema)


    module.exports = Notification