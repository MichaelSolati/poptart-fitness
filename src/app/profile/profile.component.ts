import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ProfilesService } from '../core/services';
import { BadgesService, IBadge } from '../core/services/badges.service';

@Component({
  moduleId: module.id,
  selector: 'pop-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private _idSubscription: Subscription;

  private _activities: any[] = [
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

  private _user: Observable<any>;
  private _badges: Observable<IBadge[]>;

  get badges() {
    return this._badges;
  }

  get user() {
    return this._user;
  }

  constructor(private _ps: ProfilesService, private _bs: BadgesService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._idSubscription = this._route.params.subscribe(params => {
      const id = params['id'] || 'aHeEWULkZYN7fQXl9ZHBprTNuMD2';
      this._user = this._ps.findProfile(id);
      this._badges = this._bs.findBadges(id);
    });
  }

}
