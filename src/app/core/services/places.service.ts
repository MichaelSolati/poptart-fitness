import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import * as GeoFire from '../classes/geofire.js';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LatLngLiteral } from '@agm/core';
import { Geokit } from 'geokit';

import { LocationService } from './location.service';

@Injectable()
export class PlacesService {
  private _dbRef: any;
  private _geoFire: any;
  private _geoKit: Geokit = new Geokit();
  private _nearMapCenter: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private _nearUser: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

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

  get nearMapCenter(): Observable<any[]> {
    return this._nearMapCenter.asObservable();
  }

  get nearUser(): Observable<any[]> {
    return this._nearUser.asObservable();
  }

  public findById(id: string): Observable<any> {
    return this._fbDB.object('/places/' + id).valueChanges();
  }

  private _geoFetch(coords: LatLngLiteral, radius: number, store: BehaviorSubject<any[]>): void {
    const max = 100;
    this._geoFire.query({
      center: [coords.lat, coords.lng],
      radius: radius
    }).on('key_entered', (key: string, result: any) => {
      let places: any[] = [...store.value];
      if (places.find((place: any) => place.id === result.id)) { return; }
      places.push(result);
      places.map((place: any) => place.distance = this._geoKit.distance(coords, place.coordinates, 'miles'));
      places = this._quicksort(places);
      if (places.length > max) { places = places.slice(max); }
      store.next(places);
    });
  }

  private _quicksort(c: any[]): any[] {
    if (c.length <= 1) { return c; }
    const pivot: any = c.pop();
    const less: any[] = [];
    const more: any[] = [];
    c.forEach((val: any) => (pivot.distance > val.distance) ? less.push(val) : more.push(val));
    return [...this._quicksort(less), pivot, ...this._quicksort(more)];
  }
}
