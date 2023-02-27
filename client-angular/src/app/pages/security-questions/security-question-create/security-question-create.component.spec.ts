/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: David Rachwalik
; Date: 15 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionCreateComponent } from './security-question-create.component';

describe('SecurityQuestionCreateComponent', () => {
  let component: SecurityQuestionCreateComponent;
  let fixture: ComponentFixture<SecurityQuestionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityQuestionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityQuestionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
