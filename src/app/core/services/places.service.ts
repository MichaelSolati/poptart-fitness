import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import * as GeoFire from '../classes/geofire.js';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Geokit } from 'geokit';

import { LocationService } from './location.service';

import { IPlace, LatLngLiteral } from '../interfaces';

/**
 * A class for the PlacesService
 */
@Injectable()
export class PlacesService {
  private _dbRef: any;
  private _geoFire: any;
  private _geoKit: Geokit = new Geokit();
  private _nearMapCenter: BehaviorSubject<IPlace[]> = new BehaviorSubject<IPlace[]>([]);
  private _nearUser: BehaviorSubject<IPlace[]> = new BehaviorSubject<IPlace[]>([]);

  constructor(private _fbDB: AngularFireDatabase, private _ls: LocationService) {
    this._dbRef = firebase.database().ref('places');
    this._geoFire = new GeoFire(this._dbRef);
    this._ls.mapCenter.subscribe((coords: LatLngLiteral) => {
      this._geoFetch(coords, 8, this._nearMapCenter);
    });

    this._ls.coordinates.subscribe((coords: LatLngLiteral) => {
      this._geoFetch(coords, 25, this._nearUser);
    });
  }

  /**
   * Getter for places near the center of the map.
   * @returns An array of Places.
   */
  get nearMapCenter(): Observable<IPlace[]> {
    return this._nearMapCenter.asObservable();
  }

  /**
   * Getter for places near the user on the map.
   * @returns An array of Places.
   */
  get nearUser(): Observable<IPlace[]> {
    return this._nearUser.asObservable();
  }

  /**
   * Searches the database for 
   * @param id 
   * @returns 
   */
  public findById(id: string): Observable<IPlace> {
    return this._fbDB.object('/places/' + id).valueChanges().map((event: IPlace) => ({ $key: id, ...event }));
  }

  private _geoFetch(coords: LatLngLiteral, radius: number, store: BehaviorSubject<IPlace[]>): void {
    const max = 100;
    this._geoFire.query({
      center: [coords.lat, coords.lng],
      radius: radius
    }).on('key_entered', (key: string, result: IPlace) => {
      result.$key = key;
      let places: IPlace[] = [...store.value];
      if (places.find((place: IPlace) => place.$key === result.$key)) { return; }
      places.push(result);
      places.map((place: IPlace) => place.distance = this._geoKit.distance(coords, place.coordinates, 'miles'));
      places = this._quicksort(places);
      if (places.length > max) { places = places.slice(max); }
      store.next(places);
    });
  }

  /**
   * Sorting algorithm that arranges locations by distance from the user.
   * @param c Array of places to sort.
   * @returns
   */
  private _quicksort(c: IPlace[]): IPlace[] {
    if (c.length <= 1) { return c; }
    const pivot: IPlace = c.pop();
    const less: IPlace[] = [];
    const more: IPlace[] = [];
    c.forEach((val: IPlace) => (pivot.distance > val.distance) ? less.push(val) : more.push(val));
    return [...this._quicksort(less), pivot, ...this._quicksort(more)];
  }
}
