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

}
