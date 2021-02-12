import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {StoreComponent, CartComponent} from './pages';
import {StoreRoutingModule} from './store-routing.module';

@NgModule({
  declarations: [StoreComponent, CartComponent],
  imports: [
    RouterModule,
    StoreRoutingModule,
    SharedModule
  ]
})
export class StoreModule {
}
