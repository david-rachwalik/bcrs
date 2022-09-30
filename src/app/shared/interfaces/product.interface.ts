/*
============================================
; Title: Bob's Computer Repair Shop (Sprint 3)
; Author: Professor Krasso
; Date: 30 September 2022
; Modified By: Joel Hartung, Allan Trejo, David Rachwalik
; Description: product.interface.ts
;===========================================
*/

// exports the product interface
export interface Product {
    id: number;
    title: string;
    price: number;
    checked: boolean;
}