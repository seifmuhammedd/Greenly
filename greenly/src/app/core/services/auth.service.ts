import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }

  decodedInfo:any
  
  logInUser(userData: object):Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/auth/login`, userData);
  }

  registerUser(userData: object):Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/auth/signup`, userData);
  }

  getDecodedInfo():void {
    if(localStorage.getItem('userToken') != null){
      this.decodedInfo = jwtDecode(sessionStorage.getItem('userToken') !)
    }
  }
}
