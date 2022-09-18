/*
============================================
; Title:        base-response.interface.ts
; Author:       David Rachwalik
; Date:         2022/09/18
; Description:  Interface for baseline responses
;===========================================
*/

export interface BaseResponse<T> {
  httpCode: number | string;
  message: string;
  data: T;
  timestamp: string;
}
