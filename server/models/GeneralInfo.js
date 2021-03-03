const mongoose = require('mongoose');

const Link = new mongoose.Schema({
    caption: {
        type: String
    },
    href: {
        type: String
    }
});

const GeneralInfo = new mongoose.Schema({
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
    },
    consultations: {
        type: String
    },
    shortInformation: {
        type: String
    },
    calendarUrl: {
        type: String
    },
    contactLinks: [Link],
    university: { // University on HomePage
        image: {
            type: String
        },
        name: { type: String },
        faculty: { type: String },
        department: { type: String },
        addressLine1: { type: String },
        addressLine2: { type: String },
        universityLinks: [Link]
    },
    termsText: {
        type: String
    },
    online: {
        type: Number
    },
    totalViews: {
        type: Number
    }
});

module.exports = mongoose.model('GeneralInfo', GeneralInfo);