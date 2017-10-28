import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LatLngLiteral } from '@agm/core';
import { Geokit } from 'geokit';
import 'rxjs/add/operator/first';

import { EventsService, LocationService, PlacesService } from '../../core/services';

/**
 * A class for the ExploreComponent
 */
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

  /**
   * @param _es EventsService to get all events near center of map.
   * @param _ls LocationService to keep track of user's location and center of map.
   * @param _ps PacesService to query places near center of map.
   * @param _router Provides the navigation and url manipulation capabilities.
   */
  constructor(private _es: EventsService, private _ls: LocationService, private _ps: PlacesService, private _router: Router) {
    this._markers = this._ps.nearMapCenter;
  }


  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit() {
  }

  /**
   * Lifecycle hook that is called when a directive, pipe or service is destroyed.
   * Enables updating of center of map by users location.
   */
  ngOnDestroy() {
    this._ls.updatingStart();
  }

  /**
   * Get function for LatLngLiteral of center of map.
   * @returns Observable of center of map as LatLngLiteral.
   */
  get coordsMap(): Observable<LatLngLiteral> {
    return this._ls.mapCenter;
  }

  /**
   * Get function for LatLngLiteral of user's location.
   * @returns Observable of user's location as LatLngLiteral.
   */
  get coordsUser(): Observable<LatLngLiteral> {
    return this._ls.coordinates;
  }

  /**
   * Get function for events or places markers for map.
   * @returns Observable of markers.
   */
  get markers(): Observable<any[]> {
    return this._markers;
  }

  /**
   * Get function for if center of map is updated by user's location.
   * @returns Flag of if map being updated by user's location.
   */
  get updating(): Observable<boolean> {
    return this._ls.updating;
  }

  /**
   * Updates center of map observable if the center has changed by more than 0.05 km.
   * @param coordinates Coordinates of center of the map.
   */
  public centerChange(coordinates: LatLngLiteral): void {
    this._lastLocation = coordinates;

    this.coordsUser.first().subscribe((coords: LatLngLiteral) => {
      if (this._geoKit.distance(coordinates, coords) > 0.05) { this._ls.updateMapCenter(this._lastLocation); }
    });
  }

  /**
   * Navigate user to place page of marker.
   * @param marker Marker object.
   */
  public markerClick(marker: any): void {
    if (marker.placeId) {
      this._router.navigate(['/', 'place', marker.placeId], { fragment: marker.$key });
    } else {
      this._router.navigate(['/', 'place', marker.$key]);
    }
  }

  /**
   * Disables updating of map center based on user's location if map is swiped.
   * @param event Swipe event.
   */
  public swipe(event: any): void {
    this._ls.updatingStop();
  }

  /**
   * Toggles if map center is being updated by user location.
   */
  public toggleWatch(): void {
    this._ls.updating.first().subscribe((state: boolean) => {
      (state) ? this._ls.updatingStop() : this._ls.updatingStart();
    });
  }

  /**
   * Determines element to track markers by.
   * @param index Index in array of markers.
   * @param item Object of marker.
   * @returns Id of marker to track by.
   */
  public trackByFn(index: number, item: any): string {
    return item.id;
  }
}
