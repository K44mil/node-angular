const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const University = require('./University');

class Faculty extends Model {

}

Faculty.init({
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
    universityId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: University,
            key: 'id'
        },
        field: 'university_id'
    }
}, {
    sequelize,
    modelName: 'Faculty',
    tableName: 'faculties',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Faculty;