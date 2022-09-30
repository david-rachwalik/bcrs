/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 3)
; Author: David Rachwalik
; Date: 30 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Attribution: Schemas
; URL: https://mongoosejs.com/docs/guide.html
;===========================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* schema for mongo db transactions */
const roleSchema = new Schema({
  text: { type: String, unique: true },
  isDisabled: { type: Boolean, default: false },
});

// exports model
module.exports - mongoose.model('Role', roleSchema);
