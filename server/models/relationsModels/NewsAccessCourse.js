const { sequelize } = require('../../config/db');
const { Model, DataTypes } = require('sequelize');
const NewsAccess = require('../NewsAccess');
const Course = require('../Course');

class NewsAccessCourse extends Model {

}

NewsAccessCourse.init({
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
    courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Course,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'NewsAccessCourse',
    tableName: 'news_access_course',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = NewsAccessCourse;