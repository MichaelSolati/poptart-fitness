import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserService } from '../services';

/**
 * A class for the UserGuard
 */
@Injectable()
export class UserGuard implements CanActivate {
  /**
   * @param _router Provides the navigation and url manipulation capabilities.
   * @param _us UserService that provides information on current user.
   */
  constructor(private _router: Router, private _us: UserService) { }

  /**
   * Determine if user can visit route. If not signed in, redirect them.
   * @param next Contains the information about a route associated with a component loaded in an outlet at a particular moment in time.
   * @param state Represents the state of the router at a moment in time.
   * @returns Boolean if user can navigate to a route. Will redirect if user may not visit.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._us.user
      .map((user: any) => {
        if (!user) {
          this._router.navigate(['/']);
          return false;
        }
        return true;
      })
      .catch((error: any) => {
        this._router.navigate(['/']);
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
