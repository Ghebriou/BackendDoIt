const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// locals
const PORT = process.env.PORT || 3000;
const tasksRoutes = require('./routes/taskRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB database
// mongoose
//  .connect('mongodb://admin:admin@localhost:27017/To-Do?authSource=admin').then(()=>{
//    console.log('DB Connection Successful')
// })
// .catch((err)=>{
//    console.log(err)
// })

// connect DB with atlasMongoDb 
mongoose.connect(process.env.MONGODB_URI)
   .then(() => {
     console.log('Connected to MongoDB');
   })
   .catch((err) => {
     console.error('Error connecting to MongoDB:', err.message);
   });



const fs = require('fs');
const profilePictureUploadsDir = './uploads/profile_pictures';
app.use('/uploads/profile_pictures', express.static('uploads/profile_pictures'));

// Create directory if it doesn't exist
if (!fs.existsSync(profilePictureUploadsDir)) {
  fs.mkdirSync(profilePictureUploadsDir, { recursive: true });
}
   

// route middlwares
app.use('/tasks',tasksRoutes);
app.use(CategoryRoutes);
app.use(userRoutes);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
 });