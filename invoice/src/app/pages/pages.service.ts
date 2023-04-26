import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()

export class PagesService {
  private formData: any[] = [];

  constructor(private http: HttpClient) {}

  setFormData(formData: any[]) {
    this.formData = formData;
  }

  getFormData() {
    return this.formData;
  }

  clearFormData() {
    this.formData = [];
  }

  invoiceData():  Observable<any> {
    return this.http.get<any>(`http://localhost:3000/data`).pipe(
      map(response => {
          return response;})
      )
  };
}