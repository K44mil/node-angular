const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');

class Course extends Model {

}

Course.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(256),
        allowNull: false,
        field: 'name'
    },
    short: {
        type: DataTypes.STRING(8),
        allowNull: false,
        field: 'short'
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_visible'
    },
    isArchive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_archive'
    }
}, {
    sequelize,
    modelName: 'Course',
    tableName: 'courses',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Course;