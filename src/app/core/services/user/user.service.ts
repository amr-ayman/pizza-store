import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {UserDetails} from '../../interfaces/user-details/user-details.interface';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDetails = new BehaviorSubject<UserDetails>(null);

  /* User Details Getter */
  get userDetails$(): Observable<any> {
    if (this.userDetails.value) {
      return this.userDetails.asObservable();
    } else {
      const token = this.localStorage.getLocal('userToken');
      if (token) {
        const userDetails = this.parseJwt(token);
        this.userDetails.next(userDetails);
        return this.userDetails.asObservable();
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

  constructor(private localStorage: LocalStorageService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  // Simulate Parsing Token
  /* Decode Token To Get User Details */
  parseJwt(token): UserDetails | null {
    if (token === 'xx.yy.zz') {
      return {
        userType: 'Admin',
        username: 'Admin'
      };
    } else if (token === 'aa.bb.cc') {
      return {
        userType: 'Customer',
        username: 'Customer'
      };
    } else {
      this.localStorage.removeAllLocals();
      this.router.navigate(['/login']);
    }
  }
}
