const express = require('express');
const cors = require('cors');
const connectDB = require('./src/configs/DB.config');
const googleAuthRoutes = require('./src/routes/GoogleAuth.route');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const isAuthenticated = require('./src/middlewares/auth.middleware');

// Load env vars early
dotenv.config();

// Initialize DB
connectDB();

// Init express app
const app = express();

// Use PORT from env or fallback
const port = process.env.PORT ;

// Trust proxy if using a reverse proxy (e.g., NGINX, Heroku)
app.set('trust proxy', 1);

// Set security headers
app.use(helmet());

// Logging for requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // Better to set false for production
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60, // 1 day
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
}));

// CORS Config
app.use(cors({
  origin: [process.env.CLIENT_URL,process.env.DEV_URL],
  credentials: true,
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport
require('./src/configs/Passport');
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', googleAuthRoutes);
app.use(isAuthenticated);
app.use('/api/v1/auth/users', require('./src/routes/User.route'));
app.use('/api/v1/providers', require('./src/routes/Provider.route'));
app.use('/api/v1/notification', require('./src/routes/Notification.route'));
app.use('/api/v1/send', require('./src/routes/SendNotification.route'));

// Global error handler (optional, good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV} mode at http://localhost:${port}`);
});
