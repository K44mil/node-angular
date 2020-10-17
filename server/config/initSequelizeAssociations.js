const Group = require('../models/Group')
const User = require('../models/User');
const UserGroup = require('../models/relationsModels/UserGroup');
const Course = require('../models/Course');
const Faculty = require('../models/Faculty');

const initSequelizeAssociations = () => {
    // User.belongsToMany(Group, { through: UserGroup, foreignKey: 'user_id' });
    // Group.belongsToMany(User, { through: UserGroup, foreignKey: 'group_id' });
    Faculty.hasMany(Course, { foreignKey: 'facultyId' } );
    Course.belongsTo(Faculty, { foreignKey: 'facultyId' });
};

module.exports = initSequelizeAssociations;