/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 3)
; Author: Professor Krasso
; Date: 30 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description: role-list component
;===========================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { RoleService } from 'src/app/shared/services/role.service';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  roles: Role[];
  errorMessages: Message[];

  roleForm: FormGroup = this.fb.group({
    text: [null, Validators.compose([Validators.required])]
  })

  constructor(private roleService: RoleService, private confirmationService: ConfirmationService, private fb: FormBuilder) {
    this.roles = [];
    this.errorMessages = [];

    this.roleService.findAllRoles().subscribe({
      next: (res) => {
        this.roles = res.data;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  ngOnInit(): void {
  }

  create() {
    const newRole: Role = {
      text:this.roleForm.controls['text'].value
    }

    this.roleService.createRole(newRole).subscribe({
      next: (res) => {
        if (res.data) {
          this.roles.push(res.data);
        } else {
          this.errorMessages = [
            { severity: 'error', summary: 'Error', detail: res.message}
          ]
        }
      },
      error: (e) => {
        console.log(e)
      },
      complete: () => {
        this.roleForm.controls['text'].setErrors({
          'incorrect': false
        })
      }
    })
  }

  delete(roleId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.roleService.deleteRole(roleId).subscribe({
          next: (res) => {
            console.log('Role deleted successfully!');
            this.roles = this.roles.filter(role => role._id !== roleId);
          },
          error: (e) => {
            console.log(e);
          }
        })
      },
      reject: (type: any) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            console.log('User rejected this operation');
            break;
          case ConfirmEventType.CANCEL:
            console.log('User canceled this operation');
            break;
        }
      }
    })
  }
}
