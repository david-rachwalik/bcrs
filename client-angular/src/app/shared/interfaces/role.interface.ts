/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 3)
; Author: Professor Krasso
; Date: 30 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

export enum RoleType {
  User = 'standard',
  Admin = 'admin',
}

// exports the Role interface
export interface Role {
  _id?: string;
  text: string;
}
