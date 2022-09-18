import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from '../../shared/delete-record-dialog/delete-record-dialog.component';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: [ './user-list.component.scss' ]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  constructor (private dialog: MatDialog, private UserService: UserService) {
    this.UserService.findAllUsers().subscribe(res => {
      this.users = res[ 'data' ];
      console.log(this.users);
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
  }

  delete(userId: string, recordId: string): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: "Delete Record Dialog",
        dialogBody: `Are you sure you want to delete user ${recordId}?`
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 'confirm') {
        this.UserService.deleteUser(userId).subscribe(res => {
          console.log('User Deleted');
          this.users = this.users.filter(u => u._id !== userId);
        });
      }
    });
  }
}
