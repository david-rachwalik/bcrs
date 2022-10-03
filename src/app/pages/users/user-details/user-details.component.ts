/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 18 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description: User details component
;===========================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { Role } from 'src/app/shared/interfaces';
import { RoleService } from 'src/app/shared/services';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: [ './user-details.component.scss' ],
})
export class UserDetailsComponent implements OnInit {
  user!: User;
  userId!: string;
  form!: FormGroup;
  roles: Role[];

  constructor (
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.userId = this.route.snapshot.paramMap.get('userId')!;
    this.roles = [];
    // finds and saves the user updates, or returns an error message
    this.userService.findUserById(this.userId).subscribe({
      next: (res) => {
        this.user = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.form.controls[ 'firstName' ].setValue(this.user.firstName);
        this.form.controls[ 'lastName' ].setValue(this.user.lastName);
        this.form.controls[ 'phoneNumber' ].setValue(this.user.phoneNumber);
        this.form.controls[ 'address' ].setValue(this.user.address);
        this.form.controls[ 'email' ].setValue(this.user.email);
        this.form.controls[ 'role' ].setValue(this.user.role?.text ?? 'standard');

        console.log("called from user-details", this.user);

        this.roleService.findAllRoles().subscribe({
          next: res => {

            this.roles = res.data;
          },
          error: e => { console.log(e); }
        });
      },
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [ null, Validators.compose([ Validators.required ]) ],
      lastName: [ null, Validators.compose([ Validators.required ]) ],
      phoneNumber: [ null, Validators.compose([ Validators.required ]) ],
      address: [ null, Validators.compose([ Validators.required ]) ],
      email: [ null, Validators.compose([ Validators.required ]) ],
      role: [ null, Validators.compose([ Validators.required ]) ]
    });
  }

  // save user function
  saveUser(): void {
    const updatedUser: User = {
      firstName: this.form.controls[ 'firstName' ].value,
      lastName: this.form.controls[ 'lastName' ].value,
      phoneNumber: this.form.controls[ 'phoneNumber' ].value,
      address: this.form.controls[ 'address' ].value,
      email: this.form.controls[ 'email' ].value,
      role: {
        text: this.form.controls[ 'role' ].value,
      }
    };

    // navigates to the users page after save
    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: (res: any) => {
        this.router.navigate([ '/users' ]);
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }

  // navigates to the users page after cancel update
  cancel(): void {
    this.router.navigate([ '/users' ]);
  }
}
