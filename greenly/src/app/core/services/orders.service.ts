import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private token: string | null = null;

  constructor(
    private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(platformId)) {
      this.token = localStorage.getItem('userToken');
    }
  }

  private getAuthHeaders(): { headers: any } {
    if (!this.token) {
      console.warn('No token found. User may not be authenticated.');
      return { headers: {} };
    }

    return {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    };
  }

  getAllOrders(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/payment/allorders`, this.getAuthHeaders());
  }

  getOrder(orderID: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/payment/${orderID}`, this.getAuthHeaders());
  }

  updateOrderStatus(orderID: string, orderStatus: string): Observable<any> {
    return this._HttpClient.patch(`${environment.baseURL}/payment/update-status/${orderID}`, {"newStatus": orderStatus } , this.getAuthHeaders());
  }
}