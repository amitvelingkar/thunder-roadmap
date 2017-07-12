const mongoose = require('mongoose');
const Cost = mongoose.model('Cost');
//const promisify = require('es6-promisify');

exports.addCost = (req, res) => {
    res.render('editCost', { title: 'Add Cost' });
};

exports.createCost = async (req, res) => {
    const count = await Cost.count();

    req.body.author = req.user._id;
    req.body.order = count+1;
    const newCost = new Cost(req.body);
    await newCost.save();
    res.redirect('/costs');
};

exports.getCosts = async (req, res) => {

    // 1. Query the db for list of all costs
    const costs = await Cost.find().sort({ order: 1 });

    res.render('costs', { title: 'Cost Targets', costs });
};

exports.updateCost= async (req, res) => {
    // 1. find and update the store given the id
    const cost = await Cost.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    }).exec();

    res.redirect(`/costs`);
};

exports.editCost = async (req, res) => {
    // 1. find the cost given the id
    const cost = await Cost.findOne({ _id: req.params.id });

    // 2. confirm they are the owner of the cost
    // confirmOwner(cost, req.user);

    // 3. render edit form for users to edit the cost
    res.render('editCost', { title: `Edit ${cost.name}`, cost });
};

exports.moveUp = async (req, res, next) => {
    // 1. find the cost given the id
    const cost = await Cost.findOne({ _id: req.params.id });
    if (!cost) {
        req.flash('error', 'Requested cost target is not invalid');
        return res.redirect('/costs');
    }

    // 2. move the order up by 1.5 (to avoid conflict since rest are integers)
    cost.order = (cost.order || 1) - 1.5;
    await cost.save();

    next();
};

exports.moveDown = async (req, res, next) => {
    // 1. find the cost given the id
    const cost = await Cost.findOne({ _id: req.params.id });
    if (!cost) {
        req.flash('error', 'Requested cost target is not invalid');
        return res.redirect('/costs');
    }

    // 2. move the order up by 1.5 (to avoid conflict since rest are integers)
    cost.order = (cost.order || 0) + 1.5;
    await cost.save();

    next();
};

// not efficient, since we expect to have very few costs
exports.reorderAll = async (req, res) => {
    const costs = await Cost.find().sort({ order: 1 });
    let updatePromise = [];
    for (let i = 0; i < costs.length; i++)
    {
        costs[i].order = i+1;
        updatePromise.push(costs[i].save());
    }

    await Promise.all(updatePromise);
    res.redirect(`/costs`);
};