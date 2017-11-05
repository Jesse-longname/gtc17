import { IUser } from './user';

export enum FeelingIconEnum {
  GOOD = 'sentiment_very_satisfied',
  NEUTRAL = 'sentiment_neutral',
  BAD = 'sentiment_very_dissatisfied'
};

export interface IHowItWent {
  label: string,
  icon: string
}

export class HowItWent implements IHowItWent {
  label: string;
  icon: string;
  constructor(label = null, icon = null) {
    this.label = label;
    this.icon = icon;
  }
}

export interface IFeedItem {
  user: IUser,
  whatHappened: string,
  howItWent: IHowItWent,
  whatWasTheProblem: string
  date: string,
  likes: IUser[],
  comments: IUser[],
}

export class FeedItem implements IFeedItem {
  user: IUser;
  whatHappened: string;
  howItWent: IHowItWent;
  whatWasTheProblem: string;
  date: string;
  likes: IUser[];
  comments: IUser[];

  constructor(user = null, whatHappened = null, howItWent = null, whatWasTheProblem = null, date = null, likes = [], comments = []) {
    this.user = user;
    this.howItWent = howItWent;
    this.whatWasTheProblem = whatWasTheProblem;
    this.whatHappened = whatHappened;
    this.date = date;
    this.likes = likes;
    this.comments = comments;
  }
}

export const howItWentOptions = [
  new HowItWent('Great', FeelingIconEnum.GOOD),
  new HowItWent('Neutral', FeelingIconEnum.NEUTRAL),
  new HowItWent('Not well', FeelingIconEnum.BAD)
];

export const problemOptions = [
  "Emotional Health",
  "Dating",
  "LGBTQ",
  "Sexting",
  "Bullying",
  "Assult",
  "Family Troubles",
  "Other"
];