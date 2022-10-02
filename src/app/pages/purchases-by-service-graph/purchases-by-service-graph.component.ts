import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-purchases-by-service-graph',
  templateUrl: './purchases-by-service-graph.component.html',
  styleUrls: [ './purchases-by-service-graph.component.scss' ]
})
export class PurchasesByServiceGraphComponent implements OnInit {
  /* local variables */
  purchases: any;
  data: any;
  itemCount: string[];
  labels: string[];
  basicData: any;
  options: any;
  constructor (private invoiceService: InvoiceService) {
    this.purchases = {};
    this.data = {};
    this.itemCount = [];
    this.labels = [];


    /*
        this.invoiceService.findPurchasesByServiceGraph().subscribe({
          next: (res) => {
            this.purchases = res.data;

            console.log(this.purchases);
            for (const item of this.purchases) {
              console.log(item._id);

              let title = item._id.title;
              let count = item.count;

              this.labels.push(title);
              this.itemCount.push(count);
            }
          }
        }); */
    this.basicData = {
      labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul' ],
      datasets: [
        {
          label: 'First Dataset',
          data: [ 65, 59, 80, 81, 56, 55, 40 ],
          fill: false,
          borderColor: '#3c634a',
          tension: .4
        },
        {
          label: 'Second Dataset',
          data: [ 28, 48, 40, 19, 86, 27, 90 ],
          fill: false,
          borderColor: '#a0d574',
          tension: .4
        }
      ]
    };
    this.options = {
      scales: {
        x: {
          display: false
        },
        y: {
          display: false
        }
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            color: 'rgb(255, 99, 132)'
          }
        }
      }
    };
  }

  ngOnInit(): void {

  }

}
