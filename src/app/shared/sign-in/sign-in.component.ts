import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { UserService } from '../../core/services';

/**
 * A component for the SignInComponent
 */
@Component({
  moduleId: module.id,
  selector: 'pop-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
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
   * Signs the user in to their profile using Google, Facebook, or Twitter.
   * @param account Type of account to attempt to sign in to.
   */
  public signIn(account: string): void {
    switch (account) {
      case 'facebook':
        this._us.signInFacebook((error: Error, success: any) => {
          if (error) {
            this._snackBar.open(error.message, null, { duration: 3000 });
          } else {
            this._snackBar.open('Welcome ' + success.user.displayName, null, { duration: 3000 });
            this._router.navigate(['/', 'home']);
          }
        });
        break;
      case 'twitter':
        this._us.signInTwitter((error: Error, success: any) => {
          if (error) {
            this._snackBar.open(error.message, null, { duration: 3000 });
          } else {
            this._snackBar.open('Welcome ' + success.user.displayName, null, { duration: 3000 });
            this._router.navigate(['/', 'home']);
          }
        });
        break;
      default:
        this._us.signInGoogle((error: Error, success: any) => {
          if (error) {
            this._snackBar.open(error.message, null, { duration: 3000 });
          } else {
            this._snackBar.open('Welcome ' + success.user.displayName, null, { duration: 3000 });
            this._router.navigate(['/', 'home']);
          }
        });
        break;
    }
  }
}
