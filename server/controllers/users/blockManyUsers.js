const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const User = require('../../models/User');
const Role = require('../../models/Role');

/**
 * @desc    Block many users
 * @route   POST /api/v1/users/block_many
 * @access  Private/Admin
 */
exports.blockManyUsers = asyncHandler(async (req, res, next) => {
    const { ids } = req.body;

    if (!ids) {
        return next(
            new ErrorResponse('You have to select at least one user.', 400)
        )
    }

    // For send email
    const emails = [];
    let countBlocked = 0;
    for (const id of ids) {
        const user = await User.findByPk(id);
        if (user && user.role !== Role.Admin) {
            user.isBlocked = true;
            await user.save();
            countBlocked++;
            // For send email
            emails.push(user.email);
        }
    }

    res.status(200).json({
        success: true,
        data: {
            msg: `${countBlocked} of ${ids.length} users have been successfully blocked.`
        }
    });

    const html = `<p>Your account has been blocked by the Administrator.</p>`;

    for (const email of emails) {
        try {
            await sendEmail({
                email: email,
                subject: 'Account blocked.',
                html: html
            });
        } catch (err) { }
    }
});