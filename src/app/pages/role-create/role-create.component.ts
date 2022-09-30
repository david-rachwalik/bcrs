/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 3)
; Author: David Rachwalik
; Date: 30 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/shared/services/role.service';
import { Role } from 'src/app/shared/interfaces/role.interface';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: [ './role-create.component.scss' ]
})
export class RoleCreateComponent implements OnInit {
  form: FormGroup = this.fb.group({
    text: [ null, Validators.compose([ Validators.required ]) ]
  });

  constructor (private fb: FormBuilder, private router: Router, private roleService: RoleService) { }

  ngOnInit(): void {

  }

  // creates new role
  create(): void {
    const newRole: Role = {
      text: this.form.controls[ 'text' ].value,
    };

    // navigates to the role page, or returns error message
    this.roleService.createRole(newRole).subscribe({
      next: (res: any) => {
        this.router.navigate([ '/roles' ]);
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }
  // cancels role creation
  cancel(): void {
    this.router.navigate([ '/roles' ]);
  }
}
