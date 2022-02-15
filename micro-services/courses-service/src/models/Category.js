const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    no: {
        type: Number,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
}, { timestamps: { createdAt: 'created_at' }, updatedAt: 'updated_at' } );

module.exports = Category = mongoose.model('category', CategorySchema)