import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LatLngLiteral } from '@agm/core';
import { Geokit } from 'geokit';
import 'rxjs/add/operator/first';

import { EventsService, LocationService, PlacesService } from '../../core/services';

@Component({
  moduleId: module.id,
  selector: 'pop-home-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, OnDestroy {
  @Input()
  set active(active: string) {
    switch (active) {
      case 'Events':
        this._markers = this._es.nearMapCenter;
        break;
      default:
        this._markers = this._ps.nearMapCenter;
        break;
    }
  }
  private _lastLocation: LatLngLiteral = { lat: 0, lng: 0 };
  private _geoKit: Geokit = new Geokit();
  private _markers: Observable<any[]>;

  constructor(private _es: EventsService, private _ls: LocationService, private _ps: PlacesService, private _router: Router) {
    this._markers = this._ps.nearMapCenter;
  }

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

  get markers(): Observable<any[]> {
    return this._markers;
  }

  get updating(): Observable<boolean> {
    return this._ls.updating;
  }

  public centerChange(coordinates: LatLngLiteral): void {
    this._lastLocation = coordinates;

    this.coordsUser.first().subscribe((coords: LatLngLiteral) => {
      if (this._geoKit.distance(coordinates, coords) > 0.05) { this._ls.updateMapCenter(this._lastLocation); }
    });
  }

  public markerClick(marker: any): void {
    if (marker.id) {
      this._router.navigate(['/', 'place', marker.id]);
    } else if (marker.placeId) {
      this._router.navigate(['/', 'place', marker.placeId]);
    }
  }

  public toggleWatch(): void {
    this._ls.updating.first().subscribe((state: boolean) => {
      (state) ? this._ls.updatingStop() : this._ls.updatingStart();
    });
  }

  public trackByFn(index: number, item: any): string {
    return item.id;
  }
}
