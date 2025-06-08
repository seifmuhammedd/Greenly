import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient: HttpClient) { }

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/category/allcategories`)
  }

  getSpecificCategory(p_ID: string | null):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/category/${p_ID}`)
  }

  getSubCategoriesByCategory(c_ID: string | null):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/product/getCategoryBySubcategory/${c_ID}`)
  }

  addCategory(categoryData: object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/category/addcategory`, categoryData, { headers: {Authorization: `Admin ${localStorage.getItem("userToken")}`} } )
  }
}
