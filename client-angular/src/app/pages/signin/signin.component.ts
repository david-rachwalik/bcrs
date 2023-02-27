/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 18 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description: User sign-in component
;===========================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Message } from 'primeng/api';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: [ './signin.component.scss' ],
})
export class SigninComponent implements OnInit {
  // Use FormGroup to define valid values and capture input
  signinForm: FormGroup = this.fb.group({
    userName: [ null, Validators.compose([ Validators.required ]) ],
    password: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
      ]),
    ],
  });
  errorMessages: Message[] = [];

  constructor (
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private userService: UserService, // private messageService: MessageService,
  ) { }

  ngOnInit(): void { }

  signin(): void {
    const userName = this.signinForm.controls[ 'userName' ].value;
    const password = this.signinForm.controls[ 'password' ].value;

    this.userService.signinUser(userName, password).subscribe({
      next: (res) => {
        if (res.data && res.data.userName) {
          console.log(res.data);
          this.cookieService.set('sessionuser', res.data.userName, 1);
          console.log('Session user saved to cookie');
          this.router.navigate([ '/' ]);
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessages = [
          { severity: 'error', summary: 'Error', detail: err.message },
        ];
      },
    });
  }

  clearMessages() {
    this.errorMessages = [];
  }

  printevt(event: any): void {
    console.log(event);
  }
}
