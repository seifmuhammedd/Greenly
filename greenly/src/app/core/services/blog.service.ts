import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _HttpClient: HttpClient) { }

  getAllPosts():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/blog/getAllPosts`)
  }

  getUserPosts(user_ID: string):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/blog/${user_ID}`)
  }

  createPost(post : object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/blog/createPost`, post)
  }

  deletePost(postID: string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/blog/${postID}`)
  }
}
