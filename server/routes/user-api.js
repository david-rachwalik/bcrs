/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 15 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/
// require statements
const express = require('express');
const User = require('../models/user');
// const bcrypt = require('bcryptjs');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
// const RoleSchema = require('../schemas/user-role');

// configurations
const router = express.Router();
// const saltRounds = 10; //default salt rounds for hashing algorithm

/**
 * findAll
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description:  API for returning all users
 *     summary: returns all user documents
 *     responses:
 *       '200':
 *         description: List of users
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 */

// findAll users API
router.get('/', async (req, res) => {
  // finds all users or returns an appropriate error
  try {
    User.find({})
      .where('isDisabled')
      .equals(false)
      // eslint-disable-next-line func-names
      .exec(function (err, users) {
        if (err) {
          console.log(err);
          // Internal Server Error error response
          const findAllMongoDbErrorResponse = new ErrorResponse(
            500,
            'Internal server error',
            err,
          );
          res.status(500).send(findAllMongoDbErrorResponse.toObject());
        } else {
          console.log(users);
          const findAllUsersResponse = new BaseResponse(
            200,
            'Query successful',
            users,
          );
          res.json(findAllUsersResponse.toObject());
        }
      });
  } catch (e) {
    // returns Internal Server Error ErrorResponse
    const findAllCatchErrorResponse = new ErrorResponse(
      500,
      'Internal server error',
      e.message,
    );
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});

// exports the module
module.exports = router;
