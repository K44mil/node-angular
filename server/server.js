const dotenv = require('dotenv');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Imports
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { connectMongoDB } = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const errorHandler = require('./middleware/errorHandler');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const http = require('http');
const cookie = require('cookie');

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
const groupsRoutes = require('./routes/groups.routes');
const contactRoutes = require('./routes/contact.routes');
const filesRoutes = require('./routes/files.routes');
const eventsRoutes = require('./routes/events.routes');
const presencesRoutes = require('./routes/presences.routes');
const marksRoutes = require('./routes/marks.routes');
const sliderRoutes = require('./routes/slider.routes');
const notesRoutes = require('./routes/notes.routes');
const backupRoutes = require('./routes/backup.routes');

// App init
const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// File uploading
app.use(fileupload());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
// app.use(xss({
//     whiteList: [],
//     stripIgnoreTag: true,
//     stripIgnoreTagBody: ["script"]
// }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 10000
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors({
    // origin: 'http://localhost:4200',
    // origin: 'http://localhost:3001',
    origin: [
        'http://localhost:4200',
        'http://localhost:3001'
    ],
    credentials: true
}));

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
app.use('/api/v1/groups', groupsRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/files', filesRoutes);
app.use('/api/v1/events', eventsRoutes);
app.use('/api/v1/presences', presencesRoutes);
app.use('/api/v1/marks', marksRoutes);
app.use('/api/v1/slider', sliderRoutes);
app.use('/api/v1/notes', notesRoutes);
app.use('/api/v1/backup', backupRoutes);

// Set error handler
app.use(errorHandler);


const Session = require('./models/Session');
const GeneralInfo = require('./models/GeneralInfo');
const httpServer = http.Server(app);
const io = require('socket.io')(httpServer, { cors: { origin: 'http://localhost:4200', credentials: true }});

io.on('connection', (socket) => {

    const address = socket.handshake.address;

    Session.findOne({ address: address }, (err, session) => {
        if (session) {
            session.countSockets++;
            session.save();
        } else {
            Session.create({ address: address });

            GeneralInfo.findOne({ }, (err, general) => {
                if (general) {
                    general.online++;
                    general.save({}, () => {
                        io.emit('countOnline', { online: general.online });
                    });
                }
            });
        }
    });

    // try {
    //     await Session.findOne({ address: address });
    //     if (session) {
    //         session.countSockets += 1;
    //         await session.save();
    //     } else {
    //         await Session.create({
    //             address: address
    //         });

    //         const general = await GeneralInfo.findOne();
    //         if (general) {
    //             if (general.online) general.online++;
    //             else general.online = 1;
    //             await general.save();

    //             io.emit('countOnline', { online: general.online });
    //         }
    //     }
    // } catch (err) { }

    // let c = socket.handshake.headers.cookie;
    // c = cookie.parse(c);

    // try {
    //     const session = await Session.findOne({ sessionId: c.session });
    //     console.log(session);
    //     if (session) {
    //         if (session.socket === '') await session.updateOne({ socket: socket.id });
    //         else 
    //             await Session.create({ sessionId: c.session, socket: socket.id })
    //     }   
    // } catch (err) { }

    socket.on('disconnect', () => {
        Session.findOne({ address: address }, (err, session) => {
            if (session) {
                session.countSockets--;
                if (session.countSockets < 1) {
                    session.deleteOne();
                    GeneralInfo.findOne({ }, (err, general) => {
                        if (general) {
                            if (general.online > 0) general.online--;
                            general.save({}, () => {
                                io.emit('countOnline', { online: general.online });
                            });
                        }
                    });
                } else {
                    session.save();
                }    
            }
        });
        // try {
        //     const session = await Session.findOne({ socket: socket.id });
        //     session.deleteOne();
        // } catch (err) { }
        // try {
        //     const session = await Session.findOne({ address: address });
        //     if (session) {
        //         session.countSockets -= 1;

        //         if (session.countSockets < 1) {
        //             await session.deleteOne();

        //             const general = await GeneralInfo.findOne();
        //             if (general) {
        //                 if (general.online) general.online--;
        //                 else general.online = 1;
        //                 general.save();
        //                 io.emit('countOnline', { online: general.online });
        //             }
        //         }
        //     }
        // } catch (err) { }
    });
});

// App starts listening
const PORT = process.env.PORT || 5000;
const server = httpServer.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}.`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});