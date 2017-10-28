import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import * as GeoFire from '../classes/geofire.js';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LatLngLiteral } from '@agm/core';
import { Geokit } from 'geokit';
import 'rxjs/add/operator/first';

import { IEvent, ICheckin, IUser } from '../interfaces';

import { LocationService } from './location.service';
import { UserService } from './user.service';

interface ICheckinCallback {
  (error: string, result: ICheckin);
}

/**
 * A class for the EventsService
 */
@Injectable()
export class EventsService {
  private _dbRef: any;
  private _geoFire: any;
  private _geoKit: Geokit = new Geokit();
  private _nearMapCenter: BehaviorSubject<IEvent[]> = new BehaviorSubject<IEvent[]>([]);
  private _nearUser: BehaviorSubject<IEvent[]> = new BehaviorSubject<IEvent[]>([]);
  private _today: Date = new Date();

  /**
   * @param _fbDB Firebase Database instance.
   * @param _ls LocationService that allows locational querying.
   * @param _us UserService that provides access the user's profile and related queries.
   */
  constructor(private _fbDB: AngularFireDatabase, private _ls: LocationService, private _us: UserService) {
    this._dbRef = firebase.database().ref('activeEvents');
    this._geoFire = new GeoFire(this._dbRef);
    this._ls.mapCenter.subscribe((coords: LatLngLiteral) => {
      this._geoFetch(coords, 8, this._nearMapCenter);
    });

    this._ls.coordinates.subscribe((coords: LatLngLiteral) => {
      this._geoFetch(coords, 25, this._nearUser);
    });
  }

  /**
   * Getter for finding the center of the users location.
   * @returns An array of IEvents.
   */
  get nearMapCenter(): Observable<IEvent[]> {
    return this._nearMapCenter.asObservable();
  }

  /**
   * Getter for finding events around the users location.
   * @returns An Observable array of IEvents.
   */
  get nearUser(): Observable<IEvent[]> {
    return this._nearUser.asObservable();
  }

  /**
   * Allows a user to check in to any created events.
   * @param id Event ID to pass in and attempt to check in to.
   * @param callback Optional field for callback function.
   */
  public checkIn(id: string, callback?: any): void {
    this._validateCheckIn(id, (error: string, success: ICheckin) => {
      if (error) {
        if (callback) { callback(error, null); }
      } else {
      this._fbDB.object('checkins/' + (success.eventId + success.uid)).set(success).then((result: any) => {
        if (callback) { callback(null, result); }
      });
      }
    });
  }

  /**
   * Allows a user to create an event.
   * @param event Event that is passed for validation.
   * @param callback Optional field for callback function.
   */
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
      this._fbDB.list('events')
        .push(event).then((result: any) => {
          if (callback) { callback(null, true); }
        });
    });
  }

  /**
   * Finds an event from a given ID
   * @param id Target id to look for while
   * @returns 
   */
  public findById(id: string): Observable<IEvent> {
    return this._fbDB.object('/events/' + id).valueChanges().map((event: IEvent) => ({ $key: id, ...event }));
  }

  /**
   * Collects
   * @param id 
   */
  public findCheckins(id: string): Observable<ICheckin[]> {
    return this._fbDB.list('checkins', (ref: firebase.database.Reference) => {
      return ref.orderByChild('eventId').equalTo(String(id));
    }).snapshotChanges().map((changes: any) => {
      return changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() }));
    });
  }

  /**
   * Retrieves a maximum of 100 locations from the database and displays them.
   * @param coords Coordinates to search around location.
   * @param radius Size around the coordinates to display location pins (in kilometers).
   * @param store Data store to update.
   */
  private _geoFetch(coords: LatLngLiteral, radius: number, store: BehaviorSubject<IEvent[]>): void {
    const max = 100;
    this._geoFire.query({
      center: [coords.lat, coords.lng],
      radius: radius
    }).on('key_entered', (key: string, result: IEvent) => {
      result.$key = key;
      let events: IEvent[] = [...store.value];
      if (result.starts < this._today.getTime()) { return; }
      if (events.find((event: IEvent) => event.id === result.id)) { return; }
      events.push(result);
      events.map((event: IEvent) => event.distance = this._geoKit.distance(coords, event.coordinates, 'miles'));
      events = this._quicksort(events);
      if (events.length > max) { events = events.slice(max); }
      store.next(events);
    });
  }

  /**
   * Sorts locations by distance nearest to the user.
   * @param c Input array to sort.
   * @returns Sorted array by distance.
   */
  private _quicksort(c: any[]): any[] {
    if (c.length <= 1) { return c; }
    const pivot: any = c.pop();
    const less: any[] = [];
    const more: any[] = [];
    c.forEach((val: any) => (pivot.distance > val.distance) ? less.push(val) : more.push(val));
    return [...this._quicksort(less), pivot, ...this._quicksort(more)];
  }

  /**
   * Finds active events
   * @param id
   * @returns Returns an updated
   */
  public locationEvents(id: string): Observable<IEvent[]> {
    return this._fbDB.list('activeEvents', (ref: firebase.database.Reference) => {
      return ref.orderByChild('placeId').equalTo(String(id));
    }).snapshotChanges().map((changes: any) => {
      return changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() }));
    });
  }

  /**
   * Validation for when a user creates an event.
   * @param event The event that will be passed in for validation.
   * @returns Returns true if passed event is valid.
   */
  private _validate(event: IEvent): boolean {
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

  /**
   * Validation and error checking for a user's check in action.
   * @param id Target id to check for validation.
   * @param callback Returns an error message on failure or an activity object on success
   */
  private _validateCheckIn(id: string, callback: ICheckinCallback) {
    this._us.user.first().subscribe((user: IUser) => {
      if (!user) { return callback('You must be signed in to check in to an event', null); }
      this.findById(id).first().subscribe((event: IEvent) => {
        if (!event) { return callback('Sorry, but that event doesn\'t exist!', null); }
        this._ls.coordinates.first().subscribe((userlocation: LatLngLiteral) => {
          if (this._geoKit.distance(event.coordinates, userlocation) > 0.5) {
            return callback('You must be closer to the location of the event to check in!', null);
          }
          let error: string;
          if (event.starts > this._today.getTime()) {
            error = 'You can\'t check in to an event that hasn\'t started!';
          } else if (event.ends >= this._today.getTime() + 86400000) {
            error = 'You can\'t check in to an event that is already over!';
          }
          callback(error, {
            activity: event.activity,
            description: event.description,
            eventId: id,
            placeName: event.placeName,
            placeId: event.placeId,
            starts: event.starts,
            uid: user.uid,
            uname: user.displayName,
            uphoto: user.photoURL
          });
        });
      });
    });
  }
}
