import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user-new';
import { Response } from '../models/response';
import { Deserialize } from 'cerialize';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private baseUrl = 'api/user/';


  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<Response>(this.baseUrl)
      .map((result) => {
        console.log(result.data);
        console.log(Deserialize(result.data, User));
        return Deserialize(result.data, User);
      });
  }

}
