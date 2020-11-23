const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const Specialization = require('./Specialization');

class Subject extends Model {

}

Subject.init({
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
    specializationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Specialization,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Subject',
    tableName: 'subjects',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Subject;