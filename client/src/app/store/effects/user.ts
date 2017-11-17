import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { PayloadAction } from '../../models/payload-action';
import { UserTransformer } from '../transformers/user';
import { FeedTransformer } from '../transformers/feed';


@Injectable()
export class UserEffects {
  // Listen for the 'GET_USER' action
  @Effect() getUser$: Observable<Action> = this.actions$.ofType('APP_START')
    .mergeMap((action: PayloadAction) =>
      this.http.get('https://randomuser.me/api/?nat=ca')
        // If successful, dispatch success action with result
        .map(data => {
          return {
            type: 'SET_USER',
            payload: UserTransformer.transform(data)
          }
        })
        // If request fails, dispatch failed action
        .catch(() => of({ type: 'GET_USER_FAIL' }))
    );

  @Effect() getUserBunch$: Observable<Action> = this.actions$.ofType('APP_START')
    .mergeMap((action: PayloadAction) =>
      this.http.get('https://randomuser.me/api/?nat=ca&results=40')
        // If successful, dispatch success action with result
        .map(data => {
          return {
            type: 'SET_FEED',
            payload: FeedTransformer.transform(UserTransformer.transformAll(data))
          }
        })
        // If request fails, dispatch failed action
        .catch(() => of({ type: 'GET_USER_FAIL' }))
    );

  constructor(
    private http: Http,
    private actions$: Actions
  ) { }
}