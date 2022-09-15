/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 15 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

// mongoose require statement
const mongoose = require('mongoose');

// defines mongoose schema
const { Schema } = mongoose;

// userRoleSchema
const userRoleSchema = new Schema({
  role: { type: String, default: 'standard' },
});

// exports the userRoleSchema
module.exports = userRoleSchema;
