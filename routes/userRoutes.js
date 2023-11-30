const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/userAuth");
const userController = require('../controller/userController');
 

router.post('/createUser', userController.createUser);
router.post('/login', userController.login);
router.get('/getUser', userAuth, userController.getUser);


module.exports = router;
