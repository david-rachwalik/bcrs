/**
 * Require statements
 */
const express = require('express');
// const http = require('http');
// const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

const app = express(); // Express variable.

/**
 * Routes
 */
const UserApi = require('./routes/user-api');
const SessionApi = require('./routes/session-api');
const SecurityQuestionsApi = require('./routes/security-question-api');

/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));

// default server port value.
const PORT = process.env.PORT || 3000;

// // database connection string added - JVH 9/14/2022
const CONN =
  'mongodb+srv://bcrs_admin:s3cret@cluster0.580azmi.mongodb.net/bcrs?retryWrites=true&w=majority';

/**
 * Database connection.
 */
mongoose
  .connect(CONN)
  .then(() => {
    console.log('Connection to the database was successful');
  })
  .catch((err) => {
    // eslint-disable-next-line prefer-template
    console.log('MongoDB Error: ' + err.message);
  });

/**
 * APIs
 */
app.use('./api/users', UserApi);
app.use('./api/session', SessionApi);
app.use('/api/security-questions', SecurityQuestionsApi);

// Wire-up the Express server.
app.listen(PORT, () => {
  // eslint-disable-next-line prefer-template
  console.log('Application started and listening on PORT: ' + PORT);
});
