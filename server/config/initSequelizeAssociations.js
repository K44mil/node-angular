const User = require('../models/User');
const News = require('../models/News');
const NewsCategory = require('../models/relationsModels/NewsCategory');
const Course = require('../models/Course');
const Faculty = require('../models/Faculty');
const Category = require('../models/Category');
const File = require('../models/File');
const Comment = require('../models/Comment');

const initSequelizeAssociations = () => {

    // User -|---o< News
    User.hasMany(News, { foreignKey: 'authorId'} );
    News.belongsTo(User, { foreignKey: 'authorId'} );

    // News >o---o< Category
    News.belongsToMany(Category, { through: NewsCategory, foreignKey: 'newsId', otherKey: 'categoryId' });
    Category.belongsToMany(News, { through: NewsCategory, foreignKey: 'categoryId', otherKey: 'newsId' });
    
    // News -|---o< File
    // News.hasMany(File, { foreignKey: 'newsId' } );
    // File.belongsTo(News, { foreignKey: 'newsId' });

    // News -|---o< Comment
    News.hasMany(Comment, { foreignKey: 'newsId' });
    Comment.belongsTo(News, { foreignKey: 'newsId' });

    // User -|---o< Comment
    User.hasMany(Comment, { foreignKey: 'userId' });
    Comment.belongsTo(User, { foreignKey: 'userId' });

    // Faculty -|---o< Courses
    Faculty.hasMany(Course, { foreignKey: 'facultyId' } );
    Course.belongsTo(Faculty, { foreignKey: 'facultyId' });
};

module.exports = initSequelizeAssociations;