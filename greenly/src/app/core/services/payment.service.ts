import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private _HttpClient: HttpClient) {}

  checkOut(formData: object): Observable<any> {
    return this._HttpClient.post(
      'https://aa1d-154-177-114-6.ngrok-free.app/payment/create-order',
      {
        "address": formData,
      },
      { headers: {Authorization: `${localStorage.getItem("userToken")}`} }
    );
  }
}
