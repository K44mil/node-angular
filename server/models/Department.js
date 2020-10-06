const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');

class Department extends Model {

}

Department.init({
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
    }
}, {
    sequelize,
    modelName: 'Department',
    tableName: 'departments',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Department;