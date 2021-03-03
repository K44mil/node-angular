const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const User = require('../../models/User');
const Role = require('../../models/Role');
const sendEmail = require('../../utils/sendEmail');

/**
 * @desc    Activate many users
 * @route   POST /api/v1/users/activate_many
 * @access  Private/Admin
 */
exports.activateManyUsers = asyncHandler(async (req, res, next) => {
    const { ids } = req.body;

    if (!ids) {
        return next(
            new ErrorResponse('You have to select at least one user.', 400)
        )
    }

    // For send email
    const emails = [];
    let countActivated = 0;
    for (const id of ids) {
        const user = await User.findByPk(id);
        if (user) {
            user.isVerified = true;
            await user.save();
            countActivated++;
            // For send email
            emails.push(user.email);
        }
    }

    

    res.status(200).json({
        success: true,
        data: {
            msg: `${countActivated} of ${ids.length} users have been successfully activated.`
        }
    });

    const html = `<p>Your account has been activated.</p>`;

    for (const email of emails) {
        try {
            await sendEmail({
                email: email,
                subject: 'Account activated.',
                html: html
            });
        } catch (err) { }
    }
});