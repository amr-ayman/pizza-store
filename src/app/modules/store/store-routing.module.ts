import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StoreComponent, CartComponent} from './pages';
import {StoreResolverService} from './services/route-resolvers/store-resolver/store-resolver.service';

const storeRoutes: Routes = [
  {
    path: 'products',
    component: StoreComponent,
    data: {url: 'products'},
    resolve: {permission: StoreResolverService}
  },
  {
    path: 'cart',
    component: CartComponent,
    data: {url: 'cart'},
    resolve: {permission: StoreResolverService}
  },
  {path: '', redirectTo: 'products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(storeRoutes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {
}
