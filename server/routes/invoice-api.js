/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 3)
; Author: Professor Krasso
; Date: 29 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description:  API routes for Invoice documents
;===========================================
*/

// require statements
const express = require('express');

const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');
// const Invoice = require('../models/invoice');
const router = express.Router();


/**
 * findPurchaseByService
 * @openapi
 * /api/invoices:
 *   get:
 *     tags:
 *       - Invoices
 *     description:  API for returning all purchases by service
 *     summary: returns all purchases by service
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 * */

router.get('/purchases-graph', async(req, res) => {
  try
  {
    Invoice.aggregate([
    {
      $unwind: '$lineItems'
    },
    {
      $group:
      {
        '_id':
        {
          'title': '$lineItems.title',
          'price': '$lineItems.price'
        },
        'count':
        {
          $sum: 1
        }
      }
    },
    {
      $sort:
      {
        '_id.title': 1
      }
    }
  ], function(err, purchaseGraph)
  {
    if (err)
    {
      console.log(err);
      const findPurchasesByServiceGraphMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
      res.status(500).send(findPurchasesByServiceGraphMongodbErrorResponse.toObject());
    }
    else
    {
      console.log(err);
      const findPurchasesByServiceGraphResponse = new BaseResponse('200', 'Query successful', purchaseGraph);
      res.json(findPurchasesByServiceGraphResponse.toObject());
    }
  })
  }
  catch(e)
  {
    console.log(e);
    const findPurchasesByServiceCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(findPurchasesByServiceCatchErrorResponse.toObject());
  }
});

module.exports = router;
