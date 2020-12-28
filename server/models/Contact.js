const mongoose = require('mongoose');

const Link = new mongoose.Schema({
    caption: {
        type: String
    },
    href: {
        type: String
    }
});

// const SocialMediaLink = new mongoose.Schema({
//     image: {
//         type: String
//     },
//     href: {
//         type: String
//     }
// });

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
    },
    consultations: {
        type: String
    },
    shortInformation: {
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
        universityLinks: [Link]
    },
    // universityCP: { // University on ContactPage
    //     image: {
    //         type: String
    //     },
    //     universityLinks: [Link]
    // },
    // socialMedia: [SocialMediaLink]
});

module.exports = mongoose.model('Contact', Contact);