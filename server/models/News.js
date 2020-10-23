const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const User = require('./User');

class News extends Model {

}

News.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(256),
        allowNull: false,
        field: 'title'
    },
    slug: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true,
        field: 'slug'
    },
    description: {
        type: DataTypes.STRING(512),
        allowNull: true,
        field: 'description'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'content'
    },
    image: {
        type: DataTypes.STRING(256),
        defaultValue: 'no-news-photo.jpg',
        field: 'image'
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_visible'
    },
    isCommentable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_commentable'
    },
    isLoginProtected: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_login_protected'
    },
    authorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'News',
    tableName: 'news',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = News;