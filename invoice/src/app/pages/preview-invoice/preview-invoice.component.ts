import { Component, OnDestroy } from '@angular/core';
import { PagesService } from '../pages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preview-invoice',
  templateUrl: './preview-invoice.component.html',
  styleUrls: ['./preview-invoice.component.css']
})
export class PreviewInvoiceComponent implements OnDestroy {
  formRows: any[] = [];
  subscription!: Subscription;
  public data: any = [];

  constructor(private pagesService: PagesService) {}

  ngOnInit(): void {
    this.formRows = this.pagesService.getFormData();
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.pagesService.clearFormData();
  }

  loadData() {
    this.subscription = this.pagesService.invoiceData().subscribe(response => {
      console.log(response);
      this.data = response;
    });
  }

  getTotal(rows: any[]) {
    let total = 0;
    for (const row of rows) {
      console.log(row);
      const count = parseInt(row.count, 10);
      const price = parseFloat(row.price);
      console.log(count, price);
      if (!isNaN(count) && !isNaN(price)) {
        total += count * price;
      }
    }
    console.log(total);
    return total.toFixed(2);
  }
}
