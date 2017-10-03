import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LatLngLiteral } from '@agm/core';
import 'rxjs/add/operator/first';

import { LocationService, PlacesService } from '../../core/services';

@Component({
  moduleId: module.id,
  selector: 'pop-home-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  constructor(private _ls: LocationService, private _ps: PlacesService, private _router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._ls.updatingStart();
  }

  get coordsMap(): Observable<LatLngLiteral> {
    return this._ls.mapCenter;
  }

  get coordsUser(): Observable<LatLngLiteral> {
    return this._ls.coordinates;
  }

  get nearBy(): Observable<any[]> {
    return this._ps.nearBy;
  }

  get updating(): Observable<boolean> {
    return this._ls.updating;
  }

  public centerChange(coordinates: LatLngLiteral): void {
    this._ls.updateMapCenter(coordinates);
  }

  public markerClick(id: string): void {
    this._router.navigate(['/', 'place', id]);
  }

  public swipe(event: any): void {
    this._ls.updatingStop();
  }

  public toggleWatch(): void {
    this._ls.updating.first().subscribe((state: boolean) => {
      (state) ? this._ls.updatingStop() : this._ls.updatingStart();
    });
  }
}
