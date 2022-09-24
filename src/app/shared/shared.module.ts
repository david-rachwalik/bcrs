/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: David Rachwalik
; Date: 15 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

// import statements
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomeComponent } from '../pages/home/home.component';
import { SecurityQuestionCreateComponent } from '../pages/security-question-create/security-question-create.component';
import { SecurityQuestionDetailsComponent } from '../pages/security-question-details/security-question-details.component';
import { SecurityQuestionListComponent } from '../pages/security-question-list/security-question-list.component';
import { SigninComponent } from '../pages/signin/signin.component';
import { UserCreateComponent } from '../pages/user-create/user-create.component';
import { UserDetailsComponent } from '../pages/user-details/user-details.component';
import { UserListComponent } from '../pages/user-list/user-list.component';
import { AuthLayoutComponent } from '../shared/auth-layout/auth-layout.component';
import { BaseLayoutComponent } from '../shared/base-layout/base-layout.component';
import { DeleteRecordDialogComponent } from '../shared/delete-record-dialog/delete-record-dialog.component';
import { MaterialModule } from './material.module';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { ContactComponent } from '../pages/contact/contact.component';

@NgModule({
  declarations: [
    HomeComponent,
    AuthLayoutComponent,
    BaseLayoutComponent,
    SecurityQuestionListComponent,
    SecurityQuestionCreateComponent,
    SecurityQuestionDetailsComponent,
    SigninComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserListComponent,
    DeleteRecordDialogComponent,
    NotFoundComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // Components
    HomeComponent,
    AuthLayoutComponent,
    BaseLayoutComponent,
    SecurityQuestionListComponent,
    SecurityQuestionCreateComponent,
    SecurityQuestionDetailsComponent,
    SigninComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserListComponent,
    DeleteRecordDialogComponent,
  ],
})
export class SharedModule { }
