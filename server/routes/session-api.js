/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: David Rachwalik
; Date: 16 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description:  API routes for user session
;===========================================
*/

// require statements
const express = require('express');
const User = require('../models/user');
const logResponse = require('../services/log-response');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const bcrypt = require('bcrypt');


// configurations
const router = express.Router();
const saltRounds = 10; // default salt rounds for hashing algorithm

// -------- API --------

/**
 * signin
 * @openapi
 * /api/session/signin:
 *   post:
 *     tags:
 *       - Session
 *     summary: Sign-in a user
 *     description: API for user sign-in
 *     requestBody:
 *       description: User sign-in information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid userName and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/signin', async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, (err, user) => {
      if (err) {
        const response = logResponse(501, err);
        res.status(501).send(response);
      } else {
        // console.log(`User: ${user}`);
        if (user) {
          // Compare values with inputs as unhashed followed by hashed
          let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password, // hashed in database
          );
          if (passwordIsValid) {
            // Successfully found document
            const response = logResponse(200, user);
            res.json(response);
          } else {
            const response = logResponse(400, { password: req.body.password });
            res.status(400).send(response);
          }
        } else {
          const response = logResponse(400, { userName: req.body.userName });
          res.status(400).send(response);
        }
      }
    });
  } catch (err) {
    const response = logResponse(500, err);
    res.status(500).send(response);
  }
});


/**
 * register
 * @openapi
 * /api/session/register:
 *   post:
 *     tags:
 *       - Session
 *     name: register
 *     description: Registers a new user
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
router.post('/register', async(req, res) => {
  try
  {
    User.findOne({'userName': req.body.userName}, function(err, user)
    {
      if (err)
      {
        console.log(err);
        const registerUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(registerUserMongodbErrorResponse.toObject());
      }
      else
      {
        if (!user)
        {
          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password
          standardRole = {
            role: 'standard'
          }

          // user object
          let registeredUser = {
            userName: req.body.userName,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            role: standardRole,
            selectedSecurityQuestions: req.body.selectedSecurityQuestions
          };

          User.create(registeredUser, function(err, newUser)
          {
            if (err)
            {
              console.log(err);
              const newUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
              res.status(500).send(newUserMongodbErrorResponse.toObject());
            }
            else
            {
              console.log(newUser);
              const registeredUserResponse = new BaseResponse('200', 'Query successful', newUser);
              res.json(registeredUserResponse.toObject());
            }
          })
        }
        else
        {
          console.log(`Username ${req.body.userName} already exists`);
          const userInUseError = new BaseResponse('400', `The username '${req.body.userName}' is already in use.`, null);
          res.status(400).send(userInUseError.toObject());
        }
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const registerUserCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(registerUserCatchErrorResponse.toObject());
  }
});

/**
 * resetPassword
 * @openapi
 * /api/session/users/{userName}/reset-password:
 *   post:
 *     tags:
 *       - Session
 *     name: resetPassword
 *     description: API to reset a user password
 *     summary: resets a password
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         scheme:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/users/:userName/reset-password', async(req, res) => {
  try
  {
    const password = req.body.password;

    User.findOne({'userName': req.params.userName}, function(err, user)
    {
      if (err)
      {
        console.log(err);
        const resetPasswordMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(resetPasswordMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(user);
        let hashedPassword = bcrypt.hashSync(password, saltRounds); // salt/hash the password

        user.set({
          password: hashedPassword
        });

        user.save(function(err, updatedUser)
        {
          if (err)
          {
            console.log(err);
            const updatedUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
            res.status(500).send(updatedUserMongodbErrorResponse.toObject());
          }
          else
          {
            console.log(updatedUser);
            const updatedPasswordResponse = new BaseResponse('200', 'Query successful', updatedUser);
            res.json(updatedPasswordResponse.toObject());
          }
        })
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const resetPasswordCatchError = new ErrorResponse('500', 'Internal server error', e);
    res.status(500).send(resetPasswordCatchError.toObject());
  }
});



// exports the module
module.exports = router;
