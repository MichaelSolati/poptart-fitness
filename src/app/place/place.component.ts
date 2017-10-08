import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogRef } from '@angular/material';
import 'rxjs/add/operator/first';

import { PlacesService, UserService } from '../core/services';

import { CreateEventComponent } from './create-event/create-event.component';

@Component({
  moduleId: module.id,
  selector: 'pop-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit, OnDestroy {
  private _opened: boolean;
  private _place: Observable<any>;
  private _idSubscription: Subscription;

  constructor(
    private _dialog: MatDialog, private _location: Location,
    private _ps: PlacesService, private _route: ActivatedRoute, private _us: UserService
  ) { }

  ngOnInit() {
    this._idSubscription = this._route.params.subscribe((params: any) => {
      const id: string = params['id'];
      this._place = this._ps.findById(id);
    });
  }

  ngOnDestroy() {
    this._idSubscription.unsubscribe();
  }

  get opened(): boolean {
    return this._opened;
  }

  get place(): Observable<any> {
    return this._place;
  }

  get user(): Observable<any> {
    return this._us.user;
  }

  public chip(index: number): string {
    let color: string;
    switch (index) {
      case 0:
        color = 'primary';
        break;
      case 1:
        color = 'accent';
        break;
      default:
        break;
    }
    return color;
  }

  public createEvent(): void {
    this.place.first().subscribe((place: any) => {
      const dialogRef: MatDialogRef<CreateEventComponent> = this._dialog.open(CreateEventComponent, {
        width: '400px',
        data: { place: place }
      });
      // dialogRef.afterClosed().subscribe((result: any) => {
      //   console.log(result);
      // });
    });
  }

  public goBack(): void {
    this._location.back();
  }

  public open(): void {
    this._opened = true;
  }

  public toggle(): void {
    this._opened = !this.opened;
  }

  public close(): void {
    this._opened = false;
  }
}
