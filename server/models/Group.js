const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const University = require('./University');
const Faculty = require('./Faculty');
const Specialization = require('./Specialization');
const Subject = require('./Subject');
const Course = require('./Course');
const Department = require('./Department');

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
    isArchive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_archive'
    },
    level: {
        type: DataTypes.ENUM('I', 'M'),
        allowNull: false,
        field: 'level'
    },
    type: {
        type: DataTypes.ENUM('D', 'Z'),
        allowNull: false,
        field: 'type'
    },
    semester: {
        type: DataTypes.STRING(2),
        allowNull: false,
        field: 'semester'
    },
    academicYear: {
        type: DataTypes.STRING(9),
        allowNull: false,
        field: 'academic_year',
        validate: {
            is: /^\d{4}[/]\d{4}$/i
        }
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
        }
    },
    facultyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Faculty,
            key: 'id'
        }
    },
    departmentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Department,
            key: 'id'
        }
    },
    courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Course,
            key: 'id'
        }
    },
    specializationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Specialization,
            key: 'id'
        }
    },
    subjectId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Subject,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Group',
    tableName: 'groups',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Group;