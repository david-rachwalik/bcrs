/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 18 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description: User list component
;===========================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from '../../../shared/components/delete-record-dialog/delete-record-dialog.component';
import { User } from '../../../shared/interfaces/user.interface';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  /* Local variables */
  users!: User[];
  /* initialized array for mat table */
  displayedColumns = [
    'userName',
    'firstName',
    'lastName',
    'phoneNumber',
    'address',
    'email',
    'functions',
  ];
  constructor(private dialog: MatDialog, private UserService: UserService) {
    this.users = []; // prevent users from being undefined before async call
    /* populates users array  */
    this.UserService.findAllUsers().subscribe({
      next: (res) => {
        this.users = res.data;
        console.log(this.users);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {}

  // delete user function. Displays confirm delete dialog
  delete(userId: string, recordId: string): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete user ${recordId}?`,
      },
      disableClose: true,
      width: '800px',
    });

    // deletes user after confirmation or displays error message
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res === 'confirm') {
          this.UserService.deleteUser(userId).subscribe({
            next: (res) => {
              console.log('User Deleted');
              this.users = this.users.filter((u) => u._id !== userId);
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
