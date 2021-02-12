import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../../local-storage/local-storage.service';
@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor{

  userLang: string;
  userToken: string;
  constructor(private localStorage: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.userLang = this.localStorage.getLocal('userLang') ? this.localStorage.getLocal('userLang') : 'en';
    this.userToken = this.localStorage.getLocal('userToken');
    const jsonReq: HttpRequest<any> = req.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.userToken}`,
        lang: this.userLang
      }
    });
    return next.handle(jsonReq);
  }
}
