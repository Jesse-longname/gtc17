import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Stat } from '../models/stat';
import { Deserialize } from 'cerialize';

@Injectable()
export class StatService {
  items: Observable<any[]>;
  numStats = 22;
  statNames: Stat[];
  private statCollection: AngularFirestoreCollection<Stat>;
  stats: Observable<Stat[]>;
  constructor(private db: AngularFirestore) { }

  getUserStats(userName: string): Observable<Stat[]> {
    return this.db.collection('stats', ref => ref.where('user', '==', userName)).stateChanges().map(actions => {
      return actions.map(a => {
        const data = Deserialize(a.payload.doc.data(), Stat);
        return data;
      })
    });
  }
}
