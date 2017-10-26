import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

import { IProfile, ICheckin, IEvent } from '../interfaces';
export { IProfile, ICheckin, IEvent } from '../interfaces';

/**
 * A class for the ProfilesService
 */
@Injectable()
export class ProfilesService {
  private _eventsAttended: Observable<ICheckin[]>;
  private _eventsCreated: Observable<IEvent[]>;

  /**
   * @param _fbDB Firebase Database instance.
   */
  constructor(private _fbDB: AngularFireDatabase) { }

  /**
   * Getter for events attended by last user whos profile was queried.
   * @returns User's events attended.
   */
  get eventsAttended(): Observable<ICheckin[]> {
    return this._eventsAttended;
  }

  /**
   * Getter for events created by last user whos profile was queried.
   * @returns User's events created.
   */
  get eventsCreated(): Observable<IEvent[]> {
    return this._eventsCreated;
  }

  /**
   * Queries all events attended by a user.
   * @param id User's ID.
   */
  private _fetchEventsAttended(id: string): void {
    this._eventsAttended = this._fbDB.list('checkins', (ref: firebase.database.Reference) => {
      return ref.orderByChild('uid').equalTo(String(id));
    }).snapshotChanges().map((changes: any) => {
      return changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() }));
    });
  }

  /**
   * Queries all events created by a user.
   * @param id User's ID.
   */
  private _fetchEventsCreated(id: string): void {
    this._eventsCreated = this._fbDB.list('events', (ref: firebase.database.Reference) => {
      return ref.orderByChild('uid').equalTo(String(id));
    }).snapshotChanges().map((changes: any) => {
      return changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() }));
    });
  }

  /**
   * Queries all user's profile while also triggering fetches for their created and attended events.
   * @param id User's ID.
   * @returns User's profile as observable
   */
  public findById(id: string): Observable<IProfile> {
    this._fetchEventsAttended(id);
    this._fetchEventsCreated(id);
    return this._fbDB.object('/profiles/' + id).valueChanges().map((event: IProfile) => ({ $key: id, ...event }));
  }
}
