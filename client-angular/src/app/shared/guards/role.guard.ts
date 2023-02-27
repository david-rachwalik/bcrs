/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 3)
; Author: Professor Krasso
; Date: 30 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

// import statements
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';

import { Role } from '../interfaces/role.interface';
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  role: Role;

  constructor (
    private router: Router,
    private cookieService: CookieService,
    private roleService: RoleService,
  ) {
    this.role = {} as Role;
  }

  // guard verifies user has the 'admin' role
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.roleService
      .findUserRole(this.cookieService.get('sessionuser'))
      .pipe(
        map((res) => {
          this.role = res.data;

          console.log(`User role: ${this.role.text}`);
          console.log(this.role);

          if (res.data.text === 'admin') {
            return true;
          } else {
            this.router.navigate([ '/services' ]);
            return false;
          }
        }),
      );
  }
}
