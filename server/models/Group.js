const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const University = require('./University');
const Faculty = require('./Faculty');
const Specialization = require('./Specialization');
const Subject = require('./Subject');
const Course = require('./Course');

class Group extends Model {

}

Group.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        field: 'name'
    },
    displayName: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: 'display_name'
    },
    isOpen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_open'
    },
    level: {
        type: DataTypes.ENUM('inz', 'mgr'),
        allowNull: false,
        field: 'level'
    },
    type: {
        type: DataTypes.ENUM('dzienne', 'zaoczne'),
        allowNull: false,
        field: 'type'
    },
    semester: {
        type: DataTypes.STRING(2),
        allowNull: false,
        field: 'semester'
    },
    groupType: {
        type: DataTypes.ENUM('lab', 'lec', 'exc', 'proj'),
        allowNull: false,
        field: 'group_type'
    },
    universityId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: University,
            key: 'id'
        },
        field: 'university_id'
    },
    facultyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Faculty,
            key: 'id'
        },
        field: 'faculty_id'
    },
    // DEPARTMENT HERE ?
    courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Course,
            key: 'id'
        },
        field: 'course_id'
    },
    specializationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Specialization,
            key: 'id'
        },
        field: 'specialization_id'
    },
    subjectId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Subject,
            key: 'id'
        },
        field: 'subject_id'
    }
}, {
    sequelize,
    modelName: 'Group',
    tableName: 'groups',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Group;