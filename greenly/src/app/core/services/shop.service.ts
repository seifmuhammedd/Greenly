import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private _HttpClient: HttpClient) { }

  getAllProducts():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/product/allproducts`)
  }

  getProductsByCategory(p_ID: string):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/product/products-by-category/${p_ID}`)
  }

  getSpecificProduct(p_ID: string | null):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/product/${p_ID}`)
  }

  deleteProduct(p_ID: string | null): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURL}/product/${p_ID}`, { headers: { 'Authorization': `Admin ${localStorage.getItem("userToken")}` } });
  }

  editProduct(p_ID: string | null, productData : object): Observable<any> {
    return this._HttpClient.put(`${environment.baseURL}/product/${p_ID}`, productData, { headers: { 'Authorization': `Admin ${localStorage.getItem("userToken")}` } });
  }


}
