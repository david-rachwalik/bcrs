/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 3)
; Author: Professor Krasso
; Date: 30 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
;===========================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Message } from 'primeng/api';

import { Invoice, LineItem, Product } from '../../shared/interfaces';
import { InvoiceSummaryDialogComponent } from '../../shared/invoice-summary-dialog/invoice-summary-dialog.component';
import { InvoiceService, ProductService } from '../../shared/services';

@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.scss'],
})
export class ServiceRepairComponent implements OnInit {
  username: string;
  products: Product[];
  lineItems: LineItem[];
  invoice: Invoice;
  errorMessages: Message[];
  successMessages: Message[];

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private dialogRef: MatDialog,
  ) {
    // sets all necessary variables
    this.username = this.cookieService.get('sessionuser') ?? '';
    this.products = [];
    this.lineItems = [];
    this.invoice = {} as Invoice;
    this.errorMessages = [];
    this.successMessages = [];
    // Populate existing products
    this.products = this.productService.getProducts();
    console.log(this.products);
    // Generate instance of invoice by username
    this.invoice = new Invoice(this.username);
  }

  ngOnInit(): void {}

  generateInvoice() {
    console.log('generateInvoice() this.invoice');
    console.log(this.invoice);

    console.log('generateInvoice() this.products');
    console.log(this.products);

    for (let product of this.products) {
      if (product.checked) {
        this.lineItems.push(product);
      }
    }

    if (this.lineItems.length > 0) {
      this.invoice.setLineItems(this.lineItems);

      console.log('lineItems.length > 0; this.invoice');
      console.log(this.invoice);

      const dialogRef = this.dialogRef.open(InvoiceSummaryDialogComponent, {
        data: {
          invoice: this.invoice,
        },
        disableClose: true,
        width: '800px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'confirm') {
          this.invoiceService
            .createInvoice(this.username, this.invoice)
            .subscribe({
              next: (res) => {
                console.log('Invoice created');
                this.reloadProducts();
                this.clearLineItems();
                this.invoice.clear();
                this.successMessages = [
                  {
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Your order has been processed successfully.',
                  },
                ];
              },
              error: (err) => {
                console.log(err);
              },
            });
        } else {
          console.log('order cancelled');
          this.reloadProducts();
          this.clearLineItems();
          this.invoice.clear();
        }
      });
    } else {
      this.errorMessages = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'You must select at least one service.',
        },
      ];
    }
  }

  // reloadProducts function unchecks all products
  reloadProducts() {
    for (let product of this.products) {
      product.checked = false;
    }
  }

  // clearLineItems function sets the lineItems array to empty
  clearLineItems() {
    this.lineItems = [];
  }
}
