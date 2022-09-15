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

// selectedSecurityQuestionsSchema
const selectedSecurityQuestionSchema = new Schema({
  questionText: { type: String },
  answerText: { type: String },
});

// exports the selectedSecurityQuestionsSchema
module.exports = selectedSecurityQuestionSchema;
