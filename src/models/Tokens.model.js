const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({

  token: {
    type: String,
    required: true,
  },
  topic:{
    type: String,
    required: true,
    default: 'janaza',
  },
  subscribedOn: {
    type: Date,
    default: Date.now,
  },

});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;