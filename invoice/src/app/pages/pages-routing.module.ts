import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages/pages.component';
import { PreviewInvoiceComponent } from './preview-invoice/preview-invoice.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: '/new-invoice', pathMatch: 'full' },
      { path: 'new-invoice', component: NewInvoiceComponent },
      { path: 'preview-invoice', component: PreviewInvoiceComponent  },

    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
