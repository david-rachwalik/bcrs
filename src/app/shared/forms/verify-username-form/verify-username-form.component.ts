/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 2)
; Author: Professor Krasso
; Date: 23 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-verify-username-form',
  templateUrl: './verify-username-form.component.html',
  styleUrls: ['./verify-username-form.component.scss']
})
export class VerifyUsernameFormComponent implements OnInit {

  errorMessages: Message[];

  form: FormGroup = this.fb.group({
    username: [null, Validators.compose([Validators.required])]
  });

  constructor(private fb: FormBuilder, private router: Router, private sessionService: SessionService) {
    this.errorMessages = [];
  }

  ngOnInit(): void {
  }

  verifyUser() {
    const username = this.form.controls['username'].value;

    this.sessionService.verifyUsername(username).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/session/verify-security-questions'], {queryParams: {username: username}, skipLocationChange: true}); // prevents URL location change
      },
      error: (e) => {
        this.errorMessages = [
          {severity: 'error', summary: 'Error', detail: e.message}
        ]
        console.log(e);
      }
    })
  }

}
