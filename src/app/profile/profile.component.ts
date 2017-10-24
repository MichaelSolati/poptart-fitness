import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/first';

import { ProfilesService, UserService } from '../core/services';
import { ActivitiesService, IActivity } from '../core/services/activities.service';
import { BadgesService, IBadge } from '../core/services/badges.service';

/**
 * A component for the Profile
 */
@Component({
  moduleId: module.id,
  selector: 'pop-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private _idSubscription: Subscription;
  private _user: Observable<any>;
  private _badges: Observable<IBadge[]>;
  private _activities: Observable<IActivity[]>;

  private _testactivities: any[] = [
    { name: 'Walking', amount: 1 },
    { name: 'Jogging', amount: 1 },
    { name: 'Running', amount: 1 },
    { name: 'Hiking', amount: 1 },
    { name: 'Swimming', amount: 1 },
    { name: 'Yoga', amount: 1 },
    { name: 'Camping-Outdoors', amount: 1 },
    { name: 'Camping-Indoors', amount: 1 },
    { name: 'Camping-Underwater', amount: 1 },
  ];

  private calculateBadgeProgress() {
  }

  get badges() {
    return this._badges;
  }

  get user() {
    return this._user;
  }

  get testactivities() {
    return this._testactivities;
  }

  public goBack(): void {
    this._location.back();
  }

  /**
   * @param _location Provides the 
   * @param _us Provides the navigation and url manipulation capabilities.
   * @param _ps Provides the profile interaction with the fire batadase?...
   * @param _route Provides the route services for 
   */
  constructor(private _location: Location, private _us: UserService,
              private _ps: ProfilesService, private _route: ActivatedRoute) { }

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

}
