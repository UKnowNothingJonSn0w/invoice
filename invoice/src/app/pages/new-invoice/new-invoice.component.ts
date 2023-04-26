import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
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
    { form: new FormGroup({
        name: new FormControl('', Validators.required),
        count: new FormControl(''),
        price: new FormControl('', Validators.required)
      })
    }
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
      name: ['', Validators.required],
      count: ['', ],
      price: ['', Validators.required],
    });
  }
 
  addFormRow() {
    this.formRows.push({ name: '', count: 1, price: '' });
  }
 
  addForm() {
    const newForm = {
      form: new FormGroup({
        name: new FormControl('', Validators.required),
        count: new FormControl(''),
        price: new FormControl('', Validators.required)
      })
    };
    this.items.push(newForm);
  }
 
  deleteForm(item: any) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
 
  addData() {
    let allFormsValid = true;
    for (const item of this.items) {
      if (!item.form.valid) {
        allFormsValid = false;
        break;
      }
    }
    if (!allFormsValid) {
      alert('Please fill in all required fields');
      return;
    }
    const formRows = this.items.map(item => item.form.value);
    if (formRows.every(row => !Object.values(row).some(value => value))) {
      alert('Please add items');
      return;
    }
    this.pagesService.setFormData(formRows);
    console.log(formRows);
    this.router.navigate(['/preview-invoice']);
  }
}






