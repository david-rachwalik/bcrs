/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 16 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description:  Service layer for Security Question Documents
;===========================================
*/

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// import { SecurityQuestion } from './security-question.interface';

@Injectable({
  providedIn: 'root',
})
export class SecurityQuestionService {
  constructor(private http: HttpClient) {}

  findAllSecurityQuestions(): Observable<any> {
    return this.http.get('/api/security-questions');
  }

  deleteSecurityQuestion(recordId: string) {
    throw new Error('Method not implemented.');
  }
}
