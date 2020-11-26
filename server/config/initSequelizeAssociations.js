const User = require('../models/User');
const News = require('../models/News');
const NewsCategory = require('../models/relationsModels/NewsCategory');
const Category = require('../models/Category');
const File = require('../models/File');
const Comment = require('../models/Comment');
const UserGroup = require('../models/relationsModels/UserGroup');

// const University = require('../models/University');
// const Faculty = require('../models/Faculty');
// const Department = require('../models/Department');
const Specialization = require('../models/Specialization');
const Course = require('../models/Course');
const Subject = require('../models/Subject');
const Group = require('../models/Group');
const Event = require('../models/Event');
const Presence = require('../models/Presence');
const Mark = require('../models/Mark');

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

    // Course -|---o< Specialization
    Course.hasMany(Specialization, { foreignKey: 'courseId' });
    Specialization.belongsTo(Course, { foreignKey: 'courseId' });

    // Specialization -|---o< Subject
    Specialization.hasMany(Subject, { foreignKey: 'specializationId' });
    Subject.belongsTo(Specialization, { foreignKey: 'specializationId' });

    // University -|---o< Group
    // University.hasMany(Group, { foreignKey: 'universityId'} );
    // Group.belongsTo(University, { foreignKey: 'universityId'} )

    // Faculty -|---o< Group
    // Faculty.hasMany(Group, { foreignKey: 'facultyId' });
    // Group.belongsTo(Faculty, { foreignKey: 'facultyId' });

    // Department -|---o< Group
    // Department.hasMany(Group, { foreignKey: 'departmentId' });
    // Group.belongsTo(Department, { foreignKey: 'departmentId' });

    // Specialization -|---o< Group
    Specialization.hasMany(Group, { foreignKey: 'specializationId' });
    Group.belongsTo(Specialization, { foreignKey: 'specializationId' });

    // Course -|---o< Group
    Course.hasMany(Group, { foreignKey: 'courseId' });
    Group.belongsTo(Course, { foreignKey: 'courseId' });

    // Subject -|---o< Group
    Subject.hasMany(Group, { foreignKey: 'subjectId' });
    Group.belongsTo(Subject, { foreignKey: 'subjectId' });

    // User >o---o< Group
    // User -|---o< UserGroup
    User.hasMany(UserGroup, { foreignKey: 'userId' });
    UserGroup.belongsTo(User, { foreignKey: 'userId' });
    // Group -|---o< UserGroup
    Group.hasMany(UserGroup, { foreignKey: 'groupId' });
    UserGroup.belongsTo(Group, { foreignKey: 'groupId' });

    // Group -|---o< Event
    Group.hasMany(Event, { foreignKey: 'groupId' });
    Event.belongsTo(Group, { foreignKey: 'groupId' });

    // User -|---o< Presence
    User.hasMany(Presence, { foreignKey: 'userId' });
    Presence.belongsTo(User, { foreignKey: 'userId' });

    // Event -|---o< Presence
    Event.hasMany(Presence, { foreignKey: 'eventId'} );
    Presence.belongsTo(Event, { foreignKey: 'eventId'});

    // MARKS
    // User -|---o< Mark
    User.hasMany(Mark, { foreignKey: 'userId' });
    Mark.belongsTo(User, { foreignKey: 'userId' });

    // Group -|---o< Mark
    Group.hasMany(Mark, { foreignKey: 'groupId' });
    Mark.belongsTo(Group, { foreignKey: 'groupId' });
};

module.exports = initSequelizeAssociations;