const mongoose = require('mongoose');
const Workflow = mongoose.model('Workflow');
//const promisify = require('es6-promisify');

exports.addWorkflow = (req, res) => {
    res.render('editWorkflow', { title: 'Add Workflow' });
};

exports.createWorkflow = async (req, res) => {
    const count = await Workflow.count();

    req.body.author = req.user._id;
    req.body.order = count+1;
    const newWorkflow = new Workflow(req.body);
    await newWorkflow.save();
    res.redirect('/workflows');
};

exports.getWorkflows = async (req, res) => {

    // 1. Query the db for list of all workflows
    const workflows = await Workflow.find().sort({ order: 1 });

    res.render('workflows', { title: 'Workflows', workflows });
};

exports.updateWorkflow= async (req, res) => {
    // 1. find and update the store given the id
    const workflow = await Workflow.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    }).exec();

    res.redirect(`/workflows`);
};

exports.editWorkflow = async (req, res) => {
    // 1. find the workflow given the id
    const workflow = await Workflow.findOne({ _id: req.params.id });

    // 2. confirm they are the owner of the workflow
    // confirmOwner(workflow, req.user);

    // 3. render edit form for users to edit the workflow
    res.render('editWorkflow', { title: `Edit ${workflow.name}`, workflow });
};

exports.moveUp = async (req, res, next) => {
    // 1. find the workflow given the id
    const workflow = await Workflow.findOne({ _id: req.params.id });
    if (!workflow) {
        req.flash('error', 'Requested workflow is not invalid');
        return res.redirect('/workflows');
    }

    // 2. move the order up by 1.5 (to avoid conflict since rest are integers)
    workflow.order = (workflow.order || 1) - 1.5;
    await workflow.save();

    next();
};

exports.moveDown = async (req, res, next) => {
    // 1. find the workflow given the id
    const workflow = await Workflow.findOne({ _id: req.params.id });
    if (!workflow) {
        req.flash('error', 'Requested workflow is not invalid');
        return res.redirect('/workflows');
    }

    // 2. move the order up by 1.5 (to avoid conflict since rest are integers)
    workflow.order = (workflow.order || 0) + 1.5;
    await workflow.save();

    next();
};

// not efficient, since we expect to have very few workflows
exports.reorderAll = async (req, res) => {
    const workflows = await Workflow.find().sort({ order: 1 });
    let updatePromise = [];
    for (let i = 0; i < workflows.length; i++)
    {
        workflows[i].order = i+1;
        updatePromise.push(workflows[i].save());
    }

    await Promise.all(updatePromise);
    res.redirect(`/workflows`);
};