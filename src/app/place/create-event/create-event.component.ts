import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { EventsService } from '../../core/services';

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
  private _place: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private _starts: Date;
  private _today: Date = new Date();

  constructor(
    private _dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) private _data: any,
    private _es: EventsService, private _snackBar: MatSnackBar
  ) {
    this._place.next(this._data.place);
    this.starts = this._today;
  }

  ngOnInit() {
  }

  get activity(): string {
    return this._activity;
  }

  get ends(): Date {
    return this._ends;
  }

  get place(): Observable<any> {
    return this._place.asObservable();
  }

  get starts(): Date {
    return this._starts;
  }

  get today(): Date {
    return this._today;
  }

  set activity(activity: string) {
    this._activity = activity;
  }

  set description(description: string) {
    this._description = description;
  }

  set ends(ends: Date) {
    if (!ends) { return; }
    this._ends = ends;
  }

  set starts(starts: Date) {
    if (!starts) { return; }
    this._starts = starts;
    this._ends = starts;
  }

  public close(result?: any): void {
    this._dialogRef.close(result);
  }

  public create(): void {
    this._place.first().subscribe((place: any) => {
      const event: any = {
        starts: this._starts.getTime(),
        ends: this._ends.getTime(),
        activity: this._activity,
        description: this._description,
        hash: place.hash,
        placeId: place.id,
        coordinates: place.coordinates
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
