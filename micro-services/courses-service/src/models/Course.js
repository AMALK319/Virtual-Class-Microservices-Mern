const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// juste exemple pour le test
const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    pictures: {
      type: [
        {
          name: String,
          data: Buffer,
          contentType: String
        }
      ],
    },
    video: {
      type: String,
    },
    instructor: {
      instructorId: { type: Schema.Types.ObjectId, ref: "Professor" },
      instructorName: String,
    },
    collaborators: {
      type: [
        {
          collaboratorId: { type: Schema.Types.ObjectId, ref: "Professor" },
          collaboratorName: String,
        }
      ]
    },
    categories: {
      type: [
        {
          categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
          categoryName: String,
        }
      ]
    },
    followers: {
      type: [String]
    },
    rate: {
      type: {
        rate: Number,
        notes: Number
      },
    },
    price: {
      type: String
    },
    difficulty: {
      type: String,
      /* required: true, */
      enum: ["easy", "normal", "hard"]
    },
    time: {
      type: String
    },
    comments: {
      type: [
        {
          commenterId: String,
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