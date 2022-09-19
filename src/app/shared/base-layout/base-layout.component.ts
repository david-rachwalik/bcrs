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
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: [ './base-layout.component.scss' ],
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();

  sessionName: string;
  constructor (private router: Router, private cookieService: CookieService) {
    this.sessionName = this.cookieService.get('sessionuser');
    console.log(this.sessionName);
  }

  ngOnInit(): void { }

  // logout function
  logout(): void {
    this.cookieService.deleteAll();
    this.router.navigate([ '/session/signin' ]);
  }
}
