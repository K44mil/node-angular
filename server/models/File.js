const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');

class File extends Model {

}

File.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name'
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'type'
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'path'
    },
    isLoginProtected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_login_protected'
    }
}, {
    sequelize,
    modelName: 'File',
    tableName: 'files',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = File;
