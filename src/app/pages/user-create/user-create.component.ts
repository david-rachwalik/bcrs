/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 18 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description: User create component
;===========================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/interfaces/user.interface';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-use-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  // Use FormGroup to define valid values and capture input
  userForm: FormGroup = this.fb.group({
    userName: [null, Validators.compose([Validators.required])],
    password: [
      null,
      Validators.compose([
        Validators.required,
        // Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).{8,}$'),
      ]),
    ],
    firstName: [null, Validators.compose([Validators.required])],
    lastName: [null, Validators.compose([Validators.required])],
    phoneNumber: [null, Validators.compose([Validators.required])],
    address: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required])],
  });
  // user!: User;
  // userId!: string;
  // roles: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
  ) {}

  ngOnInit(): void {}

  // createUser function
  createUser(): void {
    const newUser: User = {
      userName: this.userForm.controls['userName'].value,
      password: this.userForm.controls['password'].value,
      firstName: this.userForm.controls['firstName'].value,
      lastName: this.userForm.controls['lastName'].value,
      phoneNumber: this.userForm.controls['phoneNumber'].value,
      address: this.userForm.controls['address'].value,
      email: this.userForm.controls['email'].value,
    };
    console.log(`New user: ${newUser}`);

    this.userService.createUser(newUser).subscribe({
      next: (res) => {
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // cancel function
  cancel(): void {
    this.router.navigate(['/users']);
  }
}
