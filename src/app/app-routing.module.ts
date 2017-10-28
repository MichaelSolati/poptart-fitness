import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { UserGuard, NoUserGuard, PlaceGuard, ProfileGuard } from './core/guards';

const routes: Routes = [{
  path: '',
  loadChildren: 'app/welcome/welcome.module#WelcomeModule',
  canActivateChild: [NoUserGuard]
}, {
  path: 'home',
  loadChildren: 'app/home/home.module#HomeModule',
  canActivateChild: [UserGuard]
}, {
  path: 'place',
  loadChildren: 'app/place/place.module#PlaceModule',
  canActivateChild: [PlaceGuard]
}, {
  path: 'profile',
  loadChildren: 'app/profile/profile.module#ProfileModule',
  canActivateChild: [ProfileGuard]
}, {
  path: '**',
  redirectTo: '/'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
