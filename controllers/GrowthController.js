const mongoose = require('mongoose');
const Growth = mongoose.model('Growth');
//const promisify = require('es6-promisify');

exports.addGrowth = (req, res) => {
    res.render('editGrowth', { title: 'Add Growth' });
};

exports.createGrowth = async (req, res) => {
    const count = await Growth.count();

    req.body.author = req.user._id;
    req.body.order = count+1;
    const newGrowth = new Growth(req.body);
    await newGrowth.save();
    res.redirect('/growths');
};

exports.getGrowths = async (req, res) => {

    // 1. Query the db for list of all growths
    const growths = await Growth.find().sort({ order: 1 });

    res.render('growths', { title: 'Growth Targets', growths });
};

exports.updateGrowth= async (req, res) => {
    // 1. find and update the store given the id
    const growth = await Growth.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    }).exec();

    res.redirect(`/growths`);
};

exports.editGrowth = async (req, res) => {
    // 1. find the growth given the id
    const growth = await Growth.findOne({ _id: req.params.id });

    // 2. confirm they are the owner of the growth
    // confirmOwner(growth, req.user);

    // 3. render edit form for users to edit the growth
    res.render('editGrowth', { title: `Edit ${growth.name}`, growth });
};

exports.moveUp = async (req, res, next) => {
    // 1. find the growth given the id
    const growth = await Growth.findOne({ _id: req.params.id });
    if (!growth) {
        req.flash('error', 'Requested growth target is not invalid');
        return res.redirect('/growths');
    }

    // 2. move the order up by 1.5 (to avoid conflict since rest are integers)
    growth.order = (growth.order || 1) - 1.5;
    await growth.save();

    next();
};

exports.moveDown = async (req, res, next) => {
    // 1. find the growth given the id
    const growth = await Growth.findOne({ _id: req.params.id });
    if (!growth) {
        req.flash('error', 'Requested growth target is not invalid');
        return res.redirect('/growths');
    }

    // 2. move the order up by 1.5 (to avoid conflict since rest are integers)
    growth.order = (growth.order || 0) + 1.5;
    await growth.save();

    next();
};

// not efficient, since we expect to have very few growths
exports.reorderAll = async (req, res) => {
    const growths = await Growth.find().sort({ order: 1 });
    let updatePromise = [];
    for (let i = 0; i < growths.length; i++)
    {
        growths[i].order = i+1;
        updatePromise.push(growths[i].save());
    }

    await Promise.all(updatePromise);
    res.redirect(`/growths`);
};