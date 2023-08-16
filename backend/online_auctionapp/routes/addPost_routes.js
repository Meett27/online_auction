const express = require("express");
const adController = require("../controllers/addPostController");
const { body } = require('express-validator');

const router = express.Router();

//get adPost Page
router.get('/createPost',adController.getAdPost);


// @route   POST /ad
// @desc    Post a new ad
// @access  protected
router.post('/adPost',adController.addAd);
  
  // @route   GET /ad?user=<userId>&option=<active>
  // @desc    Retrieve list of all ads. Optional query param of user.
  // @access  protected
  router.get('/?', adController.retrieveAds);
  
  // @route   GET /ad/:id
  // @desc    Find one ad
  // @access  protected
  router.get('/:id', adController.findAd);
  
  // @route   PUT /ad/:id
  // @desc    Update an ad
  // @access  protected
  router.put('/:id', adController.updateAd);
  
  // @route   DELETE /ad/:id
  // @desc    Delete an ad
  // @access  protected
  router.delete('/:id', adController.deleteAd);
  

module.exports = router;
