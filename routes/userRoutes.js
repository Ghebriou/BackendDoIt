const express = require('express');
const router = express.Router();
const userAuth = require("../middleware/userAuth");
const userController = require('../controller/userController');
const multer = require('multer');

router.post('/createUser', userController.createUser);
router.post('/login', userController.login);
router.get('/getUser', userAuth, userController.getUser);
 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile_pictures'); // Path to store uploaded profile pictures
  },
  filename: function (req, file, cb) {
    // Customize the filename if needed
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to handle profile picture upload
router.post('/uploadProfilePic', userAuth, upload.single('profilePic'), userController.uploadProfilePic);

module.exports = router;
