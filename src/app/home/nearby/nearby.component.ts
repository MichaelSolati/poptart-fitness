import { Component, OnInit, Input, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { EventsService, PlacesService } from '../../core/services';

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
          this._places = this._es.nearUser;
          this._active = 'Events';
          break;
        default:
          this._places = this._ps.nearUser;
          this._active = 'Places';
          break;
      }
  }
  private _places: Observable<any[]>;

  constructor(private _es: EventsService, private _ps: PlacesService, private _router: Router) {
    this._places = this._ps.nearUser;
  }

  ngOnInit() {
  }

  get active(): string {
    return this._active;
  }

  get places(): Observable<any[]> {
    return this._places;
  }

  public itemClick(item: any): void {
    if (item.id) {
      this._router.navigate(['/', 'place', item.id]);
    } else if (item.placeId) {
      this._router.navigate(['/', 'place', item.placeId]);
    }
  }
}
