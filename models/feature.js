const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const slug = require('slugs');

const featureSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required: 'Please enter a feature name'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    stackrank: {
        type: Number,
        min: 0
    },
    growth: {
        type: mongoose.Schema.ObjectId,
        ref: 'Growth'
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'you must always supply an author'
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

featureSchema.virtual('reviews', {
    ref: 'Review', // model to link
    localField: '_id', // which field on the store to match a review
    foreignField: 'feature' // which field on the review to match the feature
});

// hooks to auto-populate milestone on find and findOne
function autoPopulate(next) {
    this.populate('growth');
    next();
}

featureSchema.pre('save', async function(next) {
    if (!this.isModified('name')) {
        next();
        return;

    }

    this.slug = slug(this.name);

    // make slug unique
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`,'i');
    const featuresWithSlug = await this.constructor.find({ slug: slugRegEx });
    if (featuresWithSlug.length) {
        this.slug = `${this.slug}-${featuresWithSlug.length + 1}`;
    }


    next();
});

featureSchema.pre('find', autoPopulate);
featureSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('Feature', featureSchema);
