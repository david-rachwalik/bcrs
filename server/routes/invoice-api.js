/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 3)
; Author: Professor Krasso
; Date: 30 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description:  API routes for Invoice documents
;===========================================
*/

// require statements
const express = require('express');

const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');
const logResponse = require('../services/log-response');
const Invoice = require('../models/invoice');
const router = express.Router();

/**
 * findPurchaseByService
 * @openapi
 * /api/invoices/purchases-graph:
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
 */
// findPurchaseByService API
router.get('/purchases-graph', async (req, res) => {
  try {
    // sorts and counts the invoice line items, or returns error message
    Invoice.aggregate(
      [
        {
          $unwind: '$lineItems',
        },
        {
          $group: {
            _id: {
              title: '$lineItems.title',
              price: '$lineItems.price',
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            '_id.title': 1,
          },
        },
      ],
      function (err, purchaseGraph) {
        if (err) {
          console.log(err);
          const findPurchasesByServiceGraphMongodbErrorResponse =
            new ErrorResponse('500', 'Internal server error', err);
          res
            .status(500)
            .send(findPurchasesByServiceGraphMongodbErrorResponse.toObject());
        } else {
          console.log(err);
          const findPurchasesByServiceGraphResponse = new BaseResponse(
            '200',
            'Query successful',
            purchaseGraph,
          );
          res.json(findPurchasesByServiceGraphResponse.toObject());
        }
      },
    );
  } catch (e) {
    console.log(e);
    const findPurchasesByServiceCatchErrorResponse = new ErrorResponse(
      '500',
      'Internal server error',
      e.message,
    );
    res.status(500).send(findPurchasesByServiceCatchErrorResponse.toObject());
  }
});

/**
 * createInvoice
 * @openapi
 * /api/invoices:
 *   post:
 *     tags:
 *       - Invoices
 *     summary: creates a new Invoice document
 *     description:  API for creating a new Invoice document.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - lineItems
 *               - partsAmount
 *               - laborAmount
 *               - lineItemTotal
 *               - total
 *             properties:
 *               userName:
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - title
 *                     - price
 *                   properties:
 *                     title:
 *                       type: string
 *                     price:
 *                       type: number
 *               partsAmount:
 *                 type: number
 *               laborAmount:
 *                 type: number
 *               lineItemTotal:
 *                 type: number
 *               total:
 *                 type: number
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
    const newInvoice = {
      userName: req.params.userName,
      lineItems: req.params.lineItems,
      partsAmount: req.params.partsAmount,
      laborAmount: req.params.laborAmount,
      lineItemTotal: req.params.lineItemTotal,
      total: req.params.total,
    };
    // Create a new Invoice document
    Invoice.create(newInvoice, (err, invoice) => {
      if (err) {
        const response = logResponse(501, err);
        res.status(501).send(response);
      } else {
        // Successfully created new Invoice document
        const response = logResponse(200, invoice);
        res.json(response);
      }
    });
  } catch (err) {
    const response = logResponse(500, err);
    res.status(500).send(response);
  }
});

module.exports = router;
