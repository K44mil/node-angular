const { sequelize } = require('../../config/db');
const { Model, DataTypes } = require('sequelize');
const User = require('../User');
const Group = require('../Group');

class UserGroup extends Model {

}

UserGroup.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    isConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_confirmed'
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        field: 'user_id'
    },
    groupId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Group,
            key: 'id'
        },
        field: 'group_id'
    }
}, {
    sequelize,
    modelName: 'UserGroup',
    tableName: 'user_group',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = UserGroup;
