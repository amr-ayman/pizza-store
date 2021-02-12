import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Error403Component, Error404Component, Error500Component} from './pages';

export const errorsRoutes: Routes = [
  {
    path: '',
    children: [
      {path: '403', component: Error403Component},
      {path: '404', component: Error404Component},
      {path: '500', component: Error500Component},
      {path: '', redirectTo: '404', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(errorsRoutes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule {
}
