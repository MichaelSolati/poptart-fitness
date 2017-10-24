import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

export interface IActivity {
  $key: string;
  name: string;
  liked: boolean;
}

@Injectable()
export class ActivitiesService {

  constructor(private _fbDB: AngularFireDatabase) {}

  public findActivities(id: string): Observable<any> {
    return this._fbDB.list('/userActivities', (ref) => {
      return ref.orderByChild('uid').equalTo(id);
    })
    .valueChanges();
  }

}
