import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }

  decodedInfo:any
  isLoggedIn: WritableSignal<boolean> = signal(false)

  logInUser(userData: object):Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/auth/login`, userData);
  }

  registerUser(userData: object):Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/auth/signup`, userData);
  }

  confirmEmail(userData: object):Observable<any> {
    return this._HttpClient.patch(`${environment.baseURL}/auth/confirm-email`, userData);
  }

  forgetPassword(userData: object):Observable<any> {
    return this._HttpClient.patch(`${environment.baseURL}/auth/forgetPassword`, userData);
  }

  confirmOtp(userData: object):Observable<any> {
    return this._HttpClient.patch(`${environment.baseURL}/auth/validateForgetPassword`, userData);
  }

  resetPassword(userData: object):Observable<any> {
    return this._HttpClient.patch(`${environment.baseURL}/auth/resetPassword`, userData);
  }

  getDecodedInfo():void {
    if(localStorage.getItem('userToken') != null){
      this.decodedInfo = jwtDecode(localStorage.getItem('userToken') !)
    }
  }
}
