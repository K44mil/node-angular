const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');

class Category extends Model {

}

Category.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        field: 'name'
    },
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Category;