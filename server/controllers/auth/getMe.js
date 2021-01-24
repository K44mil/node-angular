const asyncHandler = require('../../middleware/asyncHandler');
const { getLoggedUser } = require('../../middleware/auth');
const ErrorResponse = require('../../utils/ErrorResponse');
const Session = require('../../models/Session');
const GeneralInfo = require('../../models/GeneralInfo');

/**
 * @desc    Get logged user data
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await getLoggedUser(req);

    if (!req.cookies.session) {
        res.cookie('session', `session_id_test`);

        // Total Visits
        const general = await GeneralInfo.findOne();
        if (general) {
            if (general.totalViews) general.totalViews += 1;
            else general.totalViews = 1;
            await general.save();
        }   
    }

    // const user = await User.findByPk(req.user.id);
    if (!user)
        return next(new ErrorResponse('Not authorized.', 400));

    res.status(200).json({
        success: true,
        data: {
            user
        }
    })
});