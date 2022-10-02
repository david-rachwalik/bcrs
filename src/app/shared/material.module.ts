/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 1)
; Author: David Rachwalik
; Date: 30 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

import { NgModule } from '@angular/core';

/* -------- Angular Materials -------- */
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

/* -------- PrimeNg Materials -------- */
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';

@NgModule({
  imports: [
    // Angular Materials
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatStepperModule,
    // PrimeNg Materials
    ButtonModule,
    TableModule,
    CardModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    ChartModule
  ],
  exports: [
    // Angular Materials
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatStepperModule,
    // NgPrime Materials
    ButtonModule,
    TableModule,
    CardModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    ChartModule
  ],
})
export class MaterialModule { }
