import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { PlaceRoutingModule } from './place-routing.module';
import { PlaceComponent } from './place.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PlaceRoutingModule
  ],
  declarations: [PlaceComponent]
})
export class PlaceModule { }
