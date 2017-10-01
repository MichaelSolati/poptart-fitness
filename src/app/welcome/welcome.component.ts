import { Component, OnInit } from '@angular/core';
import { LocationService } from '../core/services';
import { Observable } from 'rxjs/Observable';
import { LatLngLiteral } from '@agm/core';

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
