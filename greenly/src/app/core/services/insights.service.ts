import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class InsightsService {

  constructor( private _HttpClient: HttpClient ) { }

  getHomeInsights():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/dash/status`)
  }

}
