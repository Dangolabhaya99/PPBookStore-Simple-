const mongoose = require('mongoose');
const { Schema } = mongoose;
const publicationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Publication = mongoose.model("Publication", publicationSchema);
module.exports = Publication;