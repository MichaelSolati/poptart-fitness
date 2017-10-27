import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { EventsService, IEvent, IPlace } from '../../core/services';
import { ActivityRename } from '../../core/pipes/activity-rename.pipe';

/**
 * A class for the CreateEventComponent
 */
@Component({
  moduleId: module.id,
  selector: 'pop-place-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  private _activity: string;
  private _description: string;
  private _ends: Date;
  private _place: BehaviorSubject<IPlace> = new BehaviorSubject<IPlace>(null);
  private _starts: Date;
  private _today: Date = new Date();

  /**
   * @param _dialogRef Reference to a dialog opened via the MatDialog service.
   * @param _data Data passed into modal.
   * @param _es EventService that allows checking in of events.
   * @param _snackBar Service to dispatch Material Design snack bar messages.
   */
  constructor(
    private _dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) private _data: any,
    private _es: EventsService, private _snackBar: MatSnackBar
  ) {
    this._place.next(this._data.place);
    this.starts = this._today;
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit() {
  }

  /**
   * Gets activity string for to determine if activity selected.
   * @returns User selected activity.
   */
  get activity(): string {
    return this._activity;
  }

  /**
   * Gets end date for default value of end calendar component.
   * @returns End date of event.
   */
  get ends(): Date {
    return this._ends;
  }

  /**
   * Gets place as observable
   * @returns Observable of place object.
   */
  get place(): Observable<IPlace> {
    return this._place.asObservable();
  }

  /**
   * Gets start date for default value of end calendar component.
   * @returns Start date of event.
   */
  get starts(): Date {
    return this._starts;
  }

  /**
   * Gets Date object of today.
   * @returns Date object of today.
   */
  get today(): Date {
    return this._today;
  }

  /**
    * Sets activity value.
    * @param activity User selected activity string.
    */
  set activity(activity: string) {
    this._activity = activity;
  }

  /**
   * Sets user inputted description.
   * @param description User inputted description string.
   */
  set description(description: string) {
    this._description = description;
  }

  /**
   * Sets end date of event.
   * @param ends User selected end date.
   */
  set ends(ends: Date) {
    if (!ends) { return; }
    this._ends = ends;
  }

  /**
   * Sets start date of event (and ensures end doesn't occur before start).
   * @param starts User selected start date.
   */
  set starts(starts: Date) {
    if (!starts) { return; }
    this._starts = starts;
    this._ends = starts;
  }

  /**
  * Closes modal.
  * @param result Information to pass back.
  */
  public close(result?: any): void {
    this._dialogRef.close(result);
  }

  /**
  * Creates event and closes modal if successful.
  */
  public create(): void {
    this._place.first().subscribe((place: IPlace) => {
      const event: IEvent = {
        starts: this._starts.getTime(),
        ends: this._ends.getTime(),
        activity: this._activity,
        description: this._description,
        hash: place.hash,
        placeId: place.id,
        placeName: place.name,
        coordinates: place.coordinates,
        uid: null
      };
      this._es.create(event, (error: Error, success: any) => {
        if (error) {
          this._snackBar.open(error.message, null, { duration: 3000 });
          return;
        }
        this._snackBar.open('Event at ' + place.name + ' created', null, { duration: 3000 });
        this.close();
      });
    });
  }
}
