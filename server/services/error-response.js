/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 15 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

// defines ErrorResponse class with httpCode, message, and data
class ErrorResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  // toObject function returns BaseResponse data as object
  toObject() {
    return {
      // eslint-disable-next-line prettier/prettier
      'httpCode': this.httpCode,
      // eslint-disable-next-line prettier/prettier
      'message': this.message,
      // eslint-disable-next-line prettier/prettier
      'data': this.data,
      // eslint-disable-next-line prettier/prettier
      'timestamp': new Date().toLocaleDateString()
    };
  }
}

// exports ErrorResponse module
module.exports = ErrorResponse;
