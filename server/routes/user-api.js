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

/**
 * updateUser
 * @openapi
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     name: updateUser
 *     description: API to update a user
 *     summary: updates a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         scheme:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *               - address
 *               - email
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// updateUser API
router.put('/:id', async (req, res) => {
  // finds users by ID
  try {
    // updates user or returns appropriate error message
    // eslint-disable-next-line func-names
    User.findOne({ _id: req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        const updateUserMongodbErrorResponse = new ErrorResponse(
          500,
          'Internal server error',
          err,
        );
        res.status(500).send(updateUserMongodbErrorResponse.toObject());
      } else {
        console.log(user);
        // sets the required fields
        user.set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          email: req.body.email,
        });
        // saves the updated fields
        // eslint-disable-next-line func-names, no-shadow
        user.save(function (err, savedUser) {
          if (err) {
            console.log(err);
            const saveUserMongoDbErrorResponse = new ErrorResponse(
              500,
              'Internal server error',
              err,
            );
            res.status(500).send(saveUserMongoDbErrorResponse.toObject());
          } else {
            console.log(savedUser);
            const saveUserResponse = new BaseResponse(
              200,
              'Query successful',
              savedUser,
            );
            res.json(saveUserResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    // returns Internal Server Error ErrorResponse
    console.log(e);
    const updateUserCatchErrorResponse = new ErrorResponse(
      500,
      'Internal server error',
      e.message,
    );
    res.status(500).send(updateUserCatchErrorResponse.toObject());
  }
});

// exports the module
module.exports = router;
