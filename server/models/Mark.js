const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const Group = require('./Group');
const User = require('./User');
const MarkDescription = require('./MarkDescription');

class Mark extends Model {

}

Mark.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    value: {
        type: DataTypes.STRING(3),
        allowNull: false
    },
    markDescriptionId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: MarkDescription,
            key: 'id'
        }
    },
    final: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
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
    modelName: 'Mark',
    tableName: 'marks',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Mark;