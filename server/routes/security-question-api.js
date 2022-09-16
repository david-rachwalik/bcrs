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

// configurations
const router = express.Router();

// -------- API --------

// operations: findById, deleteSecurityQuestions

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

// exports the module
module.exports = router;
