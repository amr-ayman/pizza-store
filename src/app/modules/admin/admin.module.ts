import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {ProductListComponent, ProductViewComponent} from './pages';
import {AdminRoutingModule} from './admin-routing.module';

@NgModule({
  declarations: [ProductListComponent, ProductViewComponent],
  imports: [
    RouterModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule {
}
