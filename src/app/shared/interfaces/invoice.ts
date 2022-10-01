/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 3)
; Author: Professor Krasso
; Date: 30 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description: invoice.ts
;===========================================
*/
// import statements
import { LineItem } from './line-item.interface';

// Invoice class
export class Invoice {
    private username: string;
    private lineItems: LineItem[];
    private orderDate: string;
    private LABOR_RATE: number = 50;

    partsAmount: number;
    laborHours: number;


    constructor(username?: string, partsAmount?: number, laborHours?: number) {
        this.username = username || '';
        this.partsAmount = partsAmount || 0;
        this.laborHours = laborHours || 0;
        this.orderDate = new Date().toLocaleDateString();
        this.lineItems = [];
    }

    // getUsername service
    getUsername(): string {
        return this.username;
    }
    // setLineItems service
    setLineItems(lineItems: LineItem[]): void {
        this.lineItems = lineItems;
    }
    // getLineItems service
    getLineItems(): LineItem[] {
        return this.lineItems;
    }
    // getLineItemTotal service
    getLineItemTotal(): number {
        let total: number = 0;

        for (let lineItem of this.lineItems) {
            total += lineItem.price;
        }
        return Number(total);
    }
    // getLaborAmount service
    getLaborAmount(): number {
        return Number(this.laborHours) * Number(this.LABOR_RATE);
    }
    // getOrderDate service
    getOrderDate(): string {
        return this.orderDate;
    }
    // getTotal service
    getTotal(): number {
        return Number(this.partsAmount) + Number(this.getLaborAmount()) + Number(this.getLineItemTotal());
    }
    // clear form service
    clear() {
        this.partsAmount = 0;
        this.laborHours = 0;
        this.lineItems = [];
    }
 
}