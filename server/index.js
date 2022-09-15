/**
 * Require statements
 */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express(); // Express variable.

/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));

// default server port value.
const PORT = 3000 || process.env.PORT;

// TODO: This line will be replaced with your database connection string (including username/password).
const CONN =
  'mongodb+srv://bcrs_admin:s3cret@cluster0.580azmi.mongodb.net/bcrs?retryWrites=true&w=majority'; // database string added - JVH 9/14/2022

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

// Wire-up the Express server.
app.listen(PORT, () => {
  // eslint-disable-next-line prefer-template
  console.log('Application started and listening on PORT: ' + PORT);
});
