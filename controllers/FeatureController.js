const mongoose = require('mongoose');
const Feature = mongoose.model('Feature');
const Workflow= mongoose.model('Workflow');
const Milestone = mongoose.model('Milestone');
const Rating = mongoose.model('Rating');
//const promisify = require('es6-promisify');

exports.addFeature = (req, res) => {
    res.render('editFeature', { title: 'Add Feature' });
};

exports.createFeature = async (req, res) => {
    const count = await Feature.count();

    req.body.author = req.user._id;
    const newFeature = new Feature(req.body);
    await newFeature.save();
    res.redirect('/features');
};

exports.getFeatures = async (req, res) => {

    // 1. Query the db for list of all features
    const features = await Feature.find().sort({ stackrank: 1 });

    res.render('features', { title: 'Features', features });
};

exports.updateFeature= async (req, res) => {
    // 1. find and update the feature given the id
    const feature = await Feature.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    }).exec();

    res.redirect(`/features`);
};

exports.editFeature = async (req, res) => {
    // 1. find the feature given the id
    const feature = await Feature.findOne({ _id: req.params.id });

    // 2. confirm they are the owner of the feature
    // confirmOwner(feature, req.user);

    // 3. render edit form for users to edit the feature
    res.render('editFeature', { title: `Edit ${feature.name}`, feature });
};

exports.updateRank = async (req, res) => {
    const feature = await Feature.findOneAndUpdate({ _id: req.params.id }, {stackrank: req.body.stackrank}, {
        new: true
    }).exec();

    res.redirect(`/features`);
};

exports.getFeatureBySlug = async (req, res, next) => {
    // 1. find the feature given the id
    const featurePromise = Feature
    .findOne({ slug: req.params.slug })
    .populate('ratings');

    const workflowsPromise = Workflow.find().sort({ order: 1 });
    const milestonesPromise = Milestone.find().sort({ order: 1 });

    const [feature,workflows,milestones] = await Promise.all([featurePromise,workflowsPromise,milestonesPromise]);

    if (!feature) return next();

    // 2. confirm they are the owner of the feature
    // TODO

    // 3. render the page to view the feature
    res.render('feature', { title: `${feature.name}`, feature, workflows, milestones });
};

// rate the feature
exports.rateFeature = async (req, res) => {
    req.body.author = req.user._id;
    req.body.feature = req.params.id;

    // update for this combination of feature, workflow, milestone
    const rating = await Rating.findOneAndUpdate(
        {
            feature: req.body.feature,
            workflow: req.body.workflow
        },
        req.body,
        {
            new: true,
            upsert: true,
            runValidators: true
        }
    ).exec();
    res.json(rating);
};