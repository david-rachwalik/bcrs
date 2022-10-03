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
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
})
export class ResetPasswordFormComponent implements OnInit {
  isAuthenticated: string;
  username: string;

  form: FormGroup = this.fb.group({
    password: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
      ]),
    ],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private sessionService: SessionService,
  ) {
    this.isAuthenticated =
      this.route.snapshot.queryParamMap.get('isAuthenticated') ?? '';
    this.username = this.route.snapshot.queryParamMap.get('username') ?? '';
  }

  ngOnInit(): void {}

  // updatePassword function updates the password or displays error message
  updatePassword() {
    const password = this.form.controls['password'].value;

    this.sessionService.updatePassword(password, this.username).subscribe({
      next: (res) => {
        this.cookieService.set('sessionuser', this.username, 1);
        this.router.navigate(['/']);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
