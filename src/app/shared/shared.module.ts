import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL } from './material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: environment.google
    })
  ],
  declarations: [],
  exports: [
    ...MATERIAL,
    FlexLayoutModule,
    ReactiveFormsModule,
    AgmCoreModule
  ]
})
export class SharedModule { }
