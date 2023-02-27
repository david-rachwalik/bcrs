/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: David Rachwalik
; Date: 15 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { Role, RoleType } from '../../interfaces';
import { RoleService } from '../../services';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: [ './base-layout.component.scss' ],
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();
  role: Role;
  isAdmin: boolean;

  sessionName: string;
  constructor (
    private router: Router,
    private cookieService: CookieService,
    private roleService: RoleService,
  ) {
    this.role = {} as Role;
    this.isAdmin = false;
    this.sessionName = this.cookieService.get('sessionuser');
    console.log(this.sessionName);

    /* gets the user role */
    this.roleService
      .findUserRole(this.cookieService.get('sessionuser'))
      .subscribe((res) => {
        this.role = res.data;
        console.log(this.role);
        // Verify admin status
        if (this.role.text === RoleType.Admin) {
          this.isAdmin = true;
        }
      });
  }

  ngOnInit(): void { }

  // logout function
  logout(): void {
    this.cookieService.deleteAll();
    this.router.navigate([ '/session/signin' ]);
  }
}
