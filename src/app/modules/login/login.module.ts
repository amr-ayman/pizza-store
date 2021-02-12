import {NgModule} from '@angular/core';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './pages/login/login.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule,
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule {
}
