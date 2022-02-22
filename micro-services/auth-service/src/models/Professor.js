const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professorSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }); 

  professorSchema.statics.createProfessor = async function (data) {
    const { user } = data;
    const professor = await this.create(
      {
        user
      })

    professor.user = user;

    return professor;

  };
  
module.exports = professor = mongoose.model("professor", professorSchema)