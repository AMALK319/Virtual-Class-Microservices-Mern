const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    title: {
        type: String,
        require: true, 
        unique: true
    },
    picture: {
        type: String
    },



}, { timestamps: { createdAt: 'created_at' }, updatedAt: 'updated_at' });

module.exports = Category = mongoose.model("categorie", CategorySchema);