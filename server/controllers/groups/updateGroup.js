const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Group = require('../../models/Group');
const Specialization = require('../../models/Specialization');
const Course = require('../../models/Course');
const Subject = require('../../models/Subject');
const { Op } = require('sequelize');

/**
 * @desc    Update Group
 * @route   PUT /api/v1/groups/:id
 * @access  Private/Admin
 */
exports.updateGroup = asyncHandler(async (req, res, next) => {
    const {
        number,
        isOpen,
        level,
        type,
        academicYear,
        groupType,
        courseId,
        specializationId,
        subjectId
    } = req.body;

    // Check group
    const groupToUpdate = await Group.findByPk(req.params.id);
    if (!groupToUpdate) {
        return next(
            new ErrorResponse(`Group does not exist.`, 400)
        );
    }

    // Check course
    const course = await Course.findByPk(courseId);
    if (!course) {
        return next(
            new ErrorResponse(`Course does not exist.`, 400)
        );
    }

    // Check specialization
    const specialization = await Specialization.findByPk(specializationId);
    if (!specialization) {
        return next(
            new ErrorResponse(`Specialization does not exist.`, 400)
        );
    }

    // Check Subject
    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
        return next(
            new ErrorResponse(`Subject does not exist.`, 400)
        );
    }

    // Check academic year
    if (!academicYear.match(/^\d{4}[/]\d{4}$/i)) {
        return next(
            new ErrorResponse(`Invalid academic year.`, 400)
        );
    }

    let name = '';
    switch(groupType) {
        case 'lab':
            name = `L${number}`;
            break;
        case 'lec':
            name = `W${number}`;
            break;
        case 'exc':
            name = `C${number}`;
            break;
        case 'proj':
            name = `P${number}`;
            break;
    }

    const displayName = `\\${type}\\${level}\\${academicYear}_${course.short}_${specialization.short}_${subject.short}_${name}`;

    // Check if group already exists
    let group = await Group.findOne({
        where: {
            displayName: {
                [Op.eq]: displayName
            }
        }
    });

    if (group && group.id !== groupToUpdate.id) {
        return next(
            new ErrorResponse('This group already exists.', 400)
        );
    }

    group = await groupToUpdate.update({
        number,
        displayName,
        isOpen,
        level,
        type,
        academicYear,
        groupType,
        courseId: course.id,
        specializationId: specialization.id,
        subjectId: subject.id
    });

    res.status(200).json({
        success: true,
        data: {
            group
        }
    })
});