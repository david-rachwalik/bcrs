/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 3)
; Author: David Rachwalik
; Date: 30 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Invoice } from '../../models';

@Component({
  selector: 'app-invoice-summary-dialog',
  templateUrl: './invoice-summary-dialog.component.html',
  styleUrls: ['./invoice-summary-dialog.component.scss'],
})
export class InvoiceSummaryDialogComponent implements OnInit {
  invoice: Invoice;
  username: string;
  orderDate: string;
  total: number;
  labor: number;
  parts: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.invoice = {} as Invoice;
    this.invoice = data.invoice;
    this.username = '';
    this.orderDate = '';
    this.total = 0;
    this.labor = 0;
    this.parts = 0;

    this.username = this.invoice.getUsername();
    this.orderDate = this.invoice.getOrderDate();
    this.parts = this.invoice.partsAmount;
    this.labor = this.invoice.getLaborAmount();
    this.total = this.invoice.getTotal();

    console.log(this.invoice);
  }

  ngOnInit(): void {}
}
