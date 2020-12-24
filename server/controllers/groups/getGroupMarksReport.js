const asyncHandler = require("../../middleware/asyncHandler");
const Mark = require('../../models/Mark');
const User = require("../../models/User");
const { Op } = require('sequelize');
const UserGroup = require("../../models/relationsModels/UserGroup");
const Group = require("../../models/Group");
const ErrorResponse = require("../../utils/ErrorResponse");
const pdf = require('html-pdf');
const fs = require('fs');
const Course = require('../../models/Course');
const Specialization = require("../../models/Specialization");
const Subject = require('../../models/Subject');

/**
 * @desc    Get group marks report
 * @route   GET /api/v1/groups/:id/marks_report
 * @access  Private/Admin
 */
exports.getGroupMarksReport = asyncHandler(async (req, res, next) => {
    const group = await Group.findByPk(req.params.id, {
        include: [Course, Specialization, Subject]
    });
    if (!group) {
        return next(
            new ErrorResponse('Group does not exist.', 400)
        )
    }

    const users = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'albumNumber'],
        include: [
            {
                model: UserGroup,
                where: { isConfirmed: { [Op.eq]: 1 }, groupId: { [Op.eq]: group.id }}
            }
        ],
        order: [
            ['lastName', 'ASC'],
            ['firstName', 'ASC']
        ]
    });

    let table = `
        <table class="marks-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th colspan="2">Student</th>
                </tr>
            </thead>
            <tbody>
        `;

    let i = 1;
    for (const u of users) {
        const m = u.toJSON();
        m.marks = await Mark.findAll({ where: { userId: { [Op.eq]: u.id }, groupId: { [Op.eq]: group.id }}, order: [['created_at', 'DESC']] });

        table += `<tr><td>${i++}</td><td>${u.firstName} ${u.lastName}</td><td>${u.albumNumber}</td>`;

        for (const mark of m.marks) {
            table += `<td class="mark">${mark.value}</td>`;
        }

        if (m.marks.length > 0) table += `<td class="marks-avg">${getMarksAvg(m.marks)}</td>`

        table += `</tr>`;
    }

    const html = `
        <html>
            <head>
                <style>
                    .marks-table {
                        border-collapse: collapse
                    }
                    .marks-table td, .marks-table th {
                        border: 1px solid #ddd;
                        padding: 8px;
                    }
                    .marks-table th {
                        text-align: center;
                    }
                    .mark {
                        background-color: #FCF8E3;
                    }
                    .marks-avg {
                        background-color: #17a2b8;
                    }
                </style>
            </head>
            <body>
                <h1>Marks Report</h1>
                <p>Created by ${req.user.firstName} ${req.user.lastName}</p>
                <p>Created at ${new Date().toLocaleString('pl')}</p>
                <div>
                    Group:
                    <table style="text-align: left;">
                        <tr><th scope="row">Course: </td> <td style="padding-left: 10px;">${group.Course.name}</td></tr>
                        <tr><th scope="row">Specialization: </td> <td style="padding-left: 10px;">${group.Specialization.name}</td></tr>
                        <tr><th scope="row">Subject: </td> <td style="padding-left: 10px;">${group.Subject.name}</td></tr>
                        <tr><th scope="row">Academic Year: </td> <td style="padding-left: 10px;">${group.academicYear}</td></tr>
                        <tr><th scope="row">Level: </td> <td style="padding-left: 10px;">${printStudiesLevel(group.level)}</td></tr>
                        <tr><th scope="row">Studies type: </td> <td style="padding-left: 10px;">${printStudiesType(group.type)}</td></tr>
                        <tr><th scope="row">Group Type: </td> <td style="padding-left: 10px;">${printGroupType(group.groupType)}</td></tr>
                        <tr><th scope="row">Group Number: </td> <td style="padding-left: 10px;">${group.number}</td></tr>
                    </table>
                </div>
                ${table}

            </body>
        </html>
    `;

    let options = {
        border: {
            top: "0.2in",            // default is 0, units: mm, cm, in, px
            right: "0.5in",
            bottom: "0.2in",
            left: "0.5in"
          },
    }

    pdf.create(html, options).toStream(async (err, stream) => {
        stream.pipe(fs.createWriteStream('./report.pdf'));
        stream.on('end', () => {
            res.download('./report.pdf');
        });
    });
});

function getMarksAvg(marks) {
    let sum = 0, count = 0;
    for (const m of marks) {
        sum += Number(m.value);
        count++;
    }

    return (sum/count).toFixed(2);
}

function printStudiesLevel(level) {
    if (level === 'I') return 'First-degree';
    else return 'Second-degree';
}

function printStudiesType(type) {
    if (type === 'D') return 'Full-time';
    else return 'Part-time';
}

function printGroupType(type) {
    if (type === 'lab') return 'Laboratory';
    if (type === 'exec') return 'Exercise';
    if (type === 'lec') return 'Lecture';
    if (type === 'proj') return 'Project';
}