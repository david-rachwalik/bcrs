import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

// --- To contain singleton services ---
// https://thetombomb.com/posts/app-core-shared-feature-modules
// https://www.pluralsight.com/guides/angular-module-declaring-components

// Only import [BrowserModule, BrowserAnimationsModule] once
// All other shared/feature modules will import [CommonModule]
// https://dev.to/sanketmaru/import-once-browser-module-1pie

@NgModule({
  declarations: [],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [CookieService],
  exports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
})
export class CoreModule {}
