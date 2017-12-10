import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user-new';
import { Response } from '../models/response';
import { Serialize, Deserialize } from 'cerialize';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private baseUrl = 'api/user/';


  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<Response>(this.baseUrl)
      .map((result) => {
        return Deserialize(result.data, User);
      });
  }

  editUser(user: User): Observable<User> {
    return this.http.post<Response>(this.baseUrl, Serialize(user, User))
      .map(result => {
        return Deserialize(result.data, User);
      });
  }

  editImage(data: any): Observable<User> {
    return this.http.post<Response>(this.baseUrl + 'edit_image', data)
      .map(result => {
        return Deserialize(result.data, User);
      })
  }
}
