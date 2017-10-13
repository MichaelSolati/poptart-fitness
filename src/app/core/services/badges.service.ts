import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

export interface IBadge {
  $key: string;
  name: string;
  progress: number;
  icon: string;
  description?: string;
}

// export const DummyBadges: IBadge[] = [
//   { $key: 'no', name: 'Strong Badge', progress: 75, icon: 'noicon',
//     description: 'Truly the baddest of the badges..?' },
//   { $key: 'no', name: 'Giraffe Badge', progress: 10, icon: 'notyet',
//     description: 'I\'m going to create a scraper for wikipedia' },
//   { $key: 'no', name: 'Spaghetti Badge', progress: 25, icon: 'professor',
//     description: 'I didn\'t see you there!' }
// ];

@Injectable()
export class BadgesService {

  constructor(private _fbDB: AngularFireDatabase) {}

  public findBadges(id: string): Observable<IBadge[]> {
    return this._fbDB.list('/userBadges', (ref) => {
      return ref.orderByChild('uid').equalTo(id);
    })
    .valueChanges();
    // return new BehaviorSubject<IBadge[]>(DummyBadges).asObservable();
  }

}
