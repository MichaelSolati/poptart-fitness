import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';

import { ProfilesService, IProfile, UserService, IUser } from '../services';

/**
 * A class for the ProfileGuard
 */
@Injectable()
export class ProfileGuard implements CanActivate {
  /**
   * @param _ps ProfileService that provides profile of a user as an object.
   * @param _router Provides the navigation and url manipulation capabilities.
   * @param _us UserService that provides information on current user.
   */
  constructor(private _ps: ProfilesService, private _router: Router, private _us: UserService) { }

  /**
   * Determine if user can visit profile page, checks if profile exists, or if user is trying to visit their own profile.
   * @param next Contains the information about a route associated with a component loaded in an outlet at a particular moment in time.
   * @param state Represents the state of the router at a moment in time.
   * @returns Boolean if user can navigate to a route. Will redirect if user may not visit.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._ps.findProfile(next.params.id).concatMap((profile: IProfile) => {
      if (profile) {
        return Observable.of(true);
      } else if (!next.params.id) {
        return this._us.user.map((user: IUser) => {
          if (!user) {
            this._router.navigate(['/']);
            return false;
          }
          return true;
        });
      } else {
        this._router.navigate(['/']);
        return Observable.of(false);
      }
    }).catch((error: any) => {
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
