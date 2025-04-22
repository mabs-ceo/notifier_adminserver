const mongoose = require("mongoose")

const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    uen: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    postal: {
        type: Number,
        default: false,
    },
    providedCount: {
        type: Number,
        default: 0,
    },
})

const Provider = mongoose.model("Provider", providerSchema)
module.exports = Provider