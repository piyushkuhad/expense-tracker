const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const budgetRouter = require('./routes/budgetRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const userInfoRouter = require('./routes/userInfoRoutes');

const app = express();

//Helmet
//app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
//       baseUri: ["'self'"],
//       fontSrc: ["'self'", 'https:', 'http:', 'data:'],
//       scriptSrc: ["'self'", 'https:', 'http:', 'blob:'],
//       styleSrc: ["'self'", 'https:', 'http:', 'unsafe-inline'],
//     },
//   })
// );

app.options(
  '*',
  cors({
    //origin: 'http://127.0.0.1:3000',
    origin: process.env.APP_URL,
    //preflightContinue: true,
    credentials: true,
    //exposedHeaders: ['Set-Cookie'],
  })
);

// Add headers
app.use(function (req, res, next) {
  //console.log('Req Heraders', req.headers);
  // Website you wish to allow to connect
  //res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.setHeader('Access-Control-Allow-Origin', process.env.APP_URL);

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type,Set-Cookie,access-control-allow-credentials,Authorization'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//Morgan for Dev only
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Body Parser - reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//If Production then serve from build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

//Data Sanitization against noSQL query injection
//app.use(mongoSanitize());

//Mounting Router
app.use('/api/v1/budget', budgetRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/user', userInfoRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Global Error Handler

app.use(globalErrorHandler);

module.exports = app;
