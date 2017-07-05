const mongoose = require('mongoose');
const Feature = mongoose.model('Feature');
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
    // 1. find and update the store given the id
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
