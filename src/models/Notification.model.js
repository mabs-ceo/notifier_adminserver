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
       required: true,
    },
    address: {
        type: String,
       required: true,
    },
    contact: {
        type: Number,
        default: 12345678,
       required: true,
    },
    dueDate: {
        type: Date,
       
    },
    })

    const Notification = mongoose.model("Notification", notificationSchema)


    module.exports = Notification