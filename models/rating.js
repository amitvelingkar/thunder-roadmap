const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ratingSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'You must supply an author'
    },
    feature: {
        type: mongoose.Schema.ObjectId,
        ref: 'Feature',
        required: 'You must supply a feature'
    },
    workflow: {
        type: mongoose.Schema.ObjectId,
        ref: 'Workflow',
        required: 'You must supply a workflow'
    },
    milestone: {
        type: mongoose.Schema.ObjectId,
        ref: 'Milestone',
        required: 'You must supply a milestone'
    },
    text: {
        type: String
    },
    score: {
        // 1= lots of problems, 2= has gaps, 3=works great
        type: Number,
        min: 1,
        max: 3
    }
});

module.exports = mongoose.model('Rating', ratingSchema);