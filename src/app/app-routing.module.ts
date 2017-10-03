import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: 'app/welcome/welcome.module#WelcomeModule'
}, {
  path: 'home',
  loadChildren: 'app/home/home.module#HomeModule'
}, {
  path: 'profile',
  loadChildren: 'app/profile/profile.module#ProfileModule'
}, {
  path: '**',
  redirectTo: '/'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
