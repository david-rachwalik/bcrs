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
  try
  {
    Role.find({})
    .where('isDisabled')
    .equals(false)
    .exec(function(err, roles)
    {
      if (err)
      {
        console.log(err);
        const findAllRolesMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(findAllRolesMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(roles);
        const findAllRolesResponse = new BaseResponse('200', 'Query successful', roles);
        res.json(findAllRolesResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const findAllRolesCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(findAllRolesCatchErrorResponse.toObject());
  }
});
