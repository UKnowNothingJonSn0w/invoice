import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()

export class PagesService {
    constructor(private http: HttpClient) {
    }

    private formData: any[] = [];

  setFormData(formData: any[]) {
    this.formData = formData;
  }

  getFormData() {
    return this.formData;
  }
}