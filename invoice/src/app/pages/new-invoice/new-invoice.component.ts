import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PagesService } from '../pages.service';
import { Router } from '@angular/router';

interface FormItem {
  form: FormGroup;
}

interface FormRow {
  name: string;
  count: number;
  price: string;
}

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit, OnDestroy {

  addInvoiceForm!: FormGroup;
  items: FormItem[] = [{ form: this.createItemForm() }];
  formRows: FormRow[] = [{ name: '', count: 1, price: '' }];

  constructor(
    private formBuilder: FormBuilder,
    private pagesService: PagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addInvoiceForm = this.formBuilder.group({
      name: ['', Validators.required],
      count: [''],
      price: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  private createItemForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      count: [''],
      price: ['', Validators.required],
    });
  }

  addFormRow() {
    this.formRows.push({ name: '', count: 1, price: '' });
  }

  addForm() {
    const newForm = { form: this.createItemForm() };
    this.items.push(newForm);
  }

  deleteForm(index: number) {
    if (index >= 0 && index < this.items.length) {
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

  private beforeUnloadHandler = () => {
    for (const key in localStorage) {
      if (key.includes('formRows')) {
        localStorage.removeItem(key);
      }
    }
  };
}
