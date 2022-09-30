/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 24 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

// import statements
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component imports
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { RoleDetailsComponent } from './pages/role-details/role-details.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { ServiceRepairComponent } from './pages/service-repair/service-repair.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/auth.guard';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { ResetPasswordFormComponent } from './shared/forms/reset-password-form/reset-password-form.component';
import { VerifySecurityQuestionsFormComponent } from './shared/forms/verify-security-questions-form/verify-security-questions-form.component';
import { VerifyUsernameFormComponent } from './shared/forms/verify-username-form/verify-username-form.component';


// routes
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'users/:userId',
        component: UserDetailsComponent,
      },
      {
        path: 'users/create/new',
        component: UserCreateComponent,
      },
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent,
      },
      {
        path: 'security-questions/:questionId',
        component: SecurityQuestionDetailsComponent,
      },
      {
        path: 'security-questions/create/new',
        component: SecurityQuestionCreateComponent,
      },
      {
        path: 'roles',
        component: RoleListComponent
      },
      {
        path: 'roles/:roleId',
        component: RoleDetailsComponent
      },
      {
        path: 'roles/create/new',
        component: RoleCreateComponent
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'services',
        component: ServiceRepairComponent,
      },
    ],
    canActivate: [ AuthGuard ], // Applies AuthGuard to routes
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'forgot',
        component: VerifyUsernameFormComponent,
      },
      {
        path: 'verify-security-questions',
        component: VerifySecurityQuestionsFormComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordFormComponent,
      },
      {
        path: '404',
        component: NotFoundComponent,
      },
      {
        path: '500',
        component: ErrorComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'session/404',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
