import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {PizzaStoreAPIResponse} from '../../interfaces/http-response/http-response.interface';
import {Router} from '@angular/router';
import {LoaderService} from '../loader/loader.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient,
              private router: Router,
              private loaderService: LoaderService,
              private toastr: ToastrService) {
  }

  // Real GET Method
  get(url): Observable<any> {
    this.loaderService.startLoader();
    return this.http.get(url).pipe(
      map((response) => {
        this.loaderService.stopLoader();
        if (!response) {
          return this.handleHttpError(response);
        } else {
          return response;
        }
      }),
      catchError((error) => {
        return this.handleHttpError(error);
      })
    );
  }

  /* Fake POST Method */
  post(url, body): Observable<PizzaStoreAPIResponse> {
    // Simulate Calling API By Returning Observable
    if (url === 'Account/login') {
      return this.login(body);
    }
  }

  // Simulate Login API (Generate Fake Token & User Role)
  login(body): Observable<PizzaStoreAPIResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        if (body.username === 'Admin' && body.password === 'P@$$w0rd') {
          observer.next({
            message: 'Logged in successfully',
            data: {token: 'xx.yy.zz', role: 'Admin'},
            isSuccess: true
          });
        } else if (body.username === 'Customer' && body.password === 'P@$$w0rd') {
          observer.next({
            message: 'Logged in successfully',
            data: {token: 'aa.bb.cc', role: 'Customer'},
            isSuccess: true
          });
        } else {
          observer.next({
            message: 'Invalid username or password',
            data: null,
            isSuccess: false
          });
        }
      }, 1500);
    });
  }

  /* Handle HTTP Errors */
  handleHttpError(error): Observable<never> {
    if (!error.ok) {
      if (error.status === 400) {
        this.toastr.error('Bad Request', 'Error');
      } else if (error.status === 401) {
        this.router.navigate(['/login']);
        return error;
      } else if (error.status === 403) {
        this.router.navigate(['/error/403']);
      } else if (error.status === 404) {
        this.router.navigate(['/error/404']);
      } else if (error.status === 500) {
        this.router.navigate(['/error/500']);
      } else {
        this.toastr.error(error.message, 'Error');
      }
    }
    return throwError(error);
  }
}
