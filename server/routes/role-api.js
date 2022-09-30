/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 3)
; Author: Professor Krasso
; Date: 29 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description:  API routes for Role documents
;===========================================
*/

// require statements
const express = require('express');
// const Role = require('../models/role');
const User = require('../models/user');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

const router = express.Router();

/**
 * findAll
 * @openapi
 * /api/role:
 *   get:
 *     tags:
 *       - Roles
 *     description:  API for returning all Roles
 *     summary: returns all user roles
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 * */

router.get('/', async (req, res) => {
  try {
    Role.find({})
      .where('isDisabled')
      .equals(false)
      .exec(function (err, roles) {
        if (err) {
          console.log(err);
          const findAllRolesMongodbErrorResponse = new ErrorResponse(
            '500',
            'Internal server error',
            err,
          );
          res.status(500).send(findAllRolesMongodbErrorResponse.toObject());
        } else {
          console.log(roles);
          const findAllRolesResponse = new BaseResponse(
            '200',
            'Query successful',
            roles,
          );
          res.json(findAllRolesResponse.toObject());
        }
      });
  } catch (e) {
    console.log(e);
    const findAllRolesCatchErrorResponse = new ErrorResponse(
      '500',
      'Internal server error',
      e.message,
    );
    res.status(500).send(findAllRolesCatchErrorResponse.toObject());
  }
});

/** UpdateRole
 * @openapi
 * /api/role/{id}:
 *   put:
 *     tags:
 *       - Roles
 *     summary: updates text of a role
 *     description: Updates a role
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id of a role
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
 *         description: Query successful.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 * */

router.put('/:roleId', async (req, res) => {
  try {
    Role.findOne({ _id: req.params.roleId }, function (err, role) {
      if (err) {
        console.log(err);
        const updateRoleMongodbErrorResponse = new ErrorResponse(
          '500',
          'Internal server error',
          err,
        );
        res.status(500).send(updateRoleMongodbErrorResponse.toObject());
      } else {
        console.log(role);
        role.set({
          test: req.body.text,
        });

        role.save(function (err, updatedRole) {
          if (err) {
            console.log(err);
            const updatedMongodbErrorResponse = new ErrorResponse(
              '500',
              'Internal server error',
              err,
            );
            res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
          } else {
            console.log(updatedRole);
            const updatedRoleResponse = new BaseResponse(
              '200',
              'Query successful',
              updatedRole,
            );
            res.json(updatedRoleResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const updateRoleCatchErrorResponse = new ErrorResponse(
      '500',
      'Internal server error',
      e.message,
    );
    res.status(500).send(updatedRoleCatchErrorResponse.toObject());
  }
});

/**
 * findById
 * @openapi
 * /api/role/{id}:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Finds a role and returns document
 *     description: Return a role by role Id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id of a role
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Query successful.
 *       '500':
 *         description: Server Exception.
 * */
router.get('/:roleId', async (req, res) => {
  try {
    Role.findOne({ _id: req.params.roleId }, function (err, role) {
      if (err) {
        const findRoleByIdMongodbErr = logResponse(500, err);
        res.status(500).send(findRoleByIdMongodbErr);
      } else {
        const findRoleByIdResponse = logResponse(200, role);
        res.json(findRoleByIdResponse);
      }
    });
  } catch (error) {
    /* catch error handler */
    const findRoleByIdCatchError = logResponse(500, error);
    res.status(500).send(findRoleByIdCatchError);
  }
});
module.exports = router;
