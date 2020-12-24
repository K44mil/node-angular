const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const Group = require('./Group');
const User = require('./User');

class StudentNote extends Model {

}

StudentNote.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    text: {
        type: DataTypes.STRING(512),
        allowNull: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    groupId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Group,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'StudentNote',
    tableName: 'student_notes',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = StudentNote;