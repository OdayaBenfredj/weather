// const { getMaxListeners } = require("../app")
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const users = new mongoose.Schema({
    password: String,
    userName: String,
    email: { type: String, unique: true },
    // uid: mongoose.Schema.Types.ObjectId
});
users.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) { return next(err); }
        user.password = hash;
        next();
    });
});

users.methods.checkPassword = function (candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err) return reject(err);
            resolve(isMatch);
        })
    })
};

module.exports = mongoose.model('Users', users);
