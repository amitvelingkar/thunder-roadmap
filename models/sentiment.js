const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const sentimentSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        trim: true,
        required: 'Your sentiment must have a name'
    },
    description: {
        type: String,
        trim: true
    },
    order: {
        type: Number,
        min: 0
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'you must always supply an author'
    }
});

module.exports = mongoose.model('Sentiment', sentimentSchema);
