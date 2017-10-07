import { Pipe, PipeTransform } from '@angular/core';
import { Geokit, LatLngLiteral } from 'geokit';
import { Observable } from 'rxjs/Observable';

import { LocationService } from '../../core/services';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {
  constructor (private _ls: LocationService) {}

  transform(value: LatLngLiteral, args?: any): Observable<string> {
    return this._ls.coordinates.map((user: LatLngLiteral) => new Geokit().distance(user, value, 'miles').toFixed(1));
  }
}
