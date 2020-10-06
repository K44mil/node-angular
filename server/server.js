const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Routes
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const universitiesRoutes = require('./routes/universities.routes');

// App init
const app = express();

// Body parser
app.use(express.json());

// Use morgan(logger) in development mode
if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

// Test MySQL connection
const { sequelize } = require('./config/db');
const initSequelizeAssociations = require('./config/initSequelizeAssociations');

initSequelizeAssociations();

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

// Enable CORS
app.use(cors({
    origin: 'http://localhost:4200'
}));

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/universities', universitiesRoutes);

// Set error handler
app.use(errorHandler);

// App starts listening
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}.`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});