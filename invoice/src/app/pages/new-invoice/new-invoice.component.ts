import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ViewChild, ElementRef } from '@angular/core';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {
addShipForm!: FormGroup;
  get addShipF() { return this.addShipForm.controls; }
  
  items: any[] = [
    { nameFormControl: new FormControl(), countFormControl: new FormControl(), priceFormControl: new FormControl() }
  ];

  formRows: any[] = [{ name: '', count: 1, price: '' }];

  constructor( 
    private formBuilder: FormBuilder,
    private pagesService: PagesService
    ) { }


    ngOnInit(): void {
      this.addShipForm = this.formBuilder.group({
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

  addShip() {
    this.formRows = this.items.map(item => ({
      name: item.nameFormControl.value || '',
      count: item.countFormControl ? item.countFormControl.value : '',
      price: item.priceFormControl.value || ''
    }));
    this.pagesService.setFormData(this.formRows);
    console.log(this.formRows);
  }
}