/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: David Rachwalik
; Date: 15 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Attribution: Schemas
; URL: https://mongoosejs.com/docs/guide.html
;===========================================
*/

const mongoose = require('mongoose');

const { Schema } = mongoose;

// creates securityQuestionSchema
const securityQuestionSchema = new Schema(
  {
    text: { type: String },
    isDisabled: { type: Boolean, default: false },
  },
  { collection: 'securityQuestions' },
);

// exports the securityQuestionSchema to use elsewhere
module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);
