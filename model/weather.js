const mongoose = require('mongoose');

const weaterSchema = new mongoose.Schema({
    averaged: Number,
    min: String,
    max: String,
    iconCode: String,
    descraption: String,
    uid: String,
    city: String,
    date: Date

    // uid:mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Weather', weaterSchema);
