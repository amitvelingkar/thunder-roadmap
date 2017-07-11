const mongoose = require('mongoose');
const Sentiment = mongoose.model('Sentiment');
//const promisify = require('es6-promisify');

exports.addSentiment = (req, res) => {
    res.render('editSentiment', { title: 'Add Sentiment' });
};

exports.createSentiment = async (req, res) => {
    const count = await Sentiment.count();

    req.body.author = req.user._id;
    req.body.order = count+1;
    const newSentiment = new Sentiment(req.body);
    await newSentiment.save();
    res.redirect('/sentiments');
};

exports.getSentiments = async (req, res) => {

    // 1. Query the db for list of all sentiments
    const sentiments = await Sentiment.find().sort({ order: 1 });

    res.render('sentiments', { title: 'Sentiment Targets', sentiments });
};

exports.updateSentiment= async (req, res) => {
    // 1. find and update the store given the id
    const sentiment = await Sentiment.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    }).exec();

    res.redirect(`/sentiments`);
};

exports.editSentiment = async (req, res) => {
    // 1. find the sentiment given the id
    const sentiment = await Sentiment.findOne({ _id: req.params.id });

    // 2. confirm they are the owner of the sentiment
    // confirmOwner(sentiment, req.user);

    // 3. render edit form for users to edit the sentiment
    res.render('editSentiment', { title: `Edit ${sentiment.name}`, sentiment });
};

exports.moveUp = async (req, res, next) => {
    // 1. find the sentiment given the id
    const sentiment = await Sentiment.findOne({ _id: req.params.id });
    if (!sentiment) {
        req.flash('error', 'Requested sentiment target is not invalid');
        return res.redirect('/sentiments');
    }

    // 2. move the order up by 1.5 (to avoid conflict since rest are integers)
    sentiment.order = (sentiment.order || 1) - 1.5;
    await sentiment.save();

    next();
};

exports.moveDown = async (req, res, next) => {
    // 1. find the sentiment given the id
    const sentiment = await Sentiment.findOne({ _id: req.params.id });
    if (!sentiment) {
        req.flash('error', 'Requested sentiment target is not invalid');
        return res.redirect('/sentiments');
    }

    // 2. move the order up by 1.5 (to avoid conflict since rest are integers)
    sentiment.order = (sentiment.order || 0) + 1.5;
    await sentiment.save();

    next();
};

// not efficient, since we expect to have very few sentiments
exports.reorderAll = async (req, res) => {
    const sentiments = await Sentiment.find().sort({ order: 1 });
    let updatePromise = [];
    for (let i = 0; i < sentiments.length; i++)
    {
        sentiments[i].order = i+1;
        updatePromise.push(sentiments[i].save());
    }

    await Promise.all(updatePromise);
    res.redirect(`/sentiments`);
};