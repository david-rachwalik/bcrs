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
const bcrypt = require('bcrypt');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const logResponse = require('../services/log-response');
// const RoleSchema = require('../schemas/user-role');

// configurations
const router = express.Router();
const saltRounds = 10; // default salt rounds for hashing algorithm

// -------- API --------

// operations: findAll, findById, createUser, updateUser,

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
 * findById
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: return a User document
 *     description:  API for returning a User document.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User document.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/:id', async (req, res) => {
  try {
    User.findOne({ _id: req.params.id }, (err, user) => {
      if (err) {
        const response = logResponse(501, err);
        res.status(501).send(response);
      } else {
        // Successfully found document
        const response = logResponse(200, user);
        res.json(response);
      }
    });
  } catch (err) {
    const response = logResponse(500, err);
    res.status(500).send(response);
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

/**************
 *  createUser API
 * *******************************/

/**
 * createUser
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     name: createUser
 *     description: Adds a new user
 *     summary: Adds a new user to users collection
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
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
 *               role:
 *                 type: object
 *                 properties:
 *                   role:
 *                     type: string
 *     responses:
 *       '200':
 *         description: Successful Post
 *       '500':
 *         description: Server exception
 * */
router.post('/', async (req, res) => {
  try {
    /* encrypts password*/
    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    /* assign default role of standard */
    standardRole = {
      role: 'standard',
    };

    // Initializes User Object
    let newUser = {
      userName: req.body.userName,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email,
      role: standardRole,
    };

    /* Creates a user using post method */
    User.create(newUser, function (err, user) {
      /* error handler */
      if (err) {
        console.log(err);
        const createUserMongodbErrorResponse = new ErrorResponse(
          500,
          'Internal Server Error',
          err,
        );
        res.status(500).send(createUserMongodbErrorResponse.toObject());
      } else {
        /* if successful post user json object */
        console.log(user);
        const createUserResponse = new BaseResponse(
          200,
          'Query Successful',
          user,
        );
        res.json(createUserResponse.toObject());
      }
    });
  } catch (e) {
    /* catch server error and returns error message */
    console.log(e);
    const createCatchUserErrorResponse = new ErrorResponse(
      500,
      'Internal Server Error',
      e.message,
    );
    res.status(500).send(createCatchUserErrorResponse.toObject());
  }
});

/**Delete User
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     name: deleteUser
 *     description: API to flag a user as disabled
 *     summary: sets user as disabled
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         scheme:
 *           type: string
 *     responses:
 *       '200':
 *         description: deleted user by setting isDisabled to true.
 *       '500':
 *         description: Server Exception.
 */
router.delete('/:id', async (req, res) => {
  try {
    User.findOne({ _id: req.params.id }, function (err, user) {
      /* Handles MongoDB error */
      if (err) {
        const deleteUserMongodbErrResponse = logResponse(500, err);
        res.status(500).send(deleteUserMongodbErrResponse);
      } else {
        /* if successful set disabled key to true */
        user.set({
          isDisabled: true,
        });

        /* updates the database with new value   */
        user.save(function (err, savedUser) {
          if (err) {
            /* handles error */
            const saveUserMongodbErrRes = logResponse(500, err);
            res.json(saveUserMongodbErrRes);
          } else {
            /* makes the update */
            const saveUserResponse = logResponse(200, savedUser);
            res.json(saveUserResponse);
          }
        });
      }
    });
  } catch (err) {
    /* try catch handler */
    const deleteUserCatchResponse = logResponse(500, err);
    res.status(500).send(deleteUserCatchResponse);
  }
});
// exports the module
module.exports = router;
