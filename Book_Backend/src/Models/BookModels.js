const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    book_name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    publications: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
        required: true,
    },
    bookImage: {
        type: String,
        required: false,  // Set to false if not always required
    },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
