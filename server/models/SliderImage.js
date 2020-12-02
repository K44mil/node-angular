const mongoose = require('mongoose');

const SliderImageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    isVisible: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('SliderImage', SliderImageSchema);