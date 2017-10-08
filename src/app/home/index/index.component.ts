import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'pop-home-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  private _active: string;
  @Input()
  set active(active: string) {
    this._active = active;
  }
  constructor() { }

  ngOnInit() {
  }

  get active(): string {
    return this._active;
  }
}
