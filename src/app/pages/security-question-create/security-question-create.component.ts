/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: David Rachwalik
; Date: 15 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityQuestionService } from 'src/app/shared/services/security-question.service';
import { SecurityQuestion } from 'src/app/shared/interfaces/security-question.interface';

@Component({
  selector: 'app-security-question-create',
  templateUrl: './security-question-create.component.html',
  styleUrls: [ './security-question-create.component.scss' ]
})
export class SecurityQuestionCreateComponent implements OnInit {
  form: FormGroup = this.fb.group({
    text: [ null, Validators.compose([ Validators.required ]) ]
  });

  constructor (private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) { }

  ngOnInit(): void {

  }

  // creates new security question
  create(): void {
    const newSecurityQuestion: SecurityQuestion = {
      text: this.form.controls[ 'text' ].value,
    };

    // navigates to the security-questions page, or returns error message
    this.securityQuestionService.createSecurityQuestion(newSecurityQuestion).subscribe({
      next: (res: any) => {
        this.router.navigate([ '/security-questions' ]);
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }
  // cancels security question creation
  cancel(): void {
    this.router.navigate([ '/security-questions' ]);
  }
}
