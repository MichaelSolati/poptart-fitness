import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PlacesService } from '../services';

@Injectable()
export class PlaceGuard implements CanActivate {
  constructor(private _ps: PlacesService, private _router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._ps.findById(next.params.id)
      .map((place: any) => {
        if (place['$value'] === null) {
          this._router.navigate(['/', 'home']);
          return false;
        }
        return true;
      })
      .catch((error: any) => {
        this._router.navigate(['/', 'home']);
        return Observable.of(false);
      });
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(next, state);
  }
}
