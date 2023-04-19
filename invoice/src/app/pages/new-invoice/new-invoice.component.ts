import {Component} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent {

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
  //nameFormControl = new FormControl('', [Validators.required]);
  //countFormControl = new FormControl('', [Validators.required]);

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
    // Zapisz dane do sessionStorage
    sessionStorage.setItem('formData', JSON.stringify(this.items));
    console.log(this.items)
  }
}

