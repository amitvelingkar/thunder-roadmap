const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
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
        ref: 'Milestone'
    },
    comment: {
        type: String
    },
    rating: {
        // 1= lots of problems, 2= has gaps, 3=works great
        type: Number,
        min: 1,
        max: 3
    }
});

// hooks to auto-populate milestone on find and findOne
function autoPopulate(next) {
    this.populate('milestone');
    next();
}

reviewSchema.pre('find', autoPopulate);
reviewSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('Review', reviewSchema);
