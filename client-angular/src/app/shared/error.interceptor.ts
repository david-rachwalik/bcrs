/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: Professor Krasso
; Date: 24 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        // Handle 400 errors
        if ([404].indexOf(err.status) !== -1) {
          this.router.navigate(['/session/404']);
        }

        // Handle 500 errors
        if ([500].indexOf(err.status) !== -1) {
          this.router.navigate(['/session/500']);
        }

        // Otherwise, catch and throw the error
        const error = {
          message: err.error.message || err.message,
          httpCode: err.error.httpCode || err.status,
          url: err.url,
        };

        console.log(
          `HttpInterceptor error; origin:${error.url};message:${error.message};httpCode:${error.httpCode}`,
        );

        return throwError(() => error);
      }),
    );
  }
}
