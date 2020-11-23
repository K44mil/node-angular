const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const Course = require('./Course');

class Specialization extends Model {

}

Specialization.init({
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
    courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Course,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Specialization',
    tableName: 'specializations',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = Specialization;