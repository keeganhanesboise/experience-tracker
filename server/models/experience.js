const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    user: {
        type: String,
        required: true,
    },
}, {timestamps: true})

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;