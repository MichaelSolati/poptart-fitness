import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PlacesService } from '../services';

/**
 * A class for the PlaceGuard
 */
@Injectable()
export class PlaceGuard implements CanActivate {
  /**
   * @param _ps PlaceService that provides information on if a place exists in Firebase.
   * @param _router Provides the navigation and url manipulation capabilities.
   */
  constructor(private _ps: PlacesService, private _router: Router) { }

  /**
   * Checks if place exists, if it does allow user to visit, otherwise redirect.
   * @param next Contains the information about a route associated with a component loaded in an outlet at a particular moment in time.
   * @param state Represents the state of the router at a moment in time.
   * @returns Boolean if user can navigate to a route. Will redirect if user may not visit.
   */
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

  /**
   * Determine if user can visit child route by passing to canActivate function.
   * @param next Contains the information about a route associated with a component loaded in an outlet at a particular moment in time.
   * @param state Represents the state of the router at a moment in time.
   * @returns Boolean if user can navigate to a route. Will redirect if user may not visit.
   */
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(next, state);
  }
}
