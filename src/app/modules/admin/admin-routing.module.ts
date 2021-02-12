import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductListComponent, ProductViewComponent} from './pages';
import {AdminResolverService} from './services/route-resolvers/admin-resolver/admin-resolver.service';

const adminRoutes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
    data: {url: 'products'},
    resolve: {permission: AdminResolverService}
  },
  {
    path: 'products/add',
    component: ProductViewComponent,
    data: {url: 'products/add'},
    resolve: {permission: AdminResolverService}
  },
  {
    path: 'products/:id',
    component: ProductViewComponent,
    data: {url: 'products/:id', isEdit: true},
    resolve: {permission: AdminResolverService}
  },
  {path: '', redirectTo: 'products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
