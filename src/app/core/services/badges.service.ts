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

@Injectable()
export class BadgesService {

  constructor(private _fbDB: AngularFireDatabase) {}

  public findBadges(id: string): Observable<IBadge[]> {
    return this._fbDB.list('/userBadges', (ref) => {
      return ref.orderByChild('uid').equalTo(id);
    })
    .valueChanges();
  }

}
