import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogRef } from '@angular/material';
import 'rxjs/add/operator/first';

import { EventsService, PlacesService, UserService, LocationService, IEvent, IPlace, IUser, LatLngLiteral } from '../core/services';

import { CreateEventComponent } from './create-event/create-event.component';
import { ViewEventComponent } from './view-event/view-event.component';

/**
 * A class for the PlaceComponent
 */
@Component({
  moduleId: module.id,
  selector: 'pop-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit, OnDestroy {
  private _events: Observable<IEvent[]>;
  private _idSubscription: Subscription;
  private _opened: boolean;
  private _place: Observable<IPlace>;

  /**
   * @param _dialog Service to open Material Design modal dialogs.
   * @param _es EventsService to get all events at place in the route params.
   * @param _location Location is a service that applications can use to interact with a browser's URL.
   * @param _ls LocationService to keep track of user's location and center of map.
   * @param _ps PacesService to query place in route params.
   * @param _route Contains the information about a route associated with a component loaded in an outlet.
   * @param _us User service for information about current user.
   */
  constructor(
    private _dialog: MatDialog, private _es: EventsService, private _location: Location, private _ls: LocationService,
    private _ps: PlacesService, private _route: ActivatedRoute, private _us: UserService
  ) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Grab id of place from route params, then query for place and events in that place.
   * Also check if there is a route fragment for an event to open modal immediatley with event.
   */
  ngOnInit() {
    this._idSubscription = this._route.params.subscribe((params: Params) => {
      const id: string = params['id'];
      this._place = this._ps.findById(id);
      this._events = this._es.locationEvents(id);
      this._route.fragment.first().subscribe((fragment: string) => {
        if (!fragment) { return; }
        this._es.findById(fragment).first().subscribe((event: IEvent) => {
          if (!event) { return; }
          this.viewEvent(event);
        });
      });
    });
  }

  /**
   * Lifecycle hook that is called when a directive, pipe or service is destroyed.
   * Kills subscription to route params.
   */
  ngOnDestroy() {
    this._idSubscription.unsubscribe();
  }

  /**
   * Get function for LatLngLiteral of user's location.
   * @returns Observable of user's location as LatLngLiteral.
   */
  get coordsUser(): Observable<LatLngLiteral> {
    return this._ls.coordinates;
  }

  /**
   * Get function for events observable.
   * @returns Observable of events.
   */
  get events(): Observable<IEvent[]> {
    return this._events;
  }

  /**
   * Get if card is opened on mobile.
   * @returns Flag of if card is opened on mobile.
   */
  get opened(): boolean {
    return this._opened;
  }

  /**
   * Get function for place observable.
   * @returns Observable of place.
   */
  get place(): Observable<IPlace> {
    return this._place;
  }

  /**
   * Get function for user profile observable.
   * @returns Observable of users profile.
   */
  get user(): Observable<IUser> {
    return this._us.user;
  }

  /**
   * Determines color of chip based on index.
   * @param index Index of chip.
   * @returns Either primary or accent color string.
   */
  public chipColor(index: number): string {
    if (index === 0) {
      return 'primary';
    } else if (index === 1) {
      return 'accent';
    }
  }

  /**
   * Sets flag of if card is opened on mobile to false.
   */
  public close(): void {
    this._opened = false;
  }

  /**
   * Opens modal to create an event.
   */
  public createEvent(): void {
    this.place.first().subscribe((place: any) => {
      this._dialog.open(CreateEventComponent, { data: { place: place } });
    });
  }

  /**
   * Navigates back in the platform's history.
   */
  public goBack(): void {
    this._location.back();
  }

  /**
   * Sets flag of if card is opened on mobile to true.
   */
  public open(): void {
    this._opened = true;
  }

  /**
   * Toggles flag of if card is opened on mobile.
   */
  public toggle(): void {
    this._opened = !this.opened;
  }

  /**
   * Opens modal to view an event.
   */
  public viewEvent(event: IEvent): void {
    this.place.first().subscribe((place: IPlace) => {
      this._dialog.open(ViewEventComponent, { data: { event: event, place: place } });
    });
  }
}
