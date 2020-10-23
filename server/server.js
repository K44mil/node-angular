const dotenv = require('dotenv');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Imports
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { connectMongoDB } = require('./config/db');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const fileupload = require('express-fileupload');

// Connect to MongoDB
connectMongoDB();

// Routes
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const universitiesRoutes = require('./routes/universities.routes');
const facultiesRoutes = require('./routes/faculties.routes');
const coursesRoutes = require('./routes/courses.routes');
const specializationsRoutes = require('./routes/specializations.routes');
const subjectsRoutes = require('./routes/subjects.routes');
const aboutRoutes = require('./routes/about.routes');
const newsRoutes = require('./routes/news.routes');
const announcementsRoutes = require('./routes/announcements.routes');
const departmentsRoutes = require('./routes/departments.routes');
const categoriesRoutes = require('./routes/categories.routes');
const commentsRoutes = require('./routes/comments.routes');

// App init
const app = express();

// Body parser
app.use(express.json());

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/api/v1/faculties', facultiesRoutes);
app.use('/api/v1/courses', coursesRoutes);
app.use('/api/v1/specializations', specializationsRoutes);
app.use('/api/v1/subjects', subjectsRoutes);
app.use('/api/v1/about', aboutRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/announcements', announcementsRoutes);
app.use('/api/v1/departments', departmentsRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/comments', commentsRoutes);

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