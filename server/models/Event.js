const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const Group = require('./Group');

class Event extends Model {

}

Event.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'name'
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date'
    },
    isOpen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_open'
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
    modelName: 'Event',
    tableName: 'events',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Event;