import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSidenav } from '@angular/material';

import { UserService } from '../../core/services';

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

  constructor(private _router: Router, private _snackBar: MatSnackBar, private _us: UserService) { }

  ngOnInit() {
  }

  get active(): string {
    return this._active;
  }

  set active(active: string) {
    this._active = active;
    this.activeOutput.emit(active);
  }

  public navToggle(): void {
    this.sidenav.toggle();
  }

  public signOut(): void {
    this._us.signOut((error: Error) => {
      const message: string = this._goodBye[Math.round(Math.random() * this._goodBye.length)];
      this._snackBar.open(message, null, { duration: 3000 });
      this._router.navigate(['/']);
    });
  }
}
