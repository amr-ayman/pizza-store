import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http/http.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpService) {
  }

  /* Log User In */
  login(body): Observable<object> {
    return this.http.post('Account/login', body);
  }
}
