import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { ExploreComponent } from './explore/explore.component';
import { NearbyComponent } from './nearby/nearby.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    NavbarComponent,
    IndexComponent,
    ExploreComponent,
    NearbyComponent
  ]
})
export class HomeModule { }
