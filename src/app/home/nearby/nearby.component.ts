import { Component, OnInit, Input, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { EventsService, PlacesService } from '../../core/services';

/**
 * A class for the NearbyComponent
 */
@Component({
  moduleId: module.id,
  selector: 'pop-home-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.scss']
})
export class NearbyComponent implements OnInit {
  private _active = 'Places';
  @Input()
  set active(active: string) {
      switch (active) {
        case 'Events':
          this._items = this._es.nearUser;
          this._active = 'Events';
          break;
        default:
          this._items = this._ps.nearUser;
          this._active = 'Places';
          break;
      }
  }
  private _items: Observable<any[]>;

  /**
   * @param _es EventsService to get all events near center of map.
   * @param _ps PacesService to query places near center of map.
   */
  constructor(private _es: EventsService, private _ps: PlacesService) {
    this._items = this._ps.nearUser;
  }

  ngOnInit() {
  }

  /**
   * Get function for title of current mode: Events, Places.
   * @returns Active title.
   */
  get active(): string {
    return this._active;
  }

  /**
   * Get function for event or place items for list.
   * @returns Observable of items.
   */
  get items(): Observable<any[]> {
    return this._items;
  }
}
