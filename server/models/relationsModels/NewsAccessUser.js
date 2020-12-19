const { sequelize } = require('../../config/db');
const { Model, DataTypes } = require('sequelize');
const NewsAccess = require('../NewsAccess');
const User = require('../User');

class NewsAccessUser extends Model {

}

NewsAccessUser.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    newsAccessId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: NewsAccess,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'NewsAccessUser',
    tableName: 'news_access_user',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = NewsAccessUser;