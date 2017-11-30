import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Post } from '../models/post';
import { Response } from '../models/response';
import { Deserialize, Serialize } from 'cerialize';

@Injectable()
export class PostService {
  private baseUrl = 'api/posts/';
  
  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Response>(this.baseUrl)
      .map(result => {
        return Deserialize(result.data, Post);
      });
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Response>(this.baseUrl, Serialize(post))
      .map(result => {
        return Deserialize(result.data, Post);
      });
  }

  updatePost(post: Post, updates: object): Observable<Post> {
    return this.http.post<Response>(this.baseUrl + post.id, JSON.stringify(updates))
      .map(result => {
        return Deserialize(result.data, Post);
      }); 
  }

  likePost(post: Post): Observable<Post> {
    return this.http.get<Response>(this.baseUrl + '/like/' + post.id)
      .map(result => {
        return Deserialize(result.data, Post);
      });
  }
}
