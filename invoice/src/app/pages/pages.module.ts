import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { PreviewInvoiceComponent } from './preview-invoice/preview-invoice.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PagesService } from './pages.service';
import { RouteService } from './route.service';

@NgModule({
  declarations: [
    PagesComponent,
    NewInvoiceComponent,
    PreviewInvoiceComponent,
  ],

  imports: [
   ModalModule.forRoot(),
    PagesRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTooltipModule,
  ],

  providers: [PagesService, RouteService],
  bootstrap: [PagesComponent],
})
export class PagesModule {}
