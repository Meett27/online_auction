const { validationResult } = require('express-validator');
const Ad = require('../models/addPostModel');
const Room = require('../models/auctionRoomModel');
const User = require('../models/userModel');
const userService = require('../models/userModel');
const io = require('../socket');
const userId = require('../controllers/user_controller')



exports.getAdPost = async (req, res) => {

    res.render('postad.html');

};


// @route   POST /ad
// @desc    Post a new ad
exports.addAd = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       errors: errors.array(),
//     });
//   }

//   const sessionData = req.session;
//     console.log(sessionData);
console.log(req.session.userId, "from post control"); 
  let productName = req.body.pname
  let basePrice = req.body.bPrice
  let duration = req.body.duration
  let image = req.body.image
  let  category = req.body.category
  let desc  = req.body.desc
  console.log(req.body, "P body");
  if (duration === null || duration === 0) duration = 300;
  if (duration > 10800) duration = 3600;
  image = image === '' ? '' : `"http://localhost:5000/user/auction/adPost"${image}`;
  const timer = duration;

   
  try {
    let ad = new Ad({
        productName,
        desc,
      basePrice,
      currentPrice: basePrice,
      duration,
      timer,
      image,    
      category,
      owner: req.session.userId,
    });

    // Create room for auction
    let room = new Room({ ad: ad._id });
    room = await room.save();

    ad.room = room._id;
    ad = await ad.save();

    const user = await User.findById(ad.owner);
    console.log(ad._id);
    user.postedAds.push( ad._id );
    await user.save();

    io.getIo().emit('addAd', { action: 'add', ad: ad });

    res.status(200).json({ ad, room });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   GET /ad
// @desc    Retrieve list of all ads
exports.retrieveAds = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       errors: errors.array(),
//     });
//   }

  const { user, option } = req.query;
  let adList = [];
  try {
    if (user) {
      adList = await Ad.find({ owner: user }).sort({ createdAt: -1 });
    } else if (option === 'notexpired') {
      adList = await Ad.find({ auctionEnded: false }).sort({
        createdAt: -1,
      });
    } else {
      adList = await Ad.find().sort({ createdAt: -1 });
    }
    res.status(200).json(adList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   GET /ad/:id
// @desc    Find one ad
exports.findAd = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       errors: errors.array(),
//     });
//   }

  const adId = req.params.id; // id of type ObjectId (61a18153f926fdc2dd16d78b)
  try {
    const ad = await Ad.findById(adId).populate('owner', { password: 0 });
    if (!ad) return res.status(404).json({ errors: [{ msg: 'Ad not found' }] });
    res.status(200).json(ad);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   PUT /ad/:id
// @desc    Update an ad
exports.updateAd = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       errors: errors.array(),
//     });
//   }

  const adId = req.params.id;
  try {
    // Check for authorization
    let ad = await Ad.findById(adId);
    if (!ad) return res.status(404).json({ errors: [{ msg: 'Ad not found' }] });
    if (ad.owner != req.user.id)
      return res
        .status(401)
        .json({ errors: [{ msg: 'Unauthorized to delete this ad' }] });
    // Update all fields sent in body
    if (req.body.bprice) {
      req.body.currentPrice = req.body.bprice;
    }

    let updatedAd = await Ad.findByIdAndUpdate(adId, req.body);
    updatedAd = await Ad.findById(adId);

    res.status(200).json(updatedAd);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   DELETE /ad/:id
// @desc    Delete an ad
exports.deleteAd = async (req, res) => {
  const adId = req.params.id;
  try {
    let ad = await Ad.findById(adId);
    if (!ad) return res.status(404).json({ errors: [{ msg: 'Ad not found' }] });
    if (ad.owner != req.user.id)
      return res
        .status(401)
        .json({ errors: [{ msg: 'Unauthorized to delete this ad' }] });
    if (ad.auctionStarted || ad.auctionEnded)
      return res
        .status(404)
        .json({ errors: [{ msg: 'Cannot delete, auction started/ended' }] });
    await Ad.deleteOne(ad);
    res.status(200).json({ msg: 'Deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};