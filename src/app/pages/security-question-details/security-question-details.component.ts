/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 18 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description: Security question details component
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SecurityQuestion } from '../../shared/security-question.interface';
import { SecurityQuestionService } from '../../shared/security-question.service';

@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.scss'],
})
export class SecurityQuestionDetailsComponent implements OnInit {
  question!: SecurityQuestion;
  questionId!: string;
  // Use FormGroup to define valid values and capture input
  questionForm: FormGroup = this.fb.group({
    text: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private securityQuestionService: SecurityQuestionService,
  ) {
    // Capture security question ID from the routing path
    this.questionId = this.route.snapshot.paramMap.get('questionId')!;
    // Find security question information based on ID
    this.securityQuestionService
      .findSecurityQuestionById(this.questionId)
      .subscribe({
        next: (res) => {
          if (res.data) {
            this.question = res.data;
            // console.log(`question: ${this.question}`);
            this.questionForm.controls['text'].setValue(this.question.text);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {}

  saveQuestion(): void {
    // Fetch the latest security text provided
    const updatedSecurityQuestion: SecurityQuestion = {
      text: this.questionForm.controls['text'].value,
    };
    // Update the security question in the database
    this.securityQuestionService
      .updateSecurityQuestion(this.questionId, updatedSecurityQuestion)
      .subscribe({
        next: (res) => {
          this.router.navigate(['./security-questions']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/security-questions']);
  }
}
