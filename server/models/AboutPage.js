const mongoose = require('mongoose');

const AboutPageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    priority: {
        type: Number
    }
});

module.exports = mongoose.model('AboutPage', AboutPageSchema);