/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 16 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { DeleteRecordDialogComponent } from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';
import { SecurityQuestionService } from '../../shared/security-question.service';
import { SecurityQuestion } from '../../shared/security-question.interface';


@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.scss'],
})
export class SecurityQuestionListComponent implements OnInit {
  securityQuestions!: SecurityQuestion[];
  displayedColumns = ['question', 'functions'];

  constructor(
    private dialog: MatDialog,
    private securityQuestionService: SecurityQuestionService,
  ) {
    this.securityQuestionService.findAllSecurityQuestions().subscribe(
      (res) => {
        this.securityQuestions = res.data;
      },
      (err) => {
        console.log(err);
      },
    );
  }

  ngOnInit(): void {}
  /*
  delete(recordId: string): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody:
          'Are you sure you want to delete the selected security question?',
      },
      disableClose: true,
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this.securityQuestionService
          .deleteSecurityQuestion(recordId)
          .subscribe((res) => {
            console.log('Security question deleted');
            this.securityQuestions = this.securityQuestions.filter(
              (q) => q._id !== recordId,
          });
      }
    });
  }
  */
}
