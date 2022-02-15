const mongoose = require('mongoose');


// juste exemple pour le test
const CourseSchema = new mongoose.Schema(
  {
    title: {
        type: String,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    pictures: {
      type: [String],
    },
    video: {
      type: String,
    },
    instructors: [{ type: Schema.Types.ObjectId, ref: "User" }],
    categories: [{ type: Schema.Types.String, ref: "Category" }],
    followers: {
        type: [String]
    },
    likers: {
      type: [String],
    },
    rating: {
      type: Number,
    },
    comments: {
      type: [
        {
          commenterId:String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        }
      ]
    },
  },
  {
    timestamps: true,
  }
);


module.exports = Course = mongoose.model('course', CourseSchema);