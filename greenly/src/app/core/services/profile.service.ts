import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( private _HttpClient: HttpClient ) { }

  getUserPersonalInfo():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/user/userProfile`)
  }

  updateUserPersonalInfo(userData: object):Observable<any>{
    return this._HttpClient.patch(`${environment.baseURL}/user/updateProfile`, userData)
  }

  updatePassword(userData: object):Observable<any>{
    return this._HttpClient.patch(`${environment.baseURL}/user/updatePassword`, userData)
  }
  
}
