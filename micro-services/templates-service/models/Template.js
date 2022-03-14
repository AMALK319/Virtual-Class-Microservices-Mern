const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CategorySchema = new Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    content: Object,
}, { timestamps: { createdAt: 'created_at' }, updatedAt: 'updated_at' });

module.exports = Category = mongoose.model('category', CategorySchema)