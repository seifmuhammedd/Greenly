import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor( private _HttpClient: HttpClient ) { }

  getWishList():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/wishList/getwishlist`)
  }

  addProductToFavorites(p_ID: string):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/wishList/addtowishlist`, {productId : p_ID})
  }

  removeProductFromFavorites(productId: string) {
    return this._HttpClient.delete(`${environment.baseURL}/wishList/${productId}`)
  }

}
