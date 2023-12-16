const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const userAuth = require("../middleware/userAuth");

router.get("/", userAuth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.user_id }).populate(
      "category"
    );
    res.status(200).json(
      tasks.map((task) => ({
        ...task.toObject(),
        categoryName: task.categoryName,
      }))
    );
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/", userAuth, async (req, res) => {
  try {
    const user = req.user;
    //  console.log(user);
    if (!user) throw new Error("user not found and you are not allowed");

    const task = new Task(req.body);
    task.user = user.user_id;
    await task.save();
    res.status(200).json({ message: " added successfully", task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", userAuth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    const updatedTask = await Task.findById(req.params.id).populate("category");
    res.json(updatedTask);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", userAuth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});
 


module.exports = router;
