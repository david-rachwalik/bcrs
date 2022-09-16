/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 15 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

// defines BaseResponse class with httpCode, message, and data
class BaseResponse {
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  // toObject function returns BaseResponse data as object
  toObject() {
    return {
      httpCode: this.httpCode,
      message: this.message,
      data: this.data,
      // timestamp: new Date().toLocaleDateString(),
      // https://www.w3schools.com/jsref/jsref_obj_date.asp
      timestamp: new Date().toLocaleString(),
    };
  }
}

// exports the BaseResponse class
module.exports = BaseResponse;
