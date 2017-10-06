import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import * as GeoFire from '../classes/geofire.js';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LatLngLiteral } from '@agm/core';

import { LocationService } from './location.service';

@Injectable()
export class PlacesService {
  private _dbRef: any;
  private _geoFire: any;
  private _nearBy: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private _fbDB: AngularFireDatabase, private _ls: LocationService) {
    this._dbRef = firebase.database().ref('places');
    this._geoFire = new GeoFire(this._dbRef);
    this._ls.mapCenter.subscribe((coords: LatLngLiteral) => {
      this._geoFetch(coords, 8);
    });
  }

  get nearBy(): Observable<any[]> {
    return this._nearBy.asObservable();
  }

  public findById(id: string): Observable<any> {
    return this._fbDB.object('/places/' + id).valueChanges();
  }

  private _geoFetch(coords: LatLngLiteral, radius: number): void {
    const max = 100;
    this._geoFire.query({
      center: [coords.lat, coords.lng],
      radius: radius
    }).on('key_entered', (key: string, result: any) => {
      let places: any[] = [...this._nearBy.value];
      places.push(result);
      places = places.filter((a: any, i: number, self: any[]) => self.findIndex((b: any) => b.id === a.id) === i);
      if (places.length > max) { places = places.slice(places.length - max, places.length); }
      this._nearBy.next(places);
    });
  }
}
