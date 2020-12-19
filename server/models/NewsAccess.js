const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const News = require('./News');

class NewsAccess extends Model {

}

NewsAccess.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    isOn: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_on'
    },
    newsId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: News,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'NewsAccess',
    tableName: 'news_access',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = NewsAccess;