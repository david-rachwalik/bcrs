/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 16 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description:  Service layer for Security Question Documents
;===========================================
*/

// import statements
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecurityQuestion } from '../interfaces/security-question.interface';

import { BaseResponse } from '../interfaces/base-response.interface';
import { ErrorResponse } from '../interfaces/error-response.interface';

type SecurityQuestionResponse =
  | BaseResponse<SecurityQuestion>
  | ErrorResponse<SecurityQuestion>;
type SecurityQuestionsResponse =
  | BaseResponse<SecurityQuestion[]>
  | ErrorResponse<SecurityQuestion[]>;

@Injectable({
  providedIn: 'root',
})
// exports SecurityQuestion service
export class SecurityQuestionService {
  constructor(private http: HttpClient) {}
  // findAllSecurityQuestions service
  findAllSecurityQuestions(): Observable<SecurityQuestionsResponse> {
    return this.http.get<SecurityQuestionsResponse>('/api/security-questions');
  }
  // findSecurityQuestionById service
  findSecurityQuestionById(
    questionId: string,
  ): Observable<SecurityQuestionResponse> {
    return this.http.get<SecurityQuestionResponse>(
      `/api/security-questions/${questionId}`,
    );
  }
  // createSecurityQuestion service
  createSecurityQuestion(
    newSecurityQUestion: SecurityQuestion,
  ): Observable<SecurityQuestionResponse> {
    return this.http.post<SecurityQuestionResponse>('api/security-questions', {
      text: newSecurityQUestion.text,
    });
  }
  // updateSecurityQuestion service
  updateSecurityQuestion(
    questionId: string,
    updatedSecurityQuestion: SecurityQuestion,
  ): Observable<SecurityQuestionResponse> {
    return this.http.put<SecurityQuestionResponse>(
      `/api/security-questions/${questionId}`,
      {
        text: updatedSecurityQuestion.text,
      },
    );
  }
  // deleteSecurityQuestion service
  deleteSecurityQuestion(
    questionId: string,
  ): Observable<SecurityQuestionResponse> {
    return this.http.delete<SecurityQuestionResponse>(
      `/api/security-questions/${questionId}`,
    );
  }
}
