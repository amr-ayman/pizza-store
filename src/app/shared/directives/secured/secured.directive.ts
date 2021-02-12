import {Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user/user.service';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[secured]'
})

export class SecuredDirective implements OnChanges, OnInit, OnDestroy {

  // Inputs
  @Input('secured') permissions: string[];
  permissionsSubscription: Subscription;

  constructor(public authService: UserService, private eltRef: ElementRef) {
  }

  ngOnChanges(): void {
    if (!this.permissions) {
      this.permissions = [];
    }
  }

  ngOnInit(): void {
    this.getUserPermissions();
  }

  /* Cancel Permissions Subscription  */
  ngOnDestroy(): void {
    this.permissionsSubscription.unsubscribe();
  }

  /* Get User Permission Base On User Role */
  getUserPermissions(): void {
    this.permissionsSubscription = this.authService.userDetails$.subscribe(value => {
      if (value) {
        const permissions = value.userType;
        const allow = this.permissions.some(x => permissions.indexOf(x) > -1);
        this.applyPermissions(allow);
      } else {
        this.applyPermissions(false);
      }
    });
  }

  applyPermissions(allow): void {
    const el: HTMLElement = this.eltRef.nativeElement;
    el.classList.add('d-none');
    if (allow) {
      el.removeAttribute('secured');
      el.classList.remove('d-none');
    } else {
      el.remove();
    }
  }
}
