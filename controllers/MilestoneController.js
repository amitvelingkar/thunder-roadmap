const mongoose = require('mongoose');
const Milestone = mongoose.model('Milestone');
//const promisify = require('es6-promisify');

exports.addMilestone = (req, res) => {
    res.render('editMilestone', { title: 'Add Milestone' });
};

exports.createMilestone = async (req, res) => {
    const count = await Milestone.count();

    req.body.author = req.user._id;
    req.body.order = count+1;
    const newMilestone = new Milestone(req.body);
    await newMilestone.save();
    res.redirect('/milestones');
};

exports.getMilestones = async (req, res) => {

    // 1. Query the db for list of all milestones
    const milestones = await Milestone.find().sort({ order: 1 });

    res.render('milestones', { title: 'Milestones', milestones });
};

exports.updateMilestone= async (req, res) => {
    // 1. find and update the store given the id
    const milestone = await Milestone.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    }).exec();

    res.redirect(`/milestones`);
};

exports.editMilestone = async (req, res) => {
    // 1. find the milestone given the id
    const milestone = await Milestone.findOne({ _id: req.params.id });

    // 2. confirm they are the owner of the milestone
    // confirmOwner(milestone, req.user);

    // 3. render edit form for users to edit the milestone
    res.render('editMilestone', { title: `Edit ${milestone.name}`, milestone });
};

exports.moveUp = async (req, res, next) => {
    // 1. find the milestone given the id
    const milestone = await Milestone.findOne({ _id: req.params.id });
    if (!milestone) {
        req.flash('error', 'Requested milestone is not invalid');
        return res.redirect('/milestones');
    }

    // 2. move the order up by 1.5 (to avoid conflict since rest are integers)
    milestone.order = (milestone.order || 1) - 1.5;
    await milestone.save();

    next();
};

exports.moveDown = async (req, res, next) => {
    // 1. find the milestone given the id
    const milestone = await Milestone.findOne({ _id: req.params.id });
    if (!milestone) {
        req.flash('error', 'Requested milestone is not invalid');
        return res.redirect('/milestones');
    }

    // 2. move the order up by 1.5 (to avoid conflict since rest are integers)
    milestone.order = (milestone.order || 0) + 1.5;
    await milestone.save();

    next();
};

// not efficient, since we expect to have very few milestones
exports.reorderAll = async (req, res) => {
    const milestones = await Milestone.find().sort({ order: 1 });
    let updatePromise = [];
    for (let i = 0; i < milestones.length; i++)
    {
        milestones[i].order = i+1;
        updatePromise.push(milestones[i].save());
    }

    await Promise.all(updatePromise);
    res.redirect(`/milestones`);
};