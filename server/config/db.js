const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.MYSQL_DB_NAME,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        define: {
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        }
    }
);

module.exports = { sequelize };