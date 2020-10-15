const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');

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
    }
}, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Comment;