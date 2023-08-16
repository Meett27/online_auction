const mongoose = require('mongoose');
const types = mongoose.Types;

const adSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    basePrice: {
      type: types.Decimal128,
      required: true,
    },
    currentPrice: {
      type: types.Decimal128,
      required: true,
    },
    duration: {
      type: Number,
      default: 300,
    },
    timer: {
      type: Number,
      default: 300,
    },
    soldAt: {
      type: Date,
    },
    image: {
      type: String,
    },
    catergory: {
      type: String,
    },
    auctionStarted: {
      type: Boolean,
      default: false,
    },
    auctionEnded: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    purchasedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    currentBidder: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    bids: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: 'user',
          required: true,
        },
        amount: {
          type: types.Decimal128,
          required: true,
        },
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    room: {
      type: mongoose.Types.ObjectId,
      ref: 'room',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ad', adSchema);
