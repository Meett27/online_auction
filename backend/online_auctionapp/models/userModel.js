const mongoose = require('../utils/database')


// const UserSchema = new mongoose.Schema({

//     name: {
//         type: String,
//         required: [true, "Please provide full name!"],
//     },
  
//     email: {
//         type: String,
//         required: [true, "Please provide an Email!"],
//         unique: [true, "Email Exist"],
//     },

//     password: {
//         type: String,
//         required: [true, "Please provide a password!"],
//         unique: false,
//     },
//   })

//   const userInstance = mongoose.model('userInstance', UserSchema);

//   module.exports = userInstance;
// const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  purchasedProducts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'ad',
    },
  ],
  postedAds: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'ad',
    },
  ],
  bids: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'ad',
    },
  ],
});


  const userInstance = mongoose.model('userInstance', userSchema);

  module.exports = userInstance;