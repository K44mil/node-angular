const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const sendEmail = require('../../utils/sendEmail');
const { Op } = require('sequelize');
const User = require('../../models/User');
const Group = require('../../models/Group');
const Role = require('../../models/Role');
const UserGroup = require('../../models/relationsModels/UserGroup');

/**
 * @desc    Register student
 * @route   POST /api/v1/auth/register_student
 * @access  Public
 */
exports.registerStudent = asyncHandler(async (req, res, next) => {
    const {
        email,
        password,
        confirmPassword,
        acceptTerms,
        firstName,
        lastName,
        albumNumber,
        groupId
    } = req.body;

    if (!email || !password || !confirmPassword
        || !acceptTerms || !firstName || !lastName || !albumNumber) {
        return next(
            new ErrorResponse(`All fields are required.`, 400)
        );
    }

    // PASSWORD VALIDATION
    if (password !== confirmPassword) {
        return next(
            new ErrorResponse(`Passwords must be identical.`, 400)
        );
    }

    if (password.length < 8 || password.length > 16) {
        return next(
            new ErrorResponse(`Password length must be between 8 and 16 characters.`, 400)
        );
    }

    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/)) {
        return next(
            new ErrorResponse(`The password must contain upper and lower case letters, a number and a special character.`, 400)
        );
    }

    if (acceptTerms !== true) {
        return next(
            new ErrorResponse(`You must accept Terms and Conditions.`, 400)
        );
    }

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
            new ErrorResponse(`Email in use.`, 400)
        );
    }

    // Check if group exists and is open
    const group = await Group.findByPk(groupId);

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
