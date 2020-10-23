const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const User = require('./User');
const News = require('./News');

class Comment extends Model {

}

Comment.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING(512),
        allowNull: false,
        field: 'content'
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
    },
    newsId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: News,
            key: 'id'
        },
    },
}, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Comment;