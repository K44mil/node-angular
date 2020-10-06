const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

const fs = require('fs');
const { sequelize } = require('./config/db');

// Load models
const User = require('./models/User');

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
const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

// Import to DB
const importData = async () => {
    try {
        await User.bulkCreate(users);
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