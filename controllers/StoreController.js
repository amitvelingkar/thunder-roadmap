const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req,res) => {
    res.render('index');
};

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add Store' });
};

exports.createStore = async (req, res) => {
    const store = await (new Store(req.body)).save();
    req.flash('success',`Sucessfully created <Strong>${store.name}</Strong>. Care to leave a review?`);
    res.redirect(`/store/${store.slug}`);
};

exports.updateStore = async (req, res) => {
    // 1. find and update the store given the id
    const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    }).exec();

    req.flash('success',`Sucessfully updated <Strong>${store.name}</Strong>. <a href="/stores/${store.slug}">View Store</a>`);
    res.redirect(`/stores/${store._id}/edit`);
};

exports.getStores = async (req, res) => {
    // 1. Query the db for list of all stores
    const stores = await Store.find();

    res.render('stores', { title: 'Stores', stores});
};

exports.editStore = async (req, res) => {
    // 1. find the store given the id
    const store = await Store.findOne({ _id: req.params.id });

    // 2. confirm they are the owner of the store

    // 3. render edit form for users to edit the store
    res.render('editStore', { title: `Edit ${store.name}`, store });
};
