import { User } from '../../models/user';
import { FeedItem, HowItWent, FeelingIconEnum } from '../../models/feed';

import * as moment from 'moment';

const feedCollection = [
  new FeedItem(
    new User(),
    'I had a call today with a boy who was sad, he told me his friends started becoming very mean to him and he is not sure why, does anyone know how to counsel in this situation?',
    new HowItWent('Not well', FeelingIconEnum.BAD),
    'Friend related',
    moment(new Date('10/2/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'A child told me that her parents were always arguing. As I continued talking to her, I realized that her parents were just having a little fight and that It was nothing to worry about. She then put her parents on the phone, and we resolved everything!',
    new HowItWent('Great', FeelingIconEnum.GOOD),
    'Family',
    moment(new Date('9/29/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'Today, I had a caller tell me that he was not doing very well in school, he told me that he has not been asking for help because he was afraid that the other students would make fun of him for not knowing. How should I deal with a situation like this? Thanks!!',
    new HowItWent('Neutral', FeelingIconEnum.NEUTRAL),
    'School',
    moment(new Date('9/25/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'Hey everybody!, I had a child tell me today that he was ground because he told his parents that he was a member of the LGBTQ club at school. I am really not sure how to deal with this. Do his parents have a right to tell him which clubs he can and cannot join? Thank you!',
    new HowItWent('Neutral', FeelingIconEnum.NEUTRAL),
    'Personal',
    moment(new Date('9/21/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'I had a call today with a boy who was sad, he told me his friends started becoming very mean to him and he is not sure why, does anyone know how to counsel in this situation?',
    new HowItWent('Not well', FeelingIconEnum.BAD),
    'Friends',
    moment(new Date('10/2/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'Hello everyone! I was on the phone with a child today who told me he was very sad, and he was not sure why. He agreed to let me talk to his parents, and his parents have booked him sessions with a therapist. I think everything will work out. :)',
    new HowItWent('Neutral', FeelingIconEnum.NEUTRAL),
    'Family',
    moment(new Date('9/29/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'I had a call today with a boy who was sad, he told me his friends started becoming very mean to him and he is not sure why, does anyone know how to counsel in this situation?',
    new HowItWent('Not well', FeelingIconEnum.BAD),
    'Friend related',
    moment(new Date('10/2/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'A child told me that her parents were always arguing. As I continued talking to her, I realized that her parents were just having a little fight and that It was nothing to worry about. She then put her parents on the phone, and we resolved everything!',
    new HowItWent('Great', FeelingIconEnum.GOOD),
    'Family',
    moment(new Date('9/29/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'Today, I had a caller tell me that he was not doing very well in school, he told me that he has not been asking for help because he was afraid that the other students would make fun of him for not knowing. How should I deal with a situation like this? Thanks!!',
    new HowItWent('Neutral', FeelingIconEnum.NEUTRAL),
    'School',
    moment(new Date('9/25/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'Hey everybody!, I had a child tell me today that he was ground because he told his parents that he was a member of the LGBTQ club at school. I am really not sure how to deal with this. Do his parents have a right to tell him which clubs he can and cannot join? Thank you!',
    new HowItWent('Neutral', FeelingIconEnum.NEUTRAL),
    'Personal',
    moment(new Date('9/21/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'I had a call today with a boy who was sad, he told me his friends started becoming very mean to him and he is not sure why, does anyone know how to counsel in this situation?',
    new HowItWent('Not well', FeelingIconEnum.BAD),
    'Friends',
    moment(new Date('10/2/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'Hello everyone! I was on the phone with a child today who told me he was very sad, and he was not sure why. He agreed to let me talk to his parents, and his parents have booked him sessions with a therapist. I think everything will work out. :)',
    new HowItWent('Neutral', FeelingIconEnum.NEUTRAL),
    'Family',
    moment(new Date('9/29/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'I had a call today with a boy who was sad, he told me his friends started becoming very mean to him and he is not sure why, does anyone know how to counsel in this situation?',
    new HowItWent('Not well', FeelingIconEnum.BAD),
    'Friend related',
    moment(new Date('10/2/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'A child told me that her parents were always arguing. As I continued talking to her, I realized that her parents were just having a little fight and that It was nothing to worry about. She then put her parents on the phone, and we resolved everything!',
    new HowItWent('Great', FeelingIconEnum.GOOD),
    'Family',
    moment(new Date('9/29/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'Today, I had a caller tell me that he was not doing very well in school, he told me that he has not been asking for help because he was afraid that the other students would make fun of him for not knowing. How should I deal with a situation like this? Thanks!!',
    new HowItWent('Neutral', FeelingIconEnum.NEUTRAL),
    'School',
    moment(new Date('9/25/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'Hey everybody!, I had a child tell me today that he was ground because he told his parents that he was a member of the LGBTQ club at school. I am really not sure how to deal with this. Do his parents have a right to tell him which clubs he can and cannot join? Thank you!',
    new HowItWent('Neutral', FeelingIconEnum.NEUTRAL),
    'Personal',
    moment(new Date('9/21/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'I had a call today with a boy who was sad, he told me his friends started becoming very mean to him and he is not sure why, does anyone know how to counsel in this situation?',
    new HowItWent('Not well', FeelingIconEnum.BAD),
    'Friends',
    moment(new Date('10/2/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'Hello everyone! I was on the phone with a child today who told me he was very sad, and he was not sure why. He agreed to let me talk to his parents, and his parents have booked him sessions with a therapist. I think everything will work out. :)',
    new HowItWent('Neutral', FeelingIconEnum.NEUTRAL),
    'Family',
    moment(new Date('9/29/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'I had a call today with a boy who was sad, he told me his friends started becoming very mean to him and he is not sure why, does anyone know how to counsel in this situation?',
    new HowItWent('Not well', FeelingIconEnum.BAD),
    'Friend related',
    moment(new Date('10/2/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'A child told me that her parents were always arguing. As I continued talking to her, I realized that her parents were just having a little fight and that It was nothing to worry about. She then put her parents on the phone, and we resolved everything!',
    new HowItWent('Great', FeelingIconEnum.GOOD),
    'Family',
    moment(new Date('9/29/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'Today, I had a caller tell me that he was not doing very well in school, he told me that he has not been asking for help because he was afraid that the other students would make fun of him for not knowing. How should I deal with a situation like this? Thanks!!',
    new HowItWent('Neutral', FeelingIconEnum.NEUTRAL),
    'School',
    moment(new Date('9/25/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'Hey everybody!, I had a child tell me today that he was ground because he told his parents that he was a member of the LGBTQ club at school. I am really not sure how to deal with this. Do his parents have a right to tell him which clubs he can and cannot join? Thank you!',
    new HowItWent('Neutral', FeelingIconEnum.NEUTRAL),
    'Personal',
    moment(new Date('9/21/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'I had a call today with a boy who was sad, he told me his friends started becoming very mean to him and he is not sure why, does anyone know how to counsel in this situation?',
    new HowItWent('Not well', FeelingIconEnum.BAD),
    'Friends',
    moment(new Date('10/2/2017')).format('ll')
  ),
  new FeedItem(
    new User(),
    'Hello everyone! I was on the phone with a child today who told me he was very sad, and he was not sure why. He agreed to let me talk to his parents, and his parents have booked him sessions with a therapist. I think everything will work out. :)',
    new HowItWent('Neutral', FeelingIconEnum.NEUTRAL),
    'Family',
    moment(new Date('9/29/2017')).format('ll')
  ),
];

export class FeedTransformer {
  static transform(userList: User[]) {
    return feedCollection.map((item, index) => {
      item.user = userList[index];
      item.likes = [
        userList[index]
      ];
      item.comments = [
        userList[index]
      ];
      return item;
    });
  }

  static createFullName(first = '', last = '') {
    return first + last;
  }
}