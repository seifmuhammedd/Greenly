import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environments';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(
    private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      return token;
    }
    return null;
  }

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.getToken();

    if (!token) {
      console.warn('No token found in localStorage. User might not be authenticated.');
      return {
        headers: new HttpHeaders()
      };
    }

    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  addNewAddress(addressData: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseURL}/address/addaddress`,
      addressData,
      this.getAuthHeaders()
    ).pipe(
      catchError(err => {
        this.handleError(err);
        return throwError(() => err);
      })
    );
  }

  getAllAddresses(): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseURL}/address/getalladdress`,
      this.getAuthHeaders()
    ).pipe(
      catchError(err => {
        this.handleError(err);
        return throwError(() => err);
      })
    );
  }

  updateAddressToDefault(addressID: string): Observable<any> {
    return this._HttpClient.patch(
      `${environment.baseURL}/address/updateaddress/${addressID}`,
      {},
      this.getAuthHeaders()
    ).pipe(
      catchError(err => {
        this.handleError(err);
        return throwError(() => err);
      })
    );
  }

  // Handle errors globally or redirect to login
  private handleError(error: any): void {
    if (error.status === 401 || error.error?.message === 'Token is missing') {
      console.error('Authentication failed. Redirecting to login...');
      // Optionally navigate to login page:
      // this.router.navigate(['/login']);
    } else {
      console.error('An API error occurred:', error);
    }
  }
}