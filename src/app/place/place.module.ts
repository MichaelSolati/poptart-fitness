import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { PlaceRoutingModule } from './place-routing.module';
import { PlaceComponent } from './place.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ViewEventComponent } from './view-event/view-event.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PlaceRoutingModule
  ],
  declarations: [
    PlaceComponent,
    CreateEventComponent,
    ViewEventComponent
  ],
  entryComponents: [
    CreateEventComponent,
    ViewEventComponent
  ]
})
export class PlaceModule { }
