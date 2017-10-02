import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as GeoFire from '../classes/geofire.js';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LatLngLiteral } from '@agm/core';

import { LocationService } from './location.service';

@Injectable()
export class PlacesService {
  private _dbRef: FirebaseListObservable<any[]>;
  private _geoFire: any;
  private _nearBy: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private _fbDB: AngularFireDatabase, private _ls: LocationService) {
    this._dbRef = this._fbDB.list('places');
    this._geoFire = new GeoFire(this._dbRef.$ref);
    this._ls.mapCenter.subscribe((coords: LatLngLiteral) => {
      this._geoFetch(coords, 10);
    });
  }

  get nearBy(): Observable<any[]> {
    return this._nearBy.asObservable();
  }

  private _geoFetch(coords: LatLngLiteral, radius: number): void {
    this._geoFire.query({
      center: [coords.lat, coords.lng],
      radius: radius
    }).on('key_entered', (key: string, result: any) => {
      let places: any[] = this._nearBy.value;
      places.unshift({
        key: key,
        result: result
      });
      if (places.length > 30) { places = places.slice(30); }
      this._nearBy.next(places);
    });
  }
}
