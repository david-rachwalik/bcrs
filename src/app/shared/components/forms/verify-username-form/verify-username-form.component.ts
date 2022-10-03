/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 2)
; Author: Professor Krasso
; Date: 23 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Attribution: Forms
; URL: https://angular.io/guide/forms-overview
;===========================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-verify-username-form',
  templateUrl: './verify-username-form.component.html',
  styleUrls: ['./verify-username-form.component.scss'],
})
export class VerifyUsernameFormComponent implements OnInit {
  errorMessages: Message[]; // sets empty message array

  form: FormGroup = this.fb.group({
    username: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService,
  ) {
    this.errorMessages = [];
  }

  ngOnInit(): void {}

  // verifyUser function utilizes the verifyUsername API. If username is verified, navigates to the verify-security-question form
  verifyUser() {
    const username = this.form.controls['username'].value;

    this.sessionService.verifyUsername(username).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/session/verify-security-questions'], {
          queryParams: { username: username },
          skipLocationChange: true,
        }); // prevents URL location change
      }, // displays appropriate error message
      error: (e) => {
        this.errorMessages = [
          { severity: 'error', summary: 'Error', detail: e.message },
        ];
        console.log(e);
      },
    });
  }
}
