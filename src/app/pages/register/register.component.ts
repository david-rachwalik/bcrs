/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 2)
; Author: Professor Krasso
; Date: 25 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Message } from 'primeng/api';

import { SecurityQuestion } from '../../shared/interfaces/security-question.interface';
import { SelectedSecurityQuestion } from '../../shared/interfaces/selected-security-question.interface';
import { User } from '../../shared/interfaces/user.interface';
import { SecurityQuestionService } from '../../shared/services/security-question.service';
import { SessionService } from '../../shared/services/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class RegisterComponent implements OnInit {
  securityQuestions: SecurityQuestion[];
  errorMessages: Message[];
  user: User;
  selectedSecurityQuestions: SelectedSecurityQuestion[];

  contactForm: FormGroup = this.fb.group({
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    address: [null, Validators.compose([Validators.required])],
  });

  sqForm: FormGroup = this.fb.group({
    securityQuestion1: [null, Validators.compose([Validators.required])],
    securityQuestion2: [null, Validators.compose([Validators.required])],
    securityQuestion3: [null, Validators.compose([Validators.required])],
    answerToSecurityQuestion1: [
      null,
      Validators.compose([Validators.required]),
    ],
    answerToSecurityQuestion2: [
      null,
      Validators.compose([Validators.required]),
    ],
    answerToSecurityQuestion3: [
      null,
      Validators.compose([Validators.required]),
    ],
  });

  credForm: FormGroup = this.fb.group({
    userName: [null, Validators.compose([Validators.required])],
    password: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
      ]),
    ],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private securityQuestionService: SecurityQuestionService,
    private sessionService: SessionService,
  ) {
    this.securityQuestions = [];
    this.errorMessages = [];
    this.user = {} as User;
    this.selectedSecurityQuestions = [];

    // Gather list of available security questions
    this.securityQuestionService.findAllSecurityQuestions().subscribe({
      next: (res) => {
        this.securityQuestions = res.data;
        // console.log(this.securityQuestions);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {}

  register() {
    const contactInformation = this.contactForm.value;
    const securityQuestions = this.sqForm.value;
    const credentials = this.credForm.value;

    // Collect the selected security question values
    this.selectedSecurityQuestions = [
      {
        questionText: securityQuestions.securityQuestion1,
        answerText: securityQuestions.answerToSecurityQuestion1,
      },
      {
        questionText: securityQuestions.securityQuestion2,
        answerText: securityQuestions.answerToSecurityQuestion2,
      },
      {
        questionText: securityQuestions.securityQuestion3,
        answerText: securityQuestions.answerToSecurityQuestion3,
      },
    ];
    console.log(this.securityQuestions);

    // Collect the user details
    this.user = {
      userName: credentials.userName,
      password: credentials.password,
      firstName: contactInformation.firstName,
      lastName: contactInformation.lastName,
      phoneNumber: contactInformation.phoneNumber,
      address: contactInformation.address,
      email: contactInformation.email,
      selectedSecurityQuestions: this.selectedSecurityQuestions,
    };
    console.log(this.user);

    // Register the user account information
    this.sessionService.register(this.user).subscribe({
      next: (res) => {
        this.cookieService.set('sessionuser', credentials.userName, 1);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessages = [
          { severity: 'error', summary: 'Error', detail: err.message },
        ];
        console.log(`Node.js server error; message:${err.message}`);
        console.log(err);
      },
    });
  }
}
