import { Component, OnInit } from '@angular/core';

  /**
   * A component for the HomeComponent
   */
@Component({
  moduleId: module.id,
  selector: 'pop-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit() {
  }
}
