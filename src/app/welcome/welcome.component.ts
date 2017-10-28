import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LocationService, LatLngLiteral } from '../core/services';

@Component({
  moduleId: module.id,
  selector: 'pop-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  constructor(private _locService: LocationService) { }

  ngOnInit() {
  }

  get coordinates(): Observable<LatLngLiteral> {
    return this._locService.mapCenter;
  }
}
