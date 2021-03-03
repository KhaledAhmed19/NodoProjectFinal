const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  subscribed: {type: Boolean, default: false}
  
});

module.exports = User = mongoose.model("user", userSchema);
