/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 18 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description:  Service layer for User Documents
;===========================================
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.interface';

import { BaseResponse } from './interfaces/base-response.interface';
import { ErrorResponse } from './interfaces/error-response.interface';

type UserResponse = BaseResponse<User> | ErrorResponse<User>;
type UsersResponse = BaseResponse<User[]> | ErrorResponse<User[]>;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  findAllUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>('/api/users');
  }

  findUserById(userId: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`/api/users/${userId}`);
  }

  createUser(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>('/api/users', {
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
    });
  }

  updateUser(userId: string, user: User): Observable<UserResponse> {
    return this.http.put<UserResponse>(`/api/users/${userId}`, {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
    });
  }

  deleteUser(userId: string): Observable<UserResponse> {
    return this.http.delete<UserResponse>(`/api/users/${userId}`);
  }

  signinUser(userName: string, password: string): Observable<UserResponse> {
    return this.http.post<UserResponse>('/api/session/signin', {
      userName,
      password,
    });
  }
}
