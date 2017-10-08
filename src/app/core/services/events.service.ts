import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/first';

import { UserService } from './user.service';

@Injectable()
export class EventsService {
  private _today: Date = new Date();

  constructor(private _fbDB: AngularFireDatabase, private _us: UserService) { }

  public create(event: any, callback?: any): void {
    try {
      this._validate(event);
    } catch (e) {
      if (callback) { callback(e, null); }
      return;
    }
    this._us.user.first().subscribe((user: any) => {
      if (!user) { return; }
      event.uid = user.uid;
      this._fbDB.list('/events')
        .push(event).then((result: any) => {
          if (callback) { callback(null, true); }
        });
    });
  }

  private _validate(event: any): boolean {
    if (!event.description) {
      throw new Error('Hey, you need a description!');
    }

    if (event.starts <= this._today.getTime() || !event.starts) {
      throw new Error('Your event can\'t start today');
    }

    if (event.starts > event.ends || !event.ends) {
      throw new Error('You can\'t end in the past');
    }

    if (!event.activity) {
      throw new Error('Please select an activity...');
    }
    return true;
  }
}
