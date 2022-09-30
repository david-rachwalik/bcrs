/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 3)
; Author: Professor Krasso
; Date: 30 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description:  Service layer for invoice documents
;===========================================
*/

// import statements
import { Injectable } from '@angular/core';
import { Invoice } from "../interfaces/invoice";
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {
    constructor(private http: HttpClient) {}

    createInvoice(userName: string, invoice: Invoice): Observable<any> {
        return this.http.post(`/api/invoices/${userName}`, {
            userName: userName,
            lineItems: invoice.getLineItems(),
            partsAmount: invoice.partsAmount,
            laborAmount: invoice.getLaborAmount(),
            lineItemTotal: invoice.getLineItemTotal(),
            total: invoice.getTotal()
        })
    }

    findPurchasesByServiceGraph(): Observable<any> {
        return this.http.get('/api/invoices/purchases-graph');
    }
}