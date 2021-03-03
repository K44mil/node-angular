const mongoose = require('mongoose');

const SliderImageSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    secondCaption: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    isVisible: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('SliderImage', SliderImageSchema);