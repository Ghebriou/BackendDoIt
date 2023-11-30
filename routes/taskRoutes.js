const express = require('express');
const router = express.Router();
const Task = require('../models/task');


router.get('/', async (req, res) => {
   try {
      const tasks = await Task.find().populate('category');
      res.status(200).json(tasks.map(task => ({
         ...task.toObject(),
         categoryName: task.categoryName
      })));
   }
   catch (err) {
      res.status(400).json({ error: err.message });
   }
  })

router.post('/', async (req, res) => {
    try {
       const task = new Task(req.body);
       await task.save();
       res.status(200).json({ message: ' added successfully', task });
    } catch (err) {
       res.status(400).json({ error: err.message });
    }
   });

   router.put('/:id', async (req, res) => {
      try {
         const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
         const updatedTask = await Task.findById(req.params.id).populate('category');
         res.json(updatedTask);
      } catch (err) {
         console.log(err);
         res.status(500).json({ error: 'Server error' });
      }
     });

     router.delete('/:id', async (req, res) => {
      try {
         await Task.findByIdAndDelete(req.params.id);
         res.status(204).end();
      } catch (err) {
         console.log(err);
         res.status(500).json({ error: 'Server error' });
      }
     });

module.exports = router;