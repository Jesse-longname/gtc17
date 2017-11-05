import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/operators';
import 'rxjs/add/observable/of';

@Injectable()
export class CallService {

  constructor(private db: AngularFirestore) { }

  getAgeBreakdown(): Observable<any> {
    // 0 - 5
    
    let ret = [0,0,0,0,0]
    
    this.db.collection('call-stats', ref => ref.where('age','<=',5)).valueChanges().subscribe(res => {
      ret[0] = res.length;
    });
    let from6to10 = this.db.collection('call-stats', ref => ref.where('age', '>=', 6).where('age', '<=', 10)).valueChanges().subscribe(res => {
      ret[1] = res.length;
    });
    let from11to15 = this.db.collection('call-stats', ref => ref.where('age', '>=', 11).where('age', '<=', 15)).valueChanges().subscribe(res => {
      ret[2] = res.length;
    });
    let from15to20 = this.db.collection('call-stats', ref => ref.where('age', '>=', 16).where('age', '<=', 20)).valueChanges().subscribe(res => {
      ret[3] = res.length;
    });
    let over21 = this.db.collection('call-stats', ref => ref.where('age', '==', 21)).valueChanges().subscribe(res => {
      ret[4] = res.length;
    });

    return Observable.of(ret);

    // for (let i = 1; i <= 21; i++) {
    //   this.db.collection('call-stats', ref => ref.where('age', '==', i.toString()))
    //       .valueChanges().subscribe((res) => {
    //         console.log(res.length);
    //       });
    // }
  }

}
