import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) {
  }

  /* Get Product List */
  getList(): Observable<any> {
    return this.http.get('assets/dummy-data/products.json');
  }
}
