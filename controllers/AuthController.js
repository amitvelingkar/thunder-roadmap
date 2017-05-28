const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Failed Login',
    successRedirect: '/',
    successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
    req.logout();
    req.flash('sucess', 'You are now logged out!');
    res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next(); // carry on, they are logged in
        return;
    }

    req.flash('error', 'Oops, you must be logged in to do that');
    res.redirect('/login');
};

exports.forgot = async (req, res) => {
    // 1. see if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        req.flash('error', 'No account exists with this email');
        return res.redirect('/login');
    }

    // 2. set reset tokens and expiry
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour form now
    await user.save();

    // 3. send e-mail with token
    // TODO - remove url from flash and email this instead
    const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
    await mail.send({
        user: user,
        filename: 'password-reset',
        subject: 'Password Reset',
        resetURL: resetURL
    });
    req.flash('success', 'You have been emailed a password reset link.');

    // 4. redirect to login page
    res.redirect('/login');
};

exports.reset = async (req,res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        req.flash('error', 'Password reset is invalid or expired');
        return res.redirect('/login');
    }

    // if there is user, show the reset password form
    res.render('reset', {title: 'Reset your Password'});

};

exports.confirmPasswords = (req, res, next) => {
    if (req.body.password === req.body['password-confirm']) {
        next();
        return;
    }
    req.flash('error', 'Passwords do not match!');
    res.redirect('/login');
};

exports.update = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        req.flash('error', 'Password reset is invalid or expired');
        return res.redirect('/login');
    }
    const setPassword = promisify(user.setPassword, user);
    await setPassword(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    const updatedUser = await user.save();
    await req.login(updatedUser);
    req.flash('success', 'Your password has been reset!');
    res.redirect('/');
};
