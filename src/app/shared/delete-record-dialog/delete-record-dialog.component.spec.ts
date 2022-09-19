/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: David Rachwalik
; Date: 15 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecordDialogComponent } from './delete-record-dialog.component';

describe('DeleteRecordDialogComponent', () => {
  let component: DeleteRecordDialogComponent;
  let fixture: ComponentFixture<DeleteRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRecordDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
