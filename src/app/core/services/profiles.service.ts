import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { UserService } from './user.service';

@Injectable()
export class ProfilesService {

  constructor(private _fbDB: AngularFireDatabase) {}

  public findProfile(id: string): Observable<any> {
    return this._fbDB.object('/profiles/' + id);
  }

}
