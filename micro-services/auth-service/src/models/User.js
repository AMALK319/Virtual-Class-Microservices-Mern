const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
  {

    first_name: {
      type: String,
     
    },
    last_name: {
      type: String,
      
    },

    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
     
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