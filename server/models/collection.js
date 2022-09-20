const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    experiences: {
        type: Array,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
}, {timestamps: true})

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;