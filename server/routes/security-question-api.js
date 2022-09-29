/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 15 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description:  API routes for SecurityQuestion documents
;===========================================
*/

// require statements
const express = require('express');
const SecurityQuestion = require('../models/security-question');
const logResponse = require('../services/log-response');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

// configurations
const router = express.Router();

// -------- API --------

// operations: findAll, findById, createSecurityQuestion, deleteSecurityQuestions, updateSecurityQuestion

/**
 * findAll
 * @openapi
 * /api/security-questions:
 *   get:
 *     tags:
 *       - Security Questions
 *     description:  API for returning all Security Questions
 *     summary: returns all user security question
 *     responses:
 *       '200':
 *         description: List of security questions
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 * */
router.get('/', async (req, res) => {
  try {
    /* finds all security questions if isDisabled key is set to false */
    SecurityQuestion.find({})
      .where('isDisabled')
      .equals(false)
      .exec(function (err, securityQuestion) {
        if (err) {
          /* handles server error */
          console.log(err);
          const findAllMongodbErrorResponse = new ErrorResponse(
            500,
            'Internal Server Error',
            err,
          );
          res.status(500).send(findAllMongodbErrorResponse.toObject());
        } else {
          /* returns all sq with isDisabled set to false */
          console.log(securityQuestion);
          const findAllResponse = new BaseResponse(
            200,
            'Query Successful',
            securityQuestion,
          );
          res.json(findAllResponse.toObject());
        }
      });
  } catch (e) {
    /* Handles error if try fails */
    console.log(e);
    const findAllCatchErrorResponse = new ErrorResponse(
      500,
      'Internal Server Error',
      e.message,
    );
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});

/**
 * findById
 * @openapi
 * /api/security-questions/{id}:
 *   get:
 *     tags:
 *       - Security Questions
 *     summary: return a SecurityQuestion document
 *     description:  API for returning a SecurityQuestion document.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: SecurityQuestion document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: SecurityQuestion document.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/:id', async (req, res) => {
  try {
    SecurityQuestion.findOne(
      { _id: req.params.id },
      (err, securityQuestion) => {
        if (err) {
          const response = logResponse(501, err);
          res.status(501).send(response);
        } else {
          // Successfully found document
          const response = logResponse(200, securityQuestion);
          res.json(response);
        }
      },
    );
  } catch (err) {
    const response = logResponse(500, err);
    res.status(500).send(response);
  }
});

/**
 * createSecurityQuestion
 * @openapi
 * /api/security-questions:
 *   post:
 *     tags:
 *       - Security Questions
 *     name: createSecurityQuestion
 *     description:  API for creating a new security question
 *     summary: creates a new SecurityQuestion document
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Security question creation successful
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 */

router.post('/', async (req, res) => {
  try {
    const newSecurityQuestion = {
      text: req.body.text,
    };
    // creates a new Security Question or returns an appropriate error
    SecurityQuestion.create(
      newSecurityQuestion,
      // eslint-disable-next-line func-names
      function (err, securityQuestion) {
        if (err) {
          // Internal Server Error error response
          console.log(err);
          const createSecurityQuestionMongodbErrorResponse = new ErrorResponse(
            500,
            'Internal server error',
            err,
          );
          res
            .status(500)
            .send(createSecurityQuestionMongodbErrorResponse.toObject());
        } else {
          // creates new security question and logs the query succesful  base response
          console.log(securityQuestion);
          const createSecurityQuestionResponse = new BaseResponse(
            200,
            'Query successful',
            securityQuestion,
          );
          res.json(createSecurityQuestionResponse.toObject());
        }
      },
    );
  } catch (e) {
    // returns Internal Server Error ErrorResponse
    console.log(e);
    const createSecurityQuestionCatchErrorResponse = new ErrorResponse(
      500,
      'Internal server error',
      e.message,
    );
    res.status(500).send(createSecurityQuestionCatchErrorResponse.toObject());
  }
});

/**
 * deleteSecurityQuestions
 * @openapi
 * /api/security-questions/{id}:
 *   delete:
 *     tags:
 *       - Security Questions
 *     summary: remove a SecurityQuestion document
 *     description: API for deleting a SecurityQuestion document.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: SecurityQuestion document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: SecurityQuestion document.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.delete('/:id', async (req, res) => {
  try {
    SecurityQuestion.findByIdAndDelete(
      { _id: req.params.id },
      (err, securityQuestion) => {
        if (err) {
          const response = logResponse(501, err);
          res.status(501).send(response);
        } else {
          // Successfully deleted document
          const response = logResponse(200, securityQuestion);
          res.json(response);
        }
      },
    );
  } catch (err) {
    const response = logResponse(500, err);
    res.status(500).send(response);
  }
});

/**UpdateSecurity Questions
 * @openapi
 * /api/security-questions/{id}:
 *   put:
 *     tags:
 *       - Security Questions
 *     summary: updates text of a security question
 *     description: Updates a security question
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id of a security question
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: SecurityQuestion document.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 * */
router.put('/:id', async (req, res) => {
  try {
    SecurityQuestion.findOne(
      { _id: req.params.id }, // search for SQ by _id
      function (err, securityQuestion) {
        if (err) {
          /* Handles server error */
          const updateSecurityQuestionMongodbError = logResponse(500, err);
          res.status(500).send(updateSecurityQuestionMongodbError);
        } else {
          /* log SQ  */
          console.log(securityQuestion);
          /* sets security question from parameter  */
          securityQuestion.set({
            text: req.body.text,
          });

          securityQuestion.save(function (err, savedSecurityQuestion) {
            if (err) {
              /* if cannot save handle error */
              const savedSecurityQuesResponse = logResponse(500, err);
              res.status(500).send(savedSecurityQuesResponse);
            } else {
              /* updates SQ  with new text */
              const updateSecQuesResponse = logResponse(
                200,
                savedSecurityQuestion,
              );
              res.json(updateSecQuesResponse);
            }
          });
        }
      },
    );
  } catch (e) {
    /* handles server error if try fails */
    console.log(e);
    const updateSecurityQuestionCatchErrorResponse = new ErrorResponse(
      500,
      'Internal Server Error',
      e.message,
    );
    res.status(500).send(updateSecurityQuestionCatchErrorResponse.toObject());
  }
});

// exports the module
module.exports = router;
