const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

const fs = require('fs');
const { sequelize } = require('./config/db');

// Load models
const User = require('./models/User');
const University = require('./models/University');
const Faculty = require('./models/Faculty');
const Department = require('./models/Department');
const Specialization = require('./models/Specialization');
const Course = require('./models/Course');
const Subject = require('./models/Subject');
const Category = require('./models/Category');

// Connect DB
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to MySQL has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database.');
    });

sequelize
    .sync({
        // force: true
    })
    .then(() => console.log('Data synchronized.'))
    .catch(err => console.log(err));

// Read JSON files

// USERS
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

// UNIVERSITIES
const universities = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/universities.json`, 'utf-8')
);

// FACULTIES
const faculties = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/faculties.json`, 'utf-8')
);

// DEPARTMENTS
const departments = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/departments.json`, 'utf-8')
);

// SPECIALIZATIONS
const specializations = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/specializations.json`, 'utf-8')
);

// COURSES
const courses = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

// SUBJECTS
const subjects = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/subjects.json`, 'utf-8')
);

// CATEGORIES
const categories = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/categories.json`, 'utf-8')
);



// Import to DB
const importData = async () => {
    try {
        await User.bulkCreate(users);
        await University.bulkCreate(universities);
        await Faculty.bulkCreate(faculties);
        await Course.bulkCreate(courses);
        await Category.bulkCreate(categories);
        await Department.bulkCreate(departments);
        await Specialization.bulkCreate(specializations);
        await Subject.bulkCreate(subjects);
        console.log('Data imported...');
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await User.destroy({
            where: {},
        });
        // RELATIONS DELETE
        await Course.destroy({
            where: {},
        });
        await Faculty.destroy({
            where: {},
        });
        await University.destroy({
            where: {},
        });
        await Category.destroy({
            where: {},
        }); 
        await Department.destroy({
            where: {},
        });
        await Specialization.destroy({
            where: {},
        });
        await Subject.destroy({
            where: {}
        });
        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}