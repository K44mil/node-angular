const User = require('../models/User');
const News = require('../models/News');
const NewsCategory = require('../models/relationsModels/NewsCategory');
const Category = require('../models/Category');
const File = require('../models/File');
const Comment = require('../models/Comment');

const University = require('../models/University');
const Faculty = require('../models/Faculty');
const Department = require('../models/Department');
const Specialization = require('../models/Specialization');
const Course = require('../models/Course');
const Subject = require('../models/Subject');
const Group = require('../models/Group');

const initSequelizeAssociations = () => {

    // User -|---o< News
    User.hasMany(News, { foreignKey: 'authorId'} );
    News.belongsTo(User, { foreignKey: 'authorId'} );

    // News >o---o< Category
    News.belongsToMany(Category, { through: NewsCategory, foreignKey: 'newsId', otherKey: 'categoryId' });
    Category.belongsToMany(News, { through: NewsCategory, foreignKey: 'categoryId', otherKey: 'newsId' });
    
    // News -|---o< File
    News.hasMany(File, { foreignKey: 'newsId' } );
    File.belongsTo(News, { foreignKey: 'newsId' });

    // News -|---o< Comment
    News.hasMany(Comment, { foreignKey: 'newsId' });
    Comment.belongsTo(News, { foreignKey: 'newsId' });

    // User -|---o< Comment
    User.hasMany(Comment, { foreignKey: 'userId' });
    Comment.belongsTo(User, { foreignKey: 'userId' });

    // --- GROUPS

    // University -|---o< Group
    University.hasMany(Group, { foreignKey: 'universityId'} );
    Group.belongsTo(University, { foreignKey: 'universityId'} )

    // Faculty -|---o< Group
    Faculty.hasMany(Group, { foreignKey: 'facultyId' });
    Group.belongsTo(Faculty, { foreignKey: 'facultyId' });

    // Department -|---o< Group
    Department.hasMany(Group, { foreignKey: 'departmentId' });
    Group.belongsTo(Department, { foreignKey: 'departmentId' });

    // Specialization -|---o< Group
    Specialization.hasMany(Group, { foreignKey: 'specializationId' });
    Group.belongsTo(Specialization, { foreignKey: 'specializationId' });

    // Course -|---o< Group
    Course.hasMany(Group, { foreignKey: 'courseId' });
    Group.belongsTo(Course, { foreignKey: 'courseId' });

    // Subject -|---o< Group
    Subject.hasMany(Group, { foreignKey: 'subjectId' });
    Group.belongsTo(Subject, { foreignKey: 'subjectId' });

};

module.exports = initSequelizeAssociations;