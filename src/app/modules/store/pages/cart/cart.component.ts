import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoreService} from '../../services/store-service/store.service';
import {Subscription} from 'rxjs';
import {TranslationService} from '../../../../core/services/translation/translation.service';
import {CartService} from '../../../../shared/services/cart/cart.service';
import lodash from 'lodash';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'pizza-store-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  languageSubscription: Subscription;
  isArabic = false;
  cartSubscription: Subscription;
  products = [];

  constructor(private translateService: TranslationService,
              private storeService: StoreService,
              private cartService: CartService,
              private router: Router,
              private toastr: ToastrService,
              private translate: TranslateService) {
  }

  /* Subscribe To Language Change & Cart Service */
  ngOnInit(): void {
    this.languageSubscription = this.translateService.isArabic$.subscribe(value => {
      this.isArabic = value;
    });
    this.cartSubscription = this.cartService.itemsInCart.subscribe(value => {
      if (value.length) {
        const items = lodash.groupBy(value, 'id');
        const groupedItems = Object.values(items);
        this.products = [...groupedItems];
      }
    });
  }

  /* Cancel Language & Cart Subscription */
  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

  /* Simulate Checkout Process */
  checkout() {
    this.cartService.resetCart();
    this.translate.get(['TOASTER.CART.CHECKOUT', 'TOASTER.SUCCESS']).subscribe((translateValue) => {
      this.toastr.success(translateValue['TOASTER.CART.CHECKOUT'], translateValue['TOASTER.SUCCESS']);
    });
    this.router.navigate(['/store']);
  }
}
