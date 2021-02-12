import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {ErrorsRoutingModule} from './errors-routing.module';
import {ErrorPageComponent, Error403Component, Error404Component, Error500Component} from './pages';

@NgModule({
  declarations: [
    Error403Component,
    Error404Component,
    Error500Component,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule {
}
