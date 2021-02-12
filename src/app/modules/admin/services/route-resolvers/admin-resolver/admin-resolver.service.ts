import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {UserService} from '../../../../../core/services/user/user.service';
import {UserType} from '../../../../../core/enums/user-type/user-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminResolverService implements Resolve<any> {

  permissionsSubscription: Subscription;
  userPermissions: string[];
  routePermissions: string[];

  constructor(private userService: UserService, private router: Router) {
    this.permissionsSubscription = this.userService.userDetails$.subscribe(value => {
      if (value) {
        this.userPermissions = value.userType;
      }
    });
  }

  /* Check User Role & Give Him Access */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const url = route.data.url;
    switch (url) {
      case 'products':
      case 'products/add':
      case 'products/:id':
        this.routePermissions = [UserType.Admin];
    }
    const allow = this.routePermissions.some(x => this.userPermissions.indexOf(x) > -1);
    if (!allow) {
      this.router.navigate(['/error/403']);
    }
    return null;
  }
}
