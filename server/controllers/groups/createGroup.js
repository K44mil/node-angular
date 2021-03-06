const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/asyncHandler');
const Group = require('../../models/Group');
const University = require('../../models/University');
const Faculty = require('../../models/Faculty');
const Department = require('../../models/Department');
const Specialization = require('../../models/Specialization');
const Course = require('../../models/Course');
const Subject = require('../../models/Subject');
const { Op } = require('sequelize');

/**
 * @desc    Create Group
 * @route   POST /api/v1/groups
 * @access  Private/Admin
 */
exports.createGroup = asyncHandler(async (req, res, next) => {
    const {
        number,
        isOpen,
        level,
        type,
        // semester,
        academicYear,
        groupType,
        // universityId,
        // facultyId,
        // departmentId,
        courseId,
        specializationId,
        subjectId
    } = req.body;

    // Check university [OLD]
    // const university = await University.findByPk(universityId);
    // if (!universityId) {
    //     return next(
    //         new ErrorResponse(`University does not exist.`, 400)
    //     );
    // }

    // Check faculty [OLD]
    // const faculty = await Faculty.findByPk(facultyId);
    // if (!faculty) {
    //     return next(
    //         new ErrorResponse(`Faculty does not exist`, 400)
    //     );
    // }

    // Check department [OLD]
    // const department = await Department.findByPk(departmentId);
    // if (!department) {
    //     return next(
    //         new ErrorResponse(`Department does not exist`, 400)
    //     );
    // }

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

    if (group) {
        return next(
            new ErrorResponse('This group already exists.', 400)
        );
    }

    group = await Group.build({
        number,
        displayName,
        isOpen,
        level,
        type,
        // semester,
        academicYear,
        groupType,
        // universityId: university.id,
        // facultyId: faculty.id,
        // departmentId: department.id,
        courseId: course.id,
        specializationId: specialization.id,
        subjectId: subject.id
    });

    await group.save();

    res.status(200).json({
        success: true,
        data: {
            group
        }
    })
});