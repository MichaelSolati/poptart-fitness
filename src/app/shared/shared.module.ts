import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MATERIAL } from './material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { environment } from '../../environments/environment';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: environment.google
    }),
  ],
  declarations: [ SignInComponent ],
  exports: [
    ...MATERIAL,
    FlexLayoutModule,
    ReactiveFormsModule,
    AgmCoreModule,
    SignInComponent
  ]
})
export class SharedModule { }
