/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 3)
; Author: Professor Krasso
; Date: 30 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description: Security role details component
;===========================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Role } from 'src/app/shared/interfaces/role.interface';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss'],
})
export class RoleDetailsComponent implements OnInit {
  role!: Role;
  roleId!: string;
  // Use FormGroup to define valid values and capture input
  roleForm: FormGroup = this.fb.group({
    text: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleService,
  ) {
    // Capture security role ID from the routing path
    this.roleId = this.route.snapshot.paramMap.get('roleId')!;
    // Find security role information based on ID
    this.roleService
      .findRoleById(this.roleId)
      .subscribe({
        next: (res) => {
          if (res.data) {
            this.role = res.data;
            // console.log(`role: ${this.role}`);
            this.roleForm.controls['text'].setValue(this.role.text);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {}

  saveRole(): void {
    // Fetch the latest role text provided
    const updatedRole: Role = {
      text: this.roleForm.controls['text'].value,
    };
    // Update the role in the database
    this.roleService
      .updateRole(this.roleId, updatedRole)
      .subscribe({
        next: (res) => {
          this.router.navigate(['./roles']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/roles']);
  }
}
