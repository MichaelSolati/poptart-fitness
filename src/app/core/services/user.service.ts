import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

/**
 * A class for the UserService
 */
@Injectable()
export class UserService {
  private _user: Observable<any>;

  /**
   * @param _fbAuth The Firebase Auth service.
   */
  constructor(private _fbAuth: AngularFireAuth) {
    this._user = this._fbAuth.authState;
  }

  /**
   * Getter for user auth object.
   * @returns User auth object as observable.
   */
  get user(): Observable<any> {
    return this._user;
  }

  /**
   * Signs user in with any social auth provider Firebase provides.
   * @param provider Firebase auth provider.
   * @param callback Optional function to execute after sign in is complete.
   */
  private _signIn(provider: any, callback?: any): void {
    this._fbAuth.auth.signInWithPopup(provider).then((result: any) => {
      if (callback) { callback(null, result); }
    }).catch((error: Error) => {
      if (callback) { callback(error, null); }
    });
  }

  /**
   * Signs user in with Facebook.
   * @param callback Optional function to execute after sign in is complete.
   */
  public signInFacebook(callback?: any): void {
    const provider = new firebase.auth.FacebookAuthProvider();
    this._signIn(provider, (error: Error, result: any) => {
      if (callback) { callback(error, result); }
    });
  }

  /**
   * Signs user in with Google.
   * @param callback Optional function to execute after sign in is complete.
   */
  public signInGoogle(callback?: any): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    this._signIn(provider, (error: Error, result: any) => {
      if (callback) { callback(error, result); }
    });
  }

  /**
   * Signs user in with Twitter.
   * @param callback Optional function to execute after sign in is complete.
   */
  public signInTwitter(callback?: any): void {
    const provider = new firebase.auth.TwitterAuthProvider();
    this._signIn(provider, (error: Error, result: any) => {
      if (callback) { callback(error, result); }
    });
  }

  /**
   * Signs user out of application.
   * @param callback Optional function to execute after sign out is complete.
   */
  public signOut(callback?: any): void {
    this._fbAuth.auth.signOut()
      .then((result: any) => {
        callback(null, result);
      }).catch((error: Error) => {
        callback(error, null);
      });
  }
}
