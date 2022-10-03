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
  options2: any;
  revenue: number = 0;
  constructor (private invoiceService: InvoiceService) {
    this.purchases = {};
    this.data = {};
    this.itemCount = [];
    this.labels = [];



    this.invoiceService.findPurchasesByServiceGraph().subscribe({
      next: (res) => {
        this.purchases = res.data;

        console.log('purchases', this.purchases);
        for (const item of this.purchases) {
          console.log(item._id);

          let title = item._id.title;
          let count = item.count;

          this.labels.push(title);
          this.itemCount.push(count);
          this.revenue += (item._id.price * item.count);
        }
        this.revenue = parseFloat(this.revenue.toFixed(2));
        /* build object literal for PrimeNg Bar Graph */
        this.data = {
          labels: this.labels,
          datasets: [
            /* graph object */
            {
              backgroundColor: [
                '#218B82',
                '#C47482',
                '#EEBAB2',
                '#F5F3E7',
                '#2CCED2',
                '#E5DB9C',
                '#E6A57E',
              ],
              hoverBackgroundColor: [
                '#218B82',
                '#C47482',
                '#EEBAB2',
                '#F5F3E7',
                '#2CCED2',
                '#E5DB9C',
                '#E6A57E',
              ],
              data: this.itemCount
            }
          ]
        };
        /* verify data object structure matches primeng expected format */
        console.log('data object graph: ', this.data);
      },
      error: (e) => {
        console.log(e);
      }
    });
    this.basicData = {
      labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul' ],
      datasets: [
        {
          label: 'First Dataset',
          data: [ 65, 59, 80, 81, 56 ],
          fill: false,
          backgroundColor: [
            'rgba(75, 192, 192, 0.5)',
          ],
          tension: .4
        },
        {
          label: 'Second Dataset',
          data: [ 28, 48, 40, 19, 86 ],
          fill: true,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
          ],
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
    this.options2 = {

      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 16
            },
          },
        },
        tooltip: {
          titleFont: {
            size: 50
          },
          bodyFont: {
            size: 20
          },
          footerFont: {
            size: 20 // there is no footer by default
          }
        }
      }
    };
  }

  ngOnInit(): void {

  }

}
