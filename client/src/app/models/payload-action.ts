import { Action } from '@ngrx/store';

export class PayloadAction implements Action {
  type: string;
  payload: any;

  constructor(type: string, payload: any) {
    this.type = type;
    this.payload = payload;
  }
}