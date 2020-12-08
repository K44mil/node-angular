const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const News = require('./News');

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
    size: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'size'
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'path'
    },
    // newsId: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     references: {
    //         model: News,
    //         key: 'id'
    //     }
    // },
    // isLoginProtected: {
    //     type: DataTypes.BOOLEAN,
    //     defaultValue: false,
    //     field: 'is_login_protected'
    // }
}, {
    sequelize,
    modelName: 'File',
    tableName: 'files',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = File;
