const mongoose = require('mongoose');

const BiographyPageSchema = new mongoose.Schema({
    text: {
        type: String
    }
});

module.exports = mongoose.model('BiographyPage', BiographyPageSchema);