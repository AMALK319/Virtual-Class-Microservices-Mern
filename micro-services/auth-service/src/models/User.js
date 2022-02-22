const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
  {

    first_name: {
    type: String,
    required: true,
    },
    last_name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      validate: [isEmail],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },

    role: {
      type: String,
      required: true,
      enum: ["professor", "student", "admin"]
    }



  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }); //automatically add while insert or update the object


userSchema.statics.login = async function (email, password) {




};

module.exports = User = mongoose.model("user", userSchema)