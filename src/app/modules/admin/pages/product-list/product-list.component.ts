import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../services/admin-service/admin.service';
import {Subscription} from 'rxjs';
import {TranslationService} from '../../../../core/services/translation/translation.service';
import {ModalService} from '../../../../shared/services/modal/modal.service';
import {first} from 'rxjs/operators';
import {Product} from '../../../../shared/interfaces/product/product.interface';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'pizza-store-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  @ViewChild('deleteModal', {static: true}) deleteModal;
  languageSubscription: Subscription;
  isArabic = false;
  rows: Product[] = [];
  itemsCount: number;
  columns = [
    {name: 'id', prop: 'id', display: false},
    {name: 'IMAGE', prop: 'image', display: true, type: 'image', size: 100, sortable: false},
    {name: 'NAME', prop: 'name', display: true, type: 'text', size: 120, sortable: false},
    {name: 'DESCRIPTION', prop: 'description', display: true, type: 'description', size: 250, sortable: false},
    {name: 'CODE', prop: 'code', display: true, type: 'code', size: 150, sortable: false},
    {name: 'PRICE', prop: 'price', display: true, type: 'number', size: 150, sortable: false},
    {name: 'QUANTITY', prop: 'quantity', display: true, type: 'number', size: 150, sortable: false},
    {name: 'OPTIONS', prop: 'options', display: true, type: 'options', size: 100, sortable: false}
  ];

  smallColumns = [
    {name: 'id', prop: 'id', display: false},
    {name: 'IMAGE', prop: 'image', display: true, type: 'image', size: 100},
    {name: 'TITLE', prop: 'title', display: true, type: 'title', size: 135},
    {name: 'OPTIONS', prop: 'options', display: true, type: 'options', size: 80}
  ];

  constructor(private translateService: TranslationService,
              private adminService: AdminService,
              private modalService: ModalService,
              private translate: TranslateService,
              private toastr: ToastrService) {
  }

  /* Subscribe To Language Change */
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
    this.adminService.getList().subscribe(response => {
      this.rows = [...this.handleLanguage(response.items)];
      this.itemsCount = response.count;
    });
  }

  /* Handle Product Fields Language */
  handleLanguage(products): any[] {
    const productList = [];
    products.map((product) => {
      productList.push({
        id: product.id,
        name: this.isArabic ? product.nameAr : product.nameEn,
        description: this.isArabic ? product.descriptionAr : product.descriptionEn,
        code: product.code,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
      });
    });
    return productList;
  }

  /* Delete Specific Product */
  deleteProduct(productId) {
    const buttons = [
      {id: 2, text: 'ACTIONS.NO_KEEP_IT'},
      {id: 1, text: 'ACTIONS.DELETE'}
    ];
    this.modalService.showTemplate(this.deleteModal, 'ADMIN.LIST.DELETE_PRODUCT', 'sm', buttons);
    this.modalService.btnId.pipe(first()).subscribe(btnId => {
      if (btnId === 1) {
        this.rows = [...this.rows.filter(product => product.id !== productId)];
        this.translate.get(['TOASTER.ADMIN.DELETE_SUCCESS', 'TOASTER.SUCCESS']).subscribe(translateValue => {
          this.toastr.success(translateValue['TOASTER.ADMIN.DELETE_SUCCESS'], translateValue['TOASTER.SUCCESS']);
        });
      }
    });
  }

}
