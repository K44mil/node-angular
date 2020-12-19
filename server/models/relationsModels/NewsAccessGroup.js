const { sequelize } = require('../../config/db');
const { Model, DataTypes } = require('sequelize');
const NewsAccess = require('../NewsAccess');
const Group = require('../Group');

class NewsAccessGroup extends Model {

}

NewsAccessGroup.init({
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
    modelName: 'NewsAccessGroup',
    tableName: 'news_access_group',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = NewsAccessGroup;