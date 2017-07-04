const mongoose = require('mongoose');
const Workflow = mongoose.model('Workflow');
//const promisify = require('es6-promisify');

exports.addWorkflow = (req, res) => {
    res.render('editWorkflow', { title: 'Add Workflow' });
};

exports.createWorkflow = async (req, res) => {
    console.log('creating workflow');
    req.body.author = req.user._id;
    const newWorkflow = new Workflow(req.body);
    await newWorkflow.save();

    req.flash('success', 'Workflow Saved');
    res.redirect('/workflows');
};

exports.getWorkflows = async (req, res) => {

    // 1. Query the db for list of all workflows
    const workflows = await Workflow.find();

    res.render('workflows', { title: 'Workflows', workflows });
};