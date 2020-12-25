const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const Event = require('./Event');
const User = require('./User');

class Presence extends Model {

}

Presence.init({
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
        }
    },
    eventId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Event,
            key: 'id'
        }
    },
    confirmedBy: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Presence',
    tableName: 'presences',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Presence;