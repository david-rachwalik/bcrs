/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 15 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description:  Helper functions for responses
;===========================================
*/

const fs = require('fs');
const BaseResponse = require('./base-response');
const ErrorResponse = require('./error-response');

// Parse data from file
function readJsonFile(filepath, encoding = 'utf8') {
  const file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}

// Gather data from configuration
function getResponseConfig() {
  const filepath = `${__dirname}/message.json`;
  return readJsonFile(filepath);
}

function isErrorCode(httpCode) {
  // const regex = new RegExp(/^\d/); // starts with a number
  const clientError = new RegExp(/^4/); // HTTP Code starts with 4
  const serverError = new RegExp(/^5/); // HTTP Code starts with 5
  return (
    String(httpCode).match(clientError) || String(httpCode).match(serverError)
  );
}

// Determines which response type to generate; logs and returns the response
function logResponse(httpCode, data) {
  // Find response message based on http code
  const config = getResponseConfig();
  const match = config.find((c) => c.statusCode === String(httpCode));
  const message = match ? match.message : '';
  // Generate a response based on http code
  const classResponse = isErrorCode(httpCode)
    ? new ErrorResponse(httpCode, message, data)
    : new BaseResponse(httpCode, message, data);
  response = classResponse.toObject();
  console.log(response); // logging the response
  return response;
}

module.exports = logResponse;
