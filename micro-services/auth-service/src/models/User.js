const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {

    firstName: {
      type: String,
     
    },
    lastName: {
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

    /* role: {
      type: [
        {

          name: String,
        }
      ],
    } */

    role: {
      type: [String],
      required: true,
      enum: ["professor", "student", "admin"]
    }



  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }); //automatically add while insert or update the object


userSchema.statics.login = async function (email, password) {

  const user = await this.findOne({ email });
  try {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    
  } catch (error) {
    console.log(error)
  }


};

module.exports = User = mongoose.model("user", userSchema)