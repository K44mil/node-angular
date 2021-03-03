const mongoose = require('mongoose');

const Session = new mongoose.Schema({
    address: {
        type: String,
        unique: true
    },
    countSockets: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('Session', Session);