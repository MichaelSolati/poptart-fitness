import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import * as GeoFire from '../classes/geofire.js';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LatLngLiteral } from '@agm/core';
import 'rxjs/add/operator/first';

import { LocationService } from './location.service';
import { UserService } from './user.service';

@Injectable()
export class EventsService {
  private _dbRef: any;
  private _geoFire: any;
  private _nearMapCenter: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private _nearUser: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private _today: Date = new Date();

  constructor(private _fbDB: AngularFireDatabase, private _ls: LocationService, private _us: UserService) {
    this._dbRef = firebase.database().ref('events');
    this._geoFire = new GeoFire(this._dbRef);
    this._ls.mapCenter.subscribe((coords: LatLngLiteral) => {
      this._geoFetch(coords, 8, this._nearMapCenter);
    });

    this._ls.coordinates.subscribe((coords: LatLngLiteral) => {
      this._geoFetch(coords, 25, this._nearUser);
    });
  }

  get nearMapCenter(): Observable<any[]> {
    return this._nearMapCenter.asObservable();
  }

  get nearUser(): Observable<any[]> {
    return this._nearUser.asObservable();
  }

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

  private _geoFetch(coords: LatLngLiteral, radius: number, store: BehaviorSubject<any[]>): void {
    const max = 100;
    this._geoFire.query({
      center: [coords.lat, coords.lng],
      radius: radius
    }).on('key_entered', (key: string, result: any) => {
      result.$key = key;
      if (result.starts < this._today.getTime()) { return; }
      let events: any[] = [...store.value];
      events.push(result);
      events = events.filter((a: any, i: number, self: any[]) => self.findIndex((b: any) => b.$key === a.$key) === i);
      if (events.length > max) { events = events.slice(events.length - max, events.length); }
      store.next(events);
    });
  }

  public locationEvents(id: string): Observable<any[]> {
    return this._fbDB.list('events', (ref: firebase.database.Reference) => {
      return ref.orderByChild('placeId').equalTo(String(id));
    }).valueChanges();
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
