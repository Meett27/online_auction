const express = require("express");
const userController = require("../controllers/user_controller");

const router = express.Router();

router.get('/',userController.getAllUsers);


router.post('/',userController.createUser);


router.get('/:id',userController.getUserById)

router.delete('/:id',userController.deleteUser);

module.exports = router;
