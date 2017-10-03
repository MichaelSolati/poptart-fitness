import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { PlacesService } from '../core/services';

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

  constructor(private _ps: PlacesService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._idSubscription = this._route.params.subscribe(params => {
      const id = params['id'];
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
