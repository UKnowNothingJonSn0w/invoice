import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ViewChild, ElementRef } from '@angular/core';
import { PagesService } from '../pages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {
addInvoiceForm!: FormGroup;
  get addInvoiceF() { return this.addInvoiceForm.controls; }
  
  items: any[] = [
    { nameFormControl: new FormControl(), countFormControl: new FormControl(), priceFormControl: new FormControl() }
  ];

  formRows: any[] = [{ name: '', count: 1, price: '' }];

  constructor( 
    private formBuilder: FormBuilder,
    private pagesService: PagesService,
    private router: Router
    ) { 
      window.addEventListener('beforeunload', () => {
        for (let key in localStorage) {
          if (key.includes('formRows')) {
            localStorage.removeItem(key);
          }
        }
      });
    }


    ngOnInit(): void {
      this.addInvoiceForm = this.formBuilder.group({
        name: [''],
        count: [''],
        price: [''],
      });
    }

    addFormRow() {
      this.formRows.push({ name: '', count: 1, price: '' });
    }

addForm() {
    this.items.push({ nameFormControl: new FormControl(), priceFormControl: new FormControl() });
  }

  deleteForm(item: any) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  addData() {
    this.formRows = this.items.map(item => ({
      name: item.nameFormControl.value || '',
      count: item.countFormControl ? item.countFormControl.value : '',
      price: item.priceFormControl.value || '' 
    }));
    this.pagesService.setFormData(this.formRows);
    console.log(this.formRows);
    this.router.navigate(['/preview-invoice']);
  }
}