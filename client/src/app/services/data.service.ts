import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CallOutcome } from '../models/call-outcome';
import { Category } from '../models/category';
import { Response } from '../models/response';
import { Deserialize } from 'cerialize';

@Injectable()
export class DataService {
  private baseUrl = 'api/data';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Response>(this.baseUrl + '/categories')
      .map(result => {
        return Deserialize(result.data, Category);
      });
  }

  getCallOutcomes(): Observable<CallOutcome[]> {
    return this.http.get<Response>(this.baseUrl + '/outcomes')
      .map(result => {
        return Deserialize(result.data, Category);
      });
  }
}
