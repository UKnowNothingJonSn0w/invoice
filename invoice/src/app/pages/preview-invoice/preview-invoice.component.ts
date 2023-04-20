import { Component, OnDestroy } from '@angular/core';
import { PagesService } from '../pages.service';
import { RouteService } from '../route.service';

@Component({
  selector: 'app-preview-invoice',
  templateUrl: './preview-invoice.component.html',
  styleUrls: ['./preview-invoice.component.css']
})
export class PreviewInvoiceComponent implements OnDestroy {

  formRows: any[] = [];

  constructor(private pagesService: PagesService, 
    private routeService: RouteService,  ) {}

  ngOnInit(): void {
    this.formRows = this.pagesService.getFormData();
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }

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

 // getTotal() {
  
 // }

}
