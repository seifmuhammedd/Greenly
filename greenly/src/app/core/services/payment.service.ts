import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private _HttpClient: HttpClient) {}

  checkOut(formData: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseURL}/payment/create-order`,
      {
        "address": formData,
      },
      { headers: {Authorization: `Bearer ${localStorage.getItem("userToken")}`} }
    );
  }
}
