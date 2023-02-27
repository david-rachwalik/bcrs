/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 15 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

/**
 * Require statements
 */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * Routes
 */
const UserApi = require('./routes/user-api');
const SessionApi = require('./routes/session-api');
const SecurityQuestionsApi = require('./routes/security-question-api');
const RoleApi = require('./routes/role-api');
const InvoiceApi = require('./routes/invoice-api');

/*
 * -------- Database Configurations --------
 */

// Build database connection string (https://www.urlencoder.org)
const dbUsername = 'bcrs_admin';
const dbPassword = 's3cret';
const srvAddress = 'cluster0.580azmi.mongodb.net';
const dbName = 'bcrs';
const CONN = `mongodb+srv://${dbUsername}:${dbPassword}@${srvAddress}/${dbName}?retryWrites=true&w=majority`;

// Establish database connection
mongoose
  .connect(CONN)
  .then(() => {
    console.log(`Successfully connected to '${dbName}' in MongoDB!`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  });

/*
 * -------- Application Server Configurations --------
 */

// Initialize Express app server
const app = express();

// --- Configure middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// Angular production build served as wwwroot (client-side)
app.use(express.static(path.join(__dirname, '../client-angular/dist/bcrs')));
app.use(
  '/',
  express.static(path.join(__dirname, '../client-angular/dist/bcrs')),
);

// Configure OpenAPI/Swagger document library specification (https://swagger.io/specification)
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Bob's Computer Repair Shop API",
      version: '1.0.0',
      description:
        'Project API for WEB 450 - Mastering the MEAN Stack Bootcamp (Bellevue University).',
      contact: {
        name: 'David Rachwalik',
        url: 'https://david-rachwalik.github.io',
      },
      // https://soos.io/apache-vs-mit-license
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
  },
  apis: [`${__dirname}/routes/*.js`], // Files containing annotations for the OpenAPI Specification
};
const openapiSpecification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Configure API routing
app.use('/api/users', UserApi);
app.use('/api/session', SessionApi);
app.use('/api/security-questions', SecurityQuestionsApi);
app.use('/api/role', RoleApi);
app.use('/api/invoices', InvoiceApi);

// --- Start the Express server ---
const PORT = process.env.PORT || 3000; // Default server port value
app.listen(PORT, () => {
  console.log(`Application started and listening on PORT: ${PORT}`);
});
