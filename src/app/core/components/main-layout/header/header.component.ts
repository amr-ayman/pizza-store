import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../services/local-storage/local-storage.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user/user.service';
import {UserType} from '../../../enums/user-type/user-type.enum';
import {MenuItemInterface} from '../../../interfaces/menu-item/menu.item.interface';
import {TranslationService} from '../../../services/translation/translation.service';
import {CartService} from '../../../../shared/services/cart/cart.service';

@Component({
  selector: 'pizza-store-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userName: string;
  userType: UserType;
  userSubscription: Subscription;
  cartSubscription: Subscription;
  itemsInCart: number;
  menuItems: MenuItemInterface[] = [];
  showMenu = false;

  constructor(private router: Router,
              private userService: UserService,
              private cartService: CartService,
              private translationService: TranslationService,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.userDetails$.subscribe(userDetails => {
      this.userName = userDetails.username;
      this.userType = userDetails.userType;
      this.menuItems = [
        {
          title: 'STORE',
          permissions: [UserType.Customer, UserType.Admin],
          routerLink: 'store',
        },
        {
          title: 'ADMIN',
          permissions: [UserType.Admin],
          routerLink: 'admin',
        }
      ];
    });
    this.cartSubscription = this.cartService.itemsInCart.subscribe(value => {
      this.itemsInCart = value.length;
    });
  }

  /* Cancel User Subscription*/
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

  /* Toggle User Language */
  changeLang(): void {
    this.translationService.changeLang();
  }

  /* Log User Out */
  logout(): void {
    this.localStorage.removeAllLocals();
    this.router.navigate(['/login']);
  }
}
