const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const Mark = require('./Mark');

class MarkDescription extends Model {

}

MarkDescription.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    text: {
        type: DataTypes.STRING(127),
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'MarkDescription',
    tableName: 'marks_descriptions',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = MarkDescription;