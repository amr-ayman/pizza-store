import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../../../shared/interfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  /* Get Product List */
  getList(): Observable<any> {
    return this.http.get('assets/dummy-data/products.json');
  }

  /* Get Product Details */
  getProduct(productId): Observable<Product> {
    const product = new Subject<Product>();
    this.http.get('assets/dummy-data/products.json').subscribe((response: {count: number, items: Product[]}) => {
      const products = response.items;
      product.next(products.find(prod => prod.id === productId));
    });
    return product as Observable<Product>;
  }

}
