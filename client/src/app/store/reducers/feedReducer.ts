import { IFeedItem, FeedItem } from '../../models/feed';
import { IUser, User } from '../../models/user';



export function feedReducer(state: IFeedItem[] = [], action) {
  switch (action.type) {
    case 'SET_FEED':
      return action.payload;
    case 'ADD_FEED_ITEM':
      return [
        action.payload,
        ...state,
      ];
    default:
      return state;
  }
}