import { Component, OnInit, Input } from '@angular/core';

/**
 * A class for the IndexComponent
 */
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

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit() {
  }

  /**
   * Get function to check if places or events are active.
   * @returns Active state as string.
   */
  get active(): string {
    return this._active;
  }
}
