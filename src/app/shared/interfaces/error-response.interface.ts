/*
============================================
; Title:        error-response.interface.ts
; Author:       David Rachwalik
; Date:         2022/09/18
; Description:  Interface for error responses
;===========================================
*/

export interface ErrorResponse<T> {
  httpCode: number | string;
  message: string;
  data: T;
  timestamp: string;
}
