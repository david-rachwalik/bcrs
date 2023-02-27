/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: David Rachwalik
; Date: 15 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionDetailsComponent } from './security-question-details.component';

describe('SecurityQuestionDetailsComponent', () => {
  let component: SecurityQuestionDetailsComponent;
  let fixture: ComponentFixture<SecurityQuestionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityQuestionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityQuestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
