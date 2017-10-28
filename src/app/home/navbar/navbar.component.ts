import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSidenav } from '@angular/material';

import { UserService } from '../../core/services';

/**
 * A class for the NavbarComponent
 */
@Component({
  moduleId: module.id,
  selector: 'pop-home-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private _active = 'Places';
  @Output() activeOutput: EventEmitter<string> = new EventEmitter<string>();
  private _goodBye: string[] = ['Au Revouir!', 'Bon Voyage!', 'Adios!', 'Auf Wiedersehen!'];
  @ViewChild('sidenav') sidenav: MatSidenav;

  /**
   * @param _router Provides the navigation and url manipulation capabilities.
   * @param _snackBar Service to dispatch Material Design snack bar messages.
   * @param _us Service that provides current user object.
   */
  constructor(private _router: Router, private _snackBar: MatSnackBar, private _us: UserService) { }

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

  /**
   * Set function to assign value of if places or events is active.
   * @param active Active state as string.
   */
  set active(active: string) {
    this._active = active;
    this.activeOutput.emit(active);
  }

  /**
   * Toggles navbar being open or closed.
   */
  public navToggle(): void {
    this.sidenav.toggle();
  }

  /**
   * Signs a user out of application, routes them to '/'.
   */
  public signOut(): void {
    this._us.signOut((error: Error) => {
      const message: string = this._goodBye[Math.round(Math.random() * this._goodBye.length)];
      this._snackBar.open(message, null, { duration: 3000 });
      this._router.navigate(['/']);
    });
  }
}
