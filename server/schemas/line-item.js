/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 3)
; Author: Professor Krasso
; Date: 29 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Attribution: Schemas
; URL: https://mongoosejs.com/docs/guide.html
;===========================================
*/

// mongoose require statement
const mongoose = require('mongoose');

// defines mongoose Schema
const Schema = mongoose.Schema;

// lineItemSchema
const lineItemSchema = new Schema({
  title: { type: String },
  price: { type: Number }
})

// exports the lineItemSchema
module.exports = lineItemSchema;
