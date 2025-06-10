import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LicenceService {

  constructor( private _HttpClient: HttpClient ) { }

  requestLicence(requestData: object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/license/requestLicense`, requestData)
  }

  getAllRequests():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/license/getAllRequests`, { headers: { 'Authorization': `Admin ${localStorage.getItem("userToken")}` } })
  }

  getSpecificLicence(licence_ID: string | null):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/license/${licence_ID}`, { headers: { 'Authorization': `Admin ${localStorage.getItem("userToken")}` } })
  }

  updateLicenceStatus(licence_ID: string | null, status: string):Observable<any>{
    return this._HttpClient.patch(`${environment.baseURL}/license/${licence_ID}`, { status } , { headers: { 'Authorization': `Admin ${localStorage.getItem("userToken")}` } });
  }

  getLicencseByStatus(status: string):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/license/getByStatus`, { status } , { headers: { 'Authorization': `Admin ${localStorage.getItem("userToken")}` } });
  }

}
