import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../../interfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  itemsInCart = new BehaviorSubject<Product[]>([]);

  constructor() {
  }

  /* Add Product To Cart */
  addProduct(product): void {
    this.itemsInCart.next([...this.itemsInCart.getValue(), product]);
  }

  /* Remove Product From Cart */
  removeProduct(product): void {
    const items = [...this.itemsInCart.getValue()];
    const index = items.indexOf(product);
    items.splice(index, 1);
    this.itemsInCart.next([...items]);
  }

  /* Reset Cart On Checkout */
  resetCart(): void {
    this.itemsInCart.next([]);
  }
}
