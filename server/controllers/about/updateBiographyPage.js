// const ErrorResponse = require('../../utils/ErrorResponse');
// const asyncHandler = require('../../middleware/asyncHandler');
// const BiographyPage = require('../../models/about/BiographyPage');

// /**
//  * @desc    Update Biography Page
//  * @route   PUT /api/v1/about/biography
//  * @access  Private/Admin
//  */
// exports.updateBiographyPage = asyncHandler(async (req, res, next) => {
//     const { text } = req.body;
//     const biographyPage = await BiographyPage.findOne();

//     if (!biographyPage) {
//         await BiographyPage.create({
//             text
//         });
//     } else {
//         biographyPage.text = text;
//         await biographyPage.save();
//     }

//     res.status(200).json({
//         success: true,
//         data: {
//             biographyPage
//         }
//     });
// });