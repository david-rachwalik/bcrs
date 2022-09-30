/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 3)
; Author: Professor Krasso
; Date: 30 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description:  Service layer for Role documents
;===========================================
*/

// import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role.interface';


@Injectable({
  providedIn: 'root'
})
// exports RoleService
export class RoleService {

  constructor(private http: HttpClient) { }
  // findAllRoles service
  findAllRoles(): Observable<any> {
    return this.http.get('/api/roles');
  }
  // findRoleById service
  findRoleById(roleId: string): Observable<any> {
    return this.http.get('/api/roles/${roleId}');
  }
  // createRole service
  createRole(role: Role): Observable<any> {
    return this.http.post('/api/roles', {
      text: role.text
    });
  }
  // updateRole service
  updateRole(roleId: string, role: Role): Observable<any> {
    return this.http.put('/api/roles/${roleId}', {
      text:role.text
    });
  }
  // deleteRole service
  deleteRole(roleId: string): Observable<any> {
    return this.http.delete('/api/roles/${roleId}');
  }
  // findUserRole service
  findUserRole(userName: string): Observable<any> {
    console.log('userName from the findUserRole API ' + userName);
    return this.http.get('/api/users/${userName}/role');
  }
}
