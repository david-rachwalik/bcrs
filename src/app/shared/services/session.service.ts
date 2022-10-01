/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 2)
; Author: Professor Krasso
; Date: 26 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description:  Service layer for Session documents
;===========================================
*/

// import statements
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { VerifySecurityQuestionModel } from '../interfaces/verify-security-question.interface';

import { BaseResponse } from '../interfaces/base-response.interface';
import { ErrorResponse } from '../interfaces/error-response.interface';

type UserResponse = BaseResponse<User> | ErrorResponse<User>;

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient) {}

  // service layer to log a user in 
  login(userName: string, password: string): Observable<UserResponse> {
    return this.http.post<UserResponse>('/api/session/login', {
      userName,
      password,
    });
  }

  // service layer to register a new user
  register(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>('/api/session/register', {
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      address: user.address,
      selectedSecurityQuestions: user.selectedSecurityQuestions,
    });
  }

  // service layer to verify username
  verifyUsername(userName: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`/api/session/verify/users/${userName}`);
  }

  // service layer to verify security questions
  verifySecurityQuestions(
    model: VerifySecurityQuestionModel,
    userName: string,
  ): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      `/api/session/verify/users/${userName}/security-questions`,
      {
        questionText1: model.question1,
        questionText2: model.question2,
        questionText3: model.question3,
        answerText1: model.answerToQuestion1,
        answerText2: model.answerToQuestion2,
        answerText3: model.answerToQuestion3,
      },
    );
  }

  // service layer to update password
  updatePassword(password: string, userName: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      `/api/session/users/${userName}/reset-password`,
      {
        password,
      },
    );
  }
}
