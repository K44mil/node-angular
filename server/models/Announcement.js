const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    visibleFrom: {
        type: Date,
        default: Date.now
    },
    visibleTo: {
        type: Date
    },
    isVisible: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);