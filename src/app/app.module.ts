import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { environment } from '../environments/environment';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'poptart-fitness' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.google
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
