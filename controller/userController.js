const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user)
            throw new Error("Email already exists");

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: encryptedPassword,

        })

        const data = {
            id: newUser._id
        }

        const token = await jwt.sign(data, 'shhhhh');

        const cratedUser = newUser;
        cratedUser.password=undefined


      res.status(200).cookie('token', token, {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: false
        }).json({
            success: "true",
            token,
            cratedUser
        });
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}

exports.login = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        const isEmailExists = await User.findOne({ email });
        if (!isEmailExists)
            throw new Error("no such email found please sign up");

        const user = await User.findOne({ email });
        // console.log(user)
        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword)
            throw new Error("wrong password");


        const data = {
            id: user._id
        }

        const token = await jwt.sign(data, 'shhhhh');

        user.password = undefined;
        res.status(201).cookie('token', token, {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: false
        }).json({
            success: true,
            token,
            user

        })

    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.user_id);
        if (!user)
            throw new Error("User not found");

        res.status(200).json({
            success: true,
            user
        });
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}

exports.uploadProfilePic = async (req, res) => {
    try {
      const userId = req.user.user_id;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user's profile picture filename in the database
      user.profilePic = req.file.filename;
      await user.save();
  
      res.status(200).json({ message: 'Profile picture uploaded successfully' });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
