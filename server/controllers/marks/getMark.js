const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Mark = require('../../models/Mark');
const User = require('../../models/User');
const MarkDescription = require('../../models/MarkDescription');

/**
 * @desc    Get Mark Details
 * @route   GET /api/v1/marks/:id
 * @access  Private/Admin
 */
exports.getMark = asyncHandler(async (req, res, next) => {
    const mark = await Mark.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName']
            },
            {
                model: MarkDescription
            }
        ]
    });
    
    if (!mark) {
        return next(
            new ErrorResponse('Mark does not exist.', 400)
        )
    }

    res.status(200).json({
        success: true,
        data: {
            mark
        }
    });
});