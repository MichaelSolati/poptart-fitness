import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'pop-place-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
  private _event: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private _place: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private _dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) private _data: any) {
    this._event.next(this._data.event);
    this._place.next(this._data.place);
  }

  ngOnInit() {
  }

  get event(): Observable<any> {
    return this._event.asObservable();
  }

  get place(): Observable<any> {
    return this._place.asObservable();
  }

  public close(result?: any): void {
    this._dialogRef.close(result);
  }
}
