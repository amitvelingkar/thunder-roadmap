const mongoose = require('mongoose');
const Review = mongoose.model('Review');

// rating the feature + workflow
exports.rating = async (req, res) => {
    const data = {
        author: req.user._id,
        feature: req.params.id,
        workflow: req.body.workflow,
        rating: req.body.rating
    };

    // update for this combination of feature, workflow, milestone
    const review = await Review.findOneAndUpdate(
        {
            feature: data.feature,
            workflow: data.workflow
        },
        data,
        {
            new: true,
            upsert: true,
            runValidators: true
        }
    ).exec();
    res.json(review);
};

// set milestone for the feature + workflow
exports.milestone = async (req, res) => {
    const data = {
        author: req.user._id,
        feature: req.params.id,
        workflow: req.body.workflow,
        milestone: req.body.milestone
    };

    // update for this combination of feature, workflow, milestone
    const review = await Review.findOneAndUpdate(
        {
            feature: data.feature,
            workflow: data.workflow
        },
        data,
        {
            new: true,
            upsert: true,
            runValidators: true
        }
    ).exec();
    res.json(review);
};

// set comment for the feature + workflow
exports.comment = async (req, res) => {
    const data = {
        author: req.user._id,
        feature: req.params.id,
        workflow: req.body.workflow,
        comment: req.body.comment
    };

    // update for this combination of feature, workflow, milestone
    const review = await Review.findOneAndUpdate(
        {
            feature: data.feature,
            workflow: data.workflow
        },
        data,
        {
            new: true,
            upsert: true,
            runValidators: true
        }
    ).exec();
    res.json(review);
};