const mongoose = require('mongoose');
const Feature = mongoose.model('Feature');
const Workflow= mongoose.model('Workflow');
const Milestone = mongoose.model('Milestone');
const Growth = mongoose.model('Growth');

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
    const featuresPromise = Feature.find().sort({ stackrank: 1 }).populate('reviews');
    const workflowsPromise = Workflow.find().sort({ order: 1 });
    
    const [features,workflows] = await Promise.all([featuresPromise,workflowsPromise]);

    res.render('features', { title: 'Features', features, workflows });
};

exports.updateFeature= async (req, res) => {
    // 1. find and update the feature given the id
    const feature = await Feature.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    }).exec();

    res.redirect(`/features`);
};

exports.updateRank = async (req, res) => {
    const feature = await Feature.findOneAndUpdate({ _id: req.params.id }, {stackrank: req.body.stackrank}, {
        new: true
    }).exec();

    res.json(feature);
};

exports.updateName = async (req, res) => {
    const feature = await Feature.findOneAndUpdate({ _id: req.params.id }, {name: req.body.name}, {
        new: true
    }).exec();

    res.json(feature);
};

exports.updateDesc = async (req, res) => {
    const feature = await Feature.findOneAndUpdate({ _id: req.params.id }, {description: req.body.description}, {
        new: true
    }).exec();

    res.json(feature);
};

exports.updateGrowth = async (req, res) => {
    const feature = await Feature.findOneAndUpdate({ _id: req.params.id }, {growth: req.body.growth}, {
        new: true
    }).exec();

    res.json(feature);
};

exports.getFeatureBySlug = async (req, res, next) => {
    // 1. find the feature given the id
    const featurePromise = Feature
    .findOne({ slug: req.params.slug })
    .populate('reviews');

    const workflowsPromise = Workflow.find().sort({ order: 1 });
    const milestonesPromise = Milestone.find().sort({ order: 1 });
    const growthsPromise = Growth.find().sort({ order: 1 });

    const [feature,workflows,milestones,growths] = await Promise.all([featurePromise,workflowsPromise,milestonesPromise,growthsPromise]);

    if (!feature) return next();

    // 2. confirm they are the owner of the feature
    // TODO

    // 3. render the page to view the feature
    res.render('feature', { title: `${feature.name}`, feature, workflows, milestones, growths });
};
