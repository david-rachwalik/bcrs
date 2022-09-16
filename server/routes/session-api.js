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
// const SecurityQuestion = require('../models/security-question');
const User = require('../models/user');
const logResponse = require('../services/log-response');
const bcrypt = require('bcrypt');

// configurations
const router = express.Router();
const saltRounds = 10; //default salt rounds for hashing algorithm

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
          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
          let passwordIsValid = bcrypt.compareSync(
            user.password, // unhashed here, hashed in database
            hashedPassword,
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

// exports the module
module.exports = router;
