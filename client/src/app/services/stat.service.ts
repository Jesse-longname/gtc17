import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Stat } from '../models/stat';
import { Deserialize } from 'cerialize';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response';

@Injectable()
export class StatService {
  private baseUrl = 'api/stats';

  constructor(private http: HttpClient) { }

  getUserStats(userName: string): Observable<Stat[]> {
    return this.http.get<Response>(this.baseUrl + '/' + userName)
      .map((result) => {
        return Deserialize(result.data, Stat);
      })
  }
}
