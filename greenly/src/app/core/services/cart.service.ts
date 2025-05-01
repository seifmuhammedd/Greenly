import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient: HttpClient) { }

  // clientToken : any = { Authorization : `Bearer ${localStorage.getItem("token")}`}
  cartCounter : BehaviorSubject<number> = new BehaviorSubject(0) 

  getUserCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/cart/getcart`)
  }

  addProductToCart(p_ID: string):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/cart/addtocart`, {"productId":  p_ID})
  }

  removeItemFromCart(p_ID: string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/cart/${p_ID}`)
  }

  emptyUserCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/cart/clearCart`)
  }

  updateItemCartQuantity(p_ID: string, count: number):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}/cart/updatecart`, {"quantity": count, "productId": p_ID})
  }
}
