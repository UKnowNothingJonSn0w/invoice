import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {

  items: any[] = [
    { nameFormControl: new FormControl(), priceFormControl: new FormControl() }
  ];

  formRows: any[] = [{ name: '', count: 1, price: '' }];

  constructor() { }

  ngOnInit() {
    // Odczytaj dane z sessionStorage
    const formData = sessionStorage.getItem('formData');
    if (formData) {
      this.items = JSON.parse(formData);
    }
  }

  addFormRow() {
    this.formRows.push({ name: '', count: 1, price: '' });
  }
  
  @ViewChild('exampleForm', { static: true }) formRef!: ElementRef<HTMLFormElement>;

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  matcher = new ErrorStateMatcher();
  
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
    const itemsToSave = this.items.map(item => ({ name: item.nameFormControl.value, price: item.priceFormControl.value }));
    sessionStorage.setItem('formData', JSON.stringify(itemsToSave));
    console.log(itemsToSave);
  }
}