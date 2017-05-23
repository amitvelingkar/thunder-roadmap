const mongoose = require('mongoose');
mongoose.Promise - global.Promise;

const slug = require('slugs');

const storeSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required: 'Please enter a store name'
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    tags: [String],
    created: {
        type: Date,
        default: Date.now
    },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [{
            type: Number,
            required: 'You must supply location coordinates'
        }],
        address: {
            type: String,
            required: 'You must supply an address'
        }
    },
    photo: String
});


storeSchema.pre('save', function(next) {
    // TODO: make slug unique
    if (!this.isModified('name')) {
        next();

    }
    this.slug = slug(this.name);
    next();
})

module.exports = mongoose.model('Store', storeSchema);