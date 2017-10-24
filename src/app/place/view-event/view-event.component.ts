import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { ProfilesService } from '../../core/services/profiles.service';
import { EventsService } from '../../core/services/events.service';

/**
 * A class for the ViewEventComponent
 */
@Component({
  moduleId: module.id,
  selector: 'pop-place-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
  private _event: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private _place: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private _profile: Observable<any>;

  /**
   * @param _dialogRef Reference to a dialog opened via the MatDialog service.
   * @param _data Data passed into modal.
   * @param _ps ProfileService that allows querying of public profile.
   * @param _es EventService that allows checking in of events.
   */
  constructor(private _dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) private _data: any,
              private _ps: ProfilesService, private _es: EventsService) {
    this._event.next(this._data.event);
    this._place.next(this._data.place);
    this._profile = this._ps.findProfile(this._data.event.uid);
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit() {
  }

  /**
   * Get function for event observable.
   * @returns Observable of event.
   */
  get event(): Observable<any> {
    return this._event.asObservable();
  }

  /**
   * Get function for place observable.
   * @returns Observable of place.
   */
  get place(): Observable<any> {
    return this._place.asObservable();
  }

  /**
   * Get function for profile observable.
   * @returns Observable of profile.
   */
  get profile(): Observable<any> {
    return this._profile;
  }

  /**
   * Allows user to check in to an event.
   */
  public checkIn(): void {
    this._es.checkIn(this._data.event.key);
  }

  /**
   * Closes modal.
   * @param result Information to pass back.
   */
  public close(result?: any): void {
    this._dialogRef.close(result);
  }
}
