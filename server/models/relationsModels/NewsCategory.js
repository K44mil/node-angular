const { sequelize } = require('../../config/db');
const { Model, DataTypes } = require('sequelize');
const News = require('../News');
const Category = require('../Category');

class NewsCategory extends Model {

}

NewsCategory.init({
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
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        },
    }
}, {
    sequelize,
    modelName: 'NewsCategory',
    tableName: 'news_category',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = NewsCategory;
