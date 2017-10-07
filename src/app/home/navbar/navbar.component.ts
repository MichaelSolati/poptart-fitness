import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'pop-home-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private _active = 'Places';

  constructor() { }

  ngOnInit() {
  }

  get active(): string {
    return this._active;
  }

  set active(active: string) {
    this._active = active;
  }
}
