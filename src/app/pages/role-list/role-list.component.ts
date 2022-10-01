/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 16 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
  roles!: Role[];
  displayedColumns = ['role', 'functions'];

  constructor(
    private dialog: MatDialog,
    private roleService: RoleService,
  ) {
    this.roleService.findAllRoles().subscribe(
      (res) => {
        this.roles = res.data;
      },
      (err) => {
        console.log(err);
      },
    );
  }

  ngOnInit(): void {}

  // delete function
  delete(recordId: string): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody:
          'Are you sure you want to delete the selected role?',
      },
      disableClose: true,
      width: '800px',
    });

    // confirm delete
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result === 'confirm') {
          this.roleService
            .deleteRole(recordId)
            .subscribe({
              next: (res: any) => {
                console.log('Role deleted');
                this.roles = this.roles.filter(
                  (q) => q._id !== recordId,
                );
              },
            });
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
