import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../core/services';

@Component({
  moduleId: module.id,
  selector: 'pop-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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

  private _user: any;

  get user() {
    return this._user;
  }

  constructor(private _ps: ProfilesService) { }

  ngOnInit() {
    this._user = this._ps.findProfile('aHeEWULkZYN7fQXl9ZHBprTNuMD2');
  }

}
