const mongoose = require('mongoose');

const Contact = new mongoose.Schema({
    country: {
        type: String
    },
    city: {
        type: String
    },
    street: {
        type: String
    },
    postalCode: {
        type: String
    },
    room: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    webPage: {
        type: String
    }
});

module.exports = mongoose.model('Contact', Contact);