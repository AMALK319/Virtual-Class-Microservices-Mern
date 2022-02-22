const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
   

  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

studentSchema.statics.createStudent = async function (data) {
  const { user } = data;


  const student = await this.create(
    {
      user,
      
    })

  student.user = user;

  return student;

};

module.exports = Student = mongoose.model("student", studentSchema)