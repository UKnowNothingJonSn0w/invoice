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
    this.pagesService.clearFormData();
  }

  loadData() {
    this.pagesService.invoiceData().subscribe(response => {
      console.log(response)
     this.data = response
    })
   };
   
  getTotal() {
    let total = 0;
    for (const row of this.formRows) {
      const count = parseInt(row.count, 10);
      const price = parseFloat(row.price);
      if (!isNaN(count) && !isNaN(price)) {
        total += count * price;
      }
    }
    return total.toFixed(2);
  }
}