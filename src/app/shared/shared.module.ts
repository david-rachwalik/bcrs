/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: David Rachwalik
; Date: 30 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

// import statements
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';

import { AboutComponent } from '../pages/about/about.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { ErrorComponent } from '../pages/error/error.component';
import { HomeComponent } from '../pages/home/home.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { PurchasesByServiceGraphComponent } from '../pages/purchases-by-service-graph/purchases-by-service-graph.component';
import { RegisterComponent } from '../pages/register/register.component';
import { RoleCreateComponent } from '../pages/role-create/role-create.component';
import { RoleDetailsComponent } from '../pages/role-details/role-details.component';
import { RoleListComponent } from '../pages/role-list/role-list.component';
import { SecurityQuestionCreateComponent } from '../pages/security-question-create/security-question-create.component';
import { SecurityQuestionDetailsComponent } from '../pages/security-question-details/security-question-details.component';
import { SecurityQuestionListComponent } from '../pages/security-question-list/security-question-list.component';
import { ServiceRepairComponent } from '../pages/service-repair/service-repair.component';
import { SigninComponent } from '../pages/signin/signin.component';
import { UserCreateComponent } from '../pages/user-create/user-create.component';
import { UserDetailsComponent } from '../pages/user-details/user-details.component';
import { UserListComponent } from '../pages/user-list/user-list.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { DeleteRecordDialogComponent } from './components/delete-record-dialog/delete-record-dialog.component';
import { ResetPasswordFormComponent } from './components/forms/reset-password-form/reset-password-form.component';
import { VerifySecurityQuestionsFormComponent } from './components/forms/verify-security-questions-form/verify-security-questions-form.component';
import { VerifyUsernameFormComponent } from './components/forms/verify-username-form/verify-username-form.component';
import { InvoiceSummaryDialogComponent } from './components/invoice-summary-dialog/invoice-summary-dialog.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    HomeComponent,
    AuthLayoutComponent,
    BaseLayoutComponent,
    SecurityQuestionListComponent,
    SecurityQuestionCreateComponent,
    SecurityQuestionDetailsComponent,
    ServiceRepairComponent,
    SigninComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserListComponent,
    DeleteRecordDialogComponent,
    NotFoundComponent,
    ContactComponent,
    ResetPasswordFormComponent,
    VerifySecurityQuestionsFormComponent,
    VerifyUsernameFormComponent,
    AboutComponent,
    ErrorComponent,
    RegisterComponent,
    RoleListComponent,
    RoleDetailsComponent,
    RoleCreateComponent,
    InvoiceSummaryDialogComponent,
    PurchasesByServiceGraphComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    // Components
    HomeComponent,
    AuthLayoutComponent,
    BaseLayoutComponent,
    SecurityQuestionListComponent,
    SecurityQuestionCreateComponent,
    SecurityQuestionDetailsComponent,
    ServiceRepairComponent,
    SigninComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserListComponent,
    DeleteRecordDialogComponent,
    NotFoundComponent,
    ContactComponent,
    ResetPasswordFormComponent,
    VerifySecurityQuestionsFormComponent,
    VerifyUsernameFormComponent,
    AboutComponent,
    ErrorComponent,
    RegisterComponent,
    RoleListComponent,
    RoleDetailsComponent,
    RoleCreateComponent,
    InvoiceSummaryDialogComponent,
    PurchasesByServiceGraphComponent,
  ],
})
export class SharedModule {}
