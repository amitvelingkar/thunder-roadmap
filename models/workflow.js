const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const workflowSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: 'Your workflow must have a name'
    },
    description: {
        type: String
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

module.exports = mongoose.model('Workflow', workflowSchema);
