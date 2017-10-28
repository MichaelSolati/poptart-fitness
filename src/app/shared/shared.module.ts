import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL } from './material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { SignInComponent } from './sign-in/sign-in.component';
import { DistancePipe } from './pipes/distance.pipe';
import { FixedPipe } from './pipes/fixed.pipe';
import { ActivityPipe } from './pipes/activity.pipe';

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    AgmCoreModule
  ],
  declarations: [
    SignInComponent,
    DistancePipe,
    FixedPipe,
    ActivityPipe
  ],
  exports: [
    ...MATERIAL,
    FlexLayoutModule,
    ReactiveFormsModule,
    AgmCoreModule,
    SignInComponent,
    DistancePipe,
    FixedPipe,
    ActivityPipe
  ]
})
export class SharedModule { }
