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
const Role = require('../models/role');
const User = require('../models/user');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');
const logResponse = require('../services/log-response');

const router = express.Router();

// -------- API --------

// operations: findAll, createRole, UpdateRole, findById

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
 */
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

/**
 * createRole
 * @openapi
 * /api/role:
 *   post:
 *     tags:
 *       - Roles
 *     summary: add a Role document
 *     description: API for creating a new role document.
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
 *         description: Query successful
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 */
router.post('/', async (req, res) => {
  try {
    Role.findOne({ text: req.body.text }, (err, role) => {
      if (err) {
        const response = logResponse(501, err);
        res.status(501).send(response);
      } else {
        console.log(`Role: ${role}`);

        if (!role) {
          // Create a new role
          const newRole = {
            text: req.body.text,
          };
          Role.create(newRole, (error, role) => {
            if (error) {
              const response = logResponse(501, error);
              res.status(501).send(response);
            } else {
              // Successfully created a Role document
              const response = logResponse(200, role);
              res.json(response);
            }
          });
        } else {
          console.log(`Role: ${req.body.text} already exists`);
          const roleAlreadyExists = new ErrorResponse(
            '200',
            `Role: ${req.body.text} already exists.  If you do not see the role in the list, it was disabled.`,
          );
          res.status(200).send(roleAlreadyExists.toObject());
        }
      }
    });
  } catch (err) {
    const response = logResponse(500, err);
    res.status(500).send(response);
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
 */
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
 */
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
