import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LayoutComponent, HeaderComponent, FooterComponent, LoaderComponent} from './components/main-layout';
import {RouterModule} from '@angular/router';
import {AddHeaderInterceptor} from './services/interceptors/header-interceptor/add-header.interceptor';
import {SharedModule} from '../shared/shared.module';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [HeaderComponent, LayoutComponent, FooterComponent, LoaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-top-right',
      closeButton: true,
      preventDuplicates: true
    })
  ],
  providers: [
    TranslateService,
    {provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true}
  ]
})
export class CoreModule {
}
export function HttpLoaderFactory(http: HttpClient): object {
  return new TranslateHttpLoader(http, 'assets/translation-files/', '.json');
}
