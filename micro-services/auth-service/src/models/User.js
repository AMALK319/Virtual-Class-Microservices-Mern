const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {

    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    }
    
  },
  {
    timestamps: true,
  }
);


userSchema.statics.login = async function (email, password) {

    
  

};

module.exports = User = mongoose.model("user", userSchema)