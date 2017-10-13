import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/first';

import { ProfilesService, UserService } from '../core/services';
import { ActivitiesService, IActivity } from '../core/services/activities.service';
import { BadgesService, IBadge } from '../core/services/badges.service';

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
    { name: 'Walking', liked: false },
    { name: 'Jogging', liked: false },
    { name: 'Running', liked: false },
    { name: 'Hiking', liked: false },
    { name: 'Swimming', liked: false },
    { name: 'Yoga', liked: false },
    { name: 'Camping-Outdoors', liked: false },
    { name: 'Camping-Indoors', liked: false },
    { name: 'Camping-Underwater', liked: false },
  ];

  get badges() {
    return this._badges;
  }

  get user() {
    return this._user;
  }

  get activities() {
    return this._activities;
  }

  public goBack(): void {
    this._location.back();
  }

  constructor(private _location: Location, private _us: UserService,
              private _ps: ProfilesService, private _bs: BadgesService,
              private _as: ActivitiesService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._idSubscription = this._route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this._user = this._ps.findProfile(id);
        this._badges = this._bs.findBadges(id);
        this._activities = this._as.findActivities(id);
      } else {
        this._us.user.first().subscribe(user => {
          this._user = this._ps.findProfile(user.uid);
          this._badges = this._bs.findBadges(user.uid);
          this._activities = this._as.findActivities(user.uid);
        });
      }
    });
  }

}
