import { Gender } from './gender';

export interface IUser {
  userName: string,
  name: {
    title: string,
    first: string,
    last: string,
    full: string
  },
  icon: string,
  thumbnail: string,
  location: {
    city: string,
    province: string,
  }
}

export class User implements IUser {
  userName: string;
  name: {
    title: string,
    first: string,
    last: string,
    full: string
  };
  icon: string;
  thumbnail: string;
  location: {
    city: string,
    province: string
  }

  constructor(userName = null, first = null, last = null, full = null, title = null, large = null, thumbnail = null, city = null, province = null) {
    this.userName = userName;
    this.name = {
      title,
      first,
      last,
      full
    };
    this.icon = large;
    this.thumbnail = thumbnail;
    this.location = {
      city,
      province
    }
  }
}