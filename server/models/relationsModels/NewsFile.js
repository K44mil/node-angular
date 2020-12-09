const { sequelize } = require('../../config/db');
const { Model, DataTypes } = require('sequelize');
const News = require('../News');
const File = require('../File');

class NewsFile extends Model {

}

NewsFile.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    newsId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: News,
            key: 'id'
        },
    },
    fileId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: File,
            key: 'id'
        },
    }
}, {
    sequelize,
    modelName: 'NewsFile',
    tableName: 'news_file',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = NewsFile;