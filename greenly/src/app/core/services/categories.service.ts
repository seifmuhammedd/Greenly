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

  getAllSubCategories():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/subCategory/allsubcategories`)
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

  addSubCategory(subCategoryData: object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/subCategory/addsubcategory`, subCategoryData, { headers: {Authorization: `Admin ${localStorage.getItem("userToken")}`} } )
  }

  deleteCategory(c_ID: string | null):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/category/delete/${c_ID}`, { headers: {Authorization: `Admin ${localStorage.getItem("userToken")}`} })
  }

  deleteSubCategory(sc_ID: string | null):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/subCategory/delete/${sc_ID}`, { headers: {Authorization: `Admin ${localStorage.getItem("userToken")}`} })
  }


}
