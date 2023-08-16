const express = require("express");
const userController = require("../controllers/user_controller");

const router = express.Router();

// router.get('/',userController.getAllUsers);

router.get('/register',userController.getSignUpPage);

router.post('/create',userController.createUser);

router.get('/login',userController.getLoginPage);

router.post('/Login',userController.postLogin);

router.get('/:id',userController.getUserById)

router.delete('/:id',userController.deleteUser);

module.exports = router;
