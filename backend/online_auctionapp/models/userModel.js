const mongoose = require('../utils/database')


const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please provide full name!"],
    },
  
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
    },

    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },
  })

  const userInstance = mongoose.model('userInstance', UserSchema);

  module.exports = userInstance;