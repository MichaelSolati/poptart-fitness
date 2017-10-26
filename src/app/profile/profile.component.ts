import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/first';

import { ProfilesService, UserService } from '../core/services';

/**
 * A component for the ProfileComponent
 */
@Component({
  moduleId: module.id,
  selector: 'pop-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private _idSubscription: Subscription;
  private _user: Observable<any>;

  /**
   * @param _location Location is a service that applications can use to interact with a browser's URL.
   * @param _us Service that provides current user object.
   * @param _ps Service that provides profile of a user as an object.
   * @param _route Contains the information about a route associated with a component loaded in an outlet.
   */
  constructor(private _location: Location, private _us: UserService,
    private _ps: ProfilesService, private _route: ActivatedRoute) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Subscribes to route to see if id exists, if not gets current user profile, otherwise gets profile of id.
   */
  ngOnInit() {
    this._idSubscription = this._route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this._user = this._ps.findProfile(id);
      } else {
        this._us.user.first().subscribe(user => {
          this._user = this._ps.findProfile(user.uid);
        });
      }
    });
  }

  /**
   * Lifecycle hook that is called when a directive, pipe or service is destroyed.
   * Kills subscription to route params.
   */
  ngOnDestroy() {
    this._idSubscription.unsubscribe();
  }

  /**
   * Get function for events attended by user.
   * @returns Observable of events attended by user.
   */
  get eventsAttended(): Observable<any> {
    return this._ps.eventsAttended;
  }

  /**
   * Get function for events created by user.
   * @returns Observable of events created by user.
   */
  get eventsCreated(): Observable<any> {
    return this._ps.eventsCreated;
  }

  /**
   * Get function for user's profile observable.
   * @returns Observable of user's profile.
   */
  get user(): Observable<any> {
    return this._user;
  }

  /**
   * Determines color of chip based on index.
   * @param index Index of chip.
   * @returns Either primary or accent color string.
   */
  public chipColor(index: number): string {
    if (index === 0) {
      return 'primary';
    } else if (index === 1) {
      return 'accent';
    }
  }

  /**
   * Navigates back in the platform's history.
   */
  public goBack(): void {
    this._location.back();
  }

  /**
   * Sorts activities array of profile by count.
   * @param activities Activities of user's profile.
   * @returns Sorted array.
   */
  public rankActivities(activities: any[]): any[] {
    if (!Array.isArray(activities)) { return; }
    return activities.sort((a: any, b: any) => b.count - a.count);
  }
}
