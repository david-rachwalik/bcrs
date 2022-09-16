/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: David Rachwalik
; Date: 15 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

const mongoose = require('mongoose');

const { Schema } = mongoose;

const securityQuestionSchema = new Schema(
  {
    text: { type: String },
    isDisabled: { type: Boolean, default: false },
  },
  { collection: 'securityQuestions' },
);

module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);
