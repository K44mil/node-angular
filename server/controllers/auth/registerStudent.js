const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const sendEmail = require('../../utils/sendEmail');
const { Op } = require('sequelize');
const User = require('../../models/User');
const Group = require('../../models/Group');
const Role = require('../../models/Role');
const UserGroup = require('../../models/relationsModels/UserGroup');
const { validateUser } = require('../../utils/validators');

/**
 * @desc    Register student
 * @route   POST /api/v1/auth/register_student
 * @access  Public
 */
exports.registerStudent = asyncHandler(async (req, res, next) => {
    const { email, password, confirmPassword, acceptTerms, firstName, lastName, albumNumber,
            groupId } = req.body;

    const userForValidation = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        firstName: firstName,
        lastName: lastName,
        role: Role.Student,
        albumNumber: albumNumber
    };

    const validation = validateUser(userForValidation);
    if (validation.success === false)
        return next(new ErrorResponse(validation.message));

    if (!acceptTerms || acceptTerms !== true)
        return next(new ErrorResponse('You have to accept the terms.'));

    // Check if user exists
    let user = await User.findOne({
        where: {
            email: {
                [Op.eq]: email
            }
        }
    });

    if (user) {
        return next(
            new ErrorResponse(`User with provided email already exists.`, 400)
        );
    }

    // Album Number validation
    user = await User.findOne({
        where: {
            albumNumber: {
                [Op.eq]: albumNumber 
            }
        }
    });

    if (user) {
        return next(
            new ErrorResponse(`Student with provided album number already exists.`, 400)
        );
    }

    if (!albumNumber.match(/^[0-9]{6}$/)) {
        return next(
            new ErrorResponse('Album number must consist of exacly 6 digits.', 400)
        )
    }

    // Check if group exists and is open
    let group;
    if (groupId) {
        group = await Group.findByPk(groupId);

        if (!group) {
            return next(
                new ErrorResponse('Choosen group does not exist or it is closed.', 400)
            );
        }

        if (!group.isOpen) {
            return next(
                new ErrorResponse('Choosen group does not exist or it is closed.', 400)
            );
        }
    }

    user = await User.build({
        email,
        password,
        role: Role.Student,
        firstName,
        lastName,
        albumNumber
    });
    await user.hashPassword();

    await user.save();

    // Connect user with group
    if (groupId)
        await UserGroup.create({
            userId: user.id,
            groupId: group.id
        });

    res.status(200).json({
        success: true,
        data: { }
    });

    const message = `Your account was created.
        It has to be verified by the administrator.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Registration',
            message
        });
    } catch (err) {
        console.log(err);

        return next(
            new ErrorResponse(`Email could not be sent`, 500)
        );
    }
});
