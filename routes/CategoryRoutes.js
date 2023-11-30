const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const userAuth = require("../middleware/userAuth");

router.get("/categories",userAuth, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.user_id }); 
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/categories",userAuth, async (req, res) => {
  try {
    const user = req.user;
    //  console.log(user);
   if (!user) throw new Error("user not found and you are not allowed");

    const newCategory = new Category(req.body);
    newCategory.user = user._id;
    await newCategory.save();
    res.status(200).json({ message: " added successfully", newCategory });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
