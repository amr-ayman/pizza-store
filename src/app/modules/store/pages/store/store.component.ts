import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoreService} from '../../services/store-service/store.service';
import {Subscription} from 'rxjs';
import {Product} from '../../../../shared/interfaces/product/product.interface';
import {TranslationService} from '../../../../core/services/translation/translation.service';
import {CartService} from '../../../../shared/services/cart/cart.service';

@Component({
  selector: 'pizza-store-products',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {

  languageSubscription: Subscription;
  isArabic = false;
  products: Product[] = [];
  allProducts: Product[] = [];
  itemsCount: number;

  constructor(private translateService: TranslationService,
              private storeService: StoreService,
              private cartService: CartService) {
  }

  /* Subscribe To Language Subscription */
  ngOnInit(): void {
    this.languageSubscription = this.translateService.isArabic$.subscribe(value => {
      this.isArabic = value;
      this.getProductList();
    });
  }

  /* Cancel Language Subscription */
  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  /* Get All Products */
  getProductList() {
    this.storeService.getList().subscribe(response => {
      this.products = [...this.handleLanguage(response.items)];
      this.allProducts = [...this.handleLanguage(response.items)];
      this.itemsCount = response.count;
    });
  }

  /* Handle Task Field Interface Language */
  handleLanguage(products): any[] {
    const productList = [];
    products.map((product) => {
      productList.push({
        id: product.id,
        name: this.isArabic ? product.nameAr : product.nameEn,
        code: product.code,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
      });
    });
    return productList;
  }

  /* Add Product To Cart */
  addToCart(product): void {
    const selectedProduct = this.products.find(pizza => pizza.id === product.id);
    if (!selectedProduct.quantity) {
      return;
    }
    selectedProduct.quantity--;
    this.cartService.addProduct(product);
  }

  /* Remove Product From Cart */
  removeFromCart(product): void {
    const selectedProduct = this.products.find(pizza => pizza.id === product.id);
    const selectedProductQuantity = this.allProducts.find(pizza => pizza.id === product.id).quantity;
    if (selectedProduct.quantity === selectedProductQuantity) {
      return;
    }
    selectedProduct.quantity++;
    this.cartService.removeProduct(product);
  }

}
