import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor( private _HttpClient: HttpClient ) { }

  submitLoanApplication(formData: object):Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/loan/predict`, formData, { headers: { 'Authorization': `Bearer ${localStorage.getItem("userToken")}` } });
  }
}
