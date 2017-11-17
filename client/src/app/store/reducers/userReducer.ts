import { IUser, User } from '../../models/user';

const defaultUser = new User();

export function userReducer(state: IUser = defaultUser, action) {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default:
      return state;
  }
}