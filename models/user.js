const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is compulsory"],
  },
  email: {
    type: String,
    required: [true, "Email is compulsory"],
  },
  password: {
    type: String,
    minLength: [8, "Password cannot be less than 8 characters"],
    required: [true, "Password is required"],
  },
  profilePic: {
    type: String, // to store the fileName ta3 pdp
  },
});

module.exports = mongoose.model("User", UserSchema);
