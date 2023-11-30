const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// locals
const port = 3000;
const tasksRoutes = require('./routes/taskRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// Connect to MongoDB database
mongoose
 .connect('mongodb://admin:admin@localhost:27017/To-Do?authSource=admin').then(()=>{
   console.log('DB Connection Successful')
})
.catch((err)=>{
   console.log(err)
})

// route middlwares
app.use('/tasks',tasksRoutes);
app.use(CategoryRoutes);
app.use(userRoutes);

app.listen(port,()=>{
   console.log(`running on port ${port}`)
})