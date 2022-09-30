/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: David Rachwalik
; Date: 29 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Attribution: Schemas
; URL: https://mongoosejs.com/docs/guide.html
;===========================================
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* import line item schema  */
const lineItemDocument = require('../schemas/line-item');

/* creates a new schema for mongo db transactions */
const invoiceSchema = new Schema({
  userName: { type: String },
  lineItems: [lineItemDocument],
  partsAmount: { type: Number },
  laborAmount: { type: Number },
  lineItemTotal: { type: Number },
  total: { type: Number },
  orderDate: { type: Date, default: new Date() },
});
//exports model
module.exports - mongoose.model('Invoice', invoiceSchema);
