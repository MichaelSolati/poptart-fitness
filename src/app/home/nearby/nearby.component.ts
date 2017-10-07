import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PlacesService } from '../../core/services';

@Component({
  moduleId: module.id,
  selector: 'pop-home-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.scss']
})
export class NearbyComponent implements OnInit {

  constructor(private _ps: PlacesService) { }

  ngOnInit() {
  }

  get nearUser(): Observable<any[]> {
    return this._ps.nearUser;
  }
}
