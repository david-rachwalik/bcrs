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
import { Product } from "../interfaces/product.interface";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    products: Product[];

    constructor() {

        // Array of available products
        this.products = [
            {
                id: 100,
                title: 'Password Reset',
                price: 39.99,
                checked: false
            },
            {
                id: 101,
                title: 'Spyware Removal',
                price: 99.99,
                checked: false
            },
            {
                id: 102,
                title: 'RAM Upgrade',
                price: 129.99,
                checked: false
            },
            {
                id: 103,
                title: 'Software Installation',
                price: 49.99,
                checked: false
            },
            {
                id: 104,
                title: 'PC Tune-up',
                price: 89.99,
                checked: false
            },
            {
                id: 105,
                title: 'Keyboard Cleaning',
                price: 45.00,
                checked: false
            },
            {
                id: 106,
                title: 'Disk Clean-up',
                price: 149.99,
                checked: false
            }
        ]
    }

    // getProducts function populates array of selected products
    getProducts(): Product[] {
        return this.products;
    }
}