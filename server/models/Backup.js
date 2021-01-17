const mongoose = require('mongoose');

const Backup = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    path: {
        type: String
    },
    files: [
        { type: String }
    ]
});

module.exports = mongoose.model('Backup', Backup);